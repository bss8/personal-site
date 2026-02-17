---
title: "Repositories Define, CI Executes"
date: 2026-02-17
draft: false
--- 

## Entropy is the Constraint to Attack

In large Kubernetes environments, velocity is determined by entropy. The slowdowns do not come from "hard problems"
but from dozens of small inconsistencies that force every engineer to re-orient to the system every time they touch it.

You can have excellent engineers and still move slowly if every 
repository invents its own deployment style. You get pipelines that
behave like runtime systems, manifests that are not real manifests and hide variables, and
environment behavior that only exists inside CI systems like GitHub. The true state of the system is hidden. 

## The problem

Our system consists of multiple homegrown services with different owners,
all targeting Kubernetes. The platform mix is AKS and on-prem
Kubernetes or OpenShift. The org claims "standard deployments," 
but what it actually has is "standard Kubernetes" plus a pile of bespoke glue.

Common symptoms:

1)  Divergent CI pipelines that define behavior

Every repo has a slightly different GitHub Actions workflow. Someone
copied an existing workflow, then patched it until it "worked" for their
service. That patch is now policy.

You see steps like these:

-   kubectl apply driven by templated scripts
-   sed replacing image tags
-   variables injected during workflow runs
-   duplicated YAML fragments across repositories

And you get a "prepare variables" job whose real purpose is to assemble
runtime configuration from GitHub environments, secrets, and inputs.

Example (anonymized) bad pattern:

``` yaml
jobs:
  prepare:
    name: Prepare Deployment Variables
    runs-on: ${{ inputs.runs-on }}
    environment: ${{inputs.deploy-env}}
    outputs:
      token-json: ${{ steps.vars.outputs.token-json }}
    steps:
      - uses: actions/checkout@v4
      - id: vars
        shell: bash
        run: |
          cat <<EOF > vars.json
          ${{ toJson(vars) }}
          EOF

          cat <<EOF > other.json
          {
            "IMAGE": "${{vars.DOCKER_REGISTRY}}/docker-${{env.build-type}}/${{vars.DOCKER_REPOSITORY}}:${{inputs.build-run-number}}"
          }
          EOF

          tokenJson=$(jq -sc "reduce .[] as \$item ({}; . + \$item)" vars.json other.json)
          echo "token-json=$tokenJson" >> "$GITHUB_OUTPUT"
```

Why is jq in the pipeline? Because the pipeline is acting as a
configuration compiler.

You are taking a blob of external variables (GitHub "vars" and
environment scoped settings), mixing in ad hoc derived values, then
emitting a synthetic JSON object that downstream steps treat as "the
source of truth." That is exactly backwards. The repo should define the
deployment. CI should execute it. 

This jq dependency exists to compensate for a design
decision: configuration is not represented as committed, reviewable
Kubernetes config. It is represented as a pile of strings outside the
repo, then stitched together during a workflow run.

From an operations standpoint, you also bought yourself fragility:

-   jq must exist on every runner image, including self hosted ones.
-   jq behavior and shell quoting become part of your deployment
    correctness.
-   debugging requires replaying pipeline runs and inspecting transient
    artifacts.
-   changes to GitHub environment variables can silently change runtime
    behavior without a code diff.

2)  Manifests that are not valid YAML

The other smell is manifest templates that look like YAML but are not
YAML, because they contain token placeholders that only become real at
build time.

Example (anonymized) bad pattern:

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{KUBERNETES_NAME}}
  namespace: {{AKS_NAMESPACE}}
spec:
  tls:
    - hosts:
        - {{GTM}}
        - {{LTM}}
      secretName: inspire
  rules:
    - host: {{LTM}}
      http:
        paths:
          - path: /
            backend:
              service:
                name: {{KUBERNETES_NAME}}
                port:
                  number: {{PORT}}
```

This file is not a manifest. It is a promise that a manifest will exist
after some external system performs substitution.

Replaced with what? For which environment? Which value wins if multiple
sources define PORT? You cannot answer those questions by reading the
repository. You have to leave the repo and hunt through GitHub
environment variables and secrets. You have to inspect scripts that
mutate these placeholders at runtime. You have to carry tribal knowledge
or run the workflow and see what happens. 

3)  Copy pasted logic across repositories

Once you start templating manifests in CI, you also start copying the
templating logic. You end up with 12 repos each carrying their own fork
of the same sed script or token replacement function. Some repos replace
image tags one way, others yet another. Some repos have special
casing for ingress annotations. Some use different variable names for
the same concept.

Then you get bug reports like:

-   "Dev deploy works, test deploy fails"
-   "Ingress host is wrong in prod only"
-   "This service started using the wrong namespace"
-   "Rollback redeployed the same broken config"

These are not "Kubernetes problems" but rather configuration lineage problems: where is it defined, who created it, 
how was it transformed over time; did it come from a Helm chart, Kustomize overlay, Terraform module, or GitHub actions mutation?

## The cost

A non-standard deployment model that leans on CI systems negatively impacts non-functional requirements. 

Readability / Understandability

Failure mode: You cannot tell what will be deployed from reading the
repo, knee-capping code reviews. 

If the manifest in the repo is not a real manifest, the repo is not
readable. Engineers read fake YAML, then must mentally simulate the
pipeline to understand the final output. That is wasted effort better spent 
elsewhere in the value delivery chain.

If behavior is stitched together from GitHub environments, secrets, and
scripts, the diff does not show the behavioral change. You get approvals
based on incomplete information. Teams sometimes think it's a benefit to be 
able to change variables without a PR on the fly. It isn't - it's a liability.

Maintainability

Failure mode: Platform changes require multi repo archaeology.

If deployment behavior is defined by N different workflow dialects,
every platform change turns into a campaign. New ingress annotation? New
namespace policy? New identity wiring? You now need to patch 40 repos.
Worse, you need to understand each repo's bespoke workflow first.

Onboarding time

Failure mode: New engineers require a guided tour of CI internals.

When configuration is hidden, onboarding becomes an oral tradition. "For
this service, look at GitHub environment X. For that service, the
namespace is injected in job Y. For this other service, ignore the
manifest template, it gets rewritten."

The system is unlearnable from the repo (which ought to be our source of truth). 

Incident response

Failure mode: You cannot quickly answer "what changed?"

During an incident, you need traceability. What config is running? What
changed? When did it change? If runtime behavior can be modified by
changing GitHub environment variables, you now have a control plane
outside your version control. You lose the ability to correlate incidents with code changes.

Change safety

Failure mode: Small changes cause large, implicit behavior shifts.

When CI contains a configuration compiler, we may introduce coincidental correctness -
the system works under one specific set of inputs but fails as soon as they change. 
A quoting bug can replace PORT with empty value. A sed
expression can match more lines than intended. A renamed environment
variable can default to blank and deploy broken manifests that still
pass a superficial "kubectl apply" step.

## What to do instead

Standardize around Kustomize. Not because it is trendy but because it: 
1. forces the truth back into the repository, and 
2. is built in with kubectl/oc, thus requiring no external dependency. 

The goal is simple:

-   Base defines the application once.
-   Overlays define environment and platform deltas.
-   CI runs deterministic steps to build, tag, and apply.
-   *If you want to understand runtime behavior, you read the repo.*

A workable structure looks like this:

-   deploy/k8/base
-   deploy/k8/overlays/azure/dev
-   deploy/k8/overlays/azure/test
-   deploy/k8/overlays/azure/prod
-   deploy/k8/overlays/ocp/dev
-   etc

Base contains valid manifests. No placeholders. No token braces. Nothing
that requires CI substitution.

Overlays contain only what differs. Not full copies. Just a change set (i.e., deltas).

Example base kustomization.yaml:

``` yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml
  - ingress.yaml
```

Example overlay kustomization.yaml for azure dev:

``` yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: myapp-dev

resources:
  - ../../base

patches:
  - path: patch-ingress-hosts.yaml
  - path: patch-resources.yaml

images:
  - name: my-registry/myapp
    newTag: 12345
```

The important properties:

-   Environment specific configuration is committed and diff-able.
-   Patches are declarative. They are not shell scripts mutating YAML.
-   CI can update a tag deterministically, without redefining the
    system.

Hardcoding non-secret config here is what we want. If dev uses myapp dev
namespace and dev ingress hostname, commit it. You want reviewers to see
it. You want incident responders to see it. You want a new engineer to
learn it by reading it. Our complete truth is now in the repository.

Deterministic builds

Once you adopt this, CI becomes boring, which is the point.

CI should do things like:

-   build image
-   tag image
-   promote image
-   apply overlay

Nothing else.

No jq. No sed. No token JSON. No "prepare variables" job that quietly
defines runtime state.

Environment changes become manifest changes, which are auditable, so we get back our full traceability. 

Platform independence without parallel deployment systems

If you support AKS, on prem Kubernetes, and OpenShift, Kustomize
overlays give you a single deployment model with platform differences
expressed as patches, not as separate systems and scripts.

You stop encoding "platform knowledge" inside CI systems. You
encode it as explicit overlay differences. That prevents drift where each platform evolves in its own workflow variant.

## The principle

CI should execute. Repositories should define.

If a behavior change is not visible in the repo, we've created a
second control plane, which will rot and slow us down over time.

Configuration should be versioned; the minute we accept "it's in GitHub environments" as normal, we 
accept invisible behavior as normal. 

This is not about control or standards for their own sake. It is about
reducing the number of unique ways organizations deploy
applications. Every additional dialect is a tax on onboarding, reviews,
incident response, and platform evolution.

## Outcome

Excess tool choice and CI customization reduce velocity at scale. They
hide configuration, increase cognitive load, and turn deployments into
archaeology.

Standardization around a small set of patterns, specifically Kustomize
base plus overlays, puts the source of truth back in the repository. It
makes behavior understandable and reduces entropy, improving velocity. 
