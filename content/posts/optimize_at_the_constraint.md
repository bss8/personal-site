---
title: "Optimize at the Constraint or Don't Bother"
date: 2026-07-23
draft: false
---

<style>
    blockquote {
        margin: 10px 0;
        padding: 8px 14px;
        border-left: 3px solid #75adde;
        background: rgba(117, 173, 222, 0.08);
        color: inherit;
        font-style: normal;
        font-weight: normal;
        page-break-inside: avoid;
    }
</style>

Engineering capacity - the energy and willpower to do work - is finite. You will never have enough people, hours, budget, or even desire to fix everything that is broken, and anyone who tells you otherwise is likely either new or selling something. The only question that matters is where you spend what you have. Not whether the backlog is long (it always is), but which work items on it should truly be prioritized.

Eliyahu Goldratt answered this in *The Goal* back in 1984; his focus was on manufacturing plants and their operations, not Kubernetes clusters, but many of the principles are still valid. The main premise is the *Theory of Constraints*, which at its simplest posits that any improvement made anywhere other than the constraint is an illusion. Not a small or partial win, not even a pyrrhic victory. An illusion, much like the ones created by Odysseus' *syrens*, their "honeyed words" luring unwary developers to destruction (wasting cycles). Gene Kim carried that idea forward to IT in *The Phoenix Project,* specifically with the **First Way,** the principle of flow through a system. We are to optimize the whole system, not the individual work station. We strive to make work move left to right without piling up, and to do that we must know where it piles up, because that is the singular place which governs everything upstream of it and defines the entire system's throughput. As a simple example, imagine we have ten sequential workstations and nine produce one million units per hour. But one of the ten only produces ten units per hour. What is our system throughput? Ten units per hour. 

## Mandated Changes and Unplanned Work as a Killer of Planned Work 

Broadcom's acquisition of VMware changed the licensing model and pulled the rug out from underneath a lot of people at once, and the result was migrations most teams didn't choose. Nobody had "Migrate off of VMWare as fast as humanly possible" on their 2026 roadmap or bingo card. Nobody weighed it against other priority work that needed doing. For a number of companies, the work of moving off VMware and onto a different platform became non-negotiable on a timeline somebody else set. That is an example of unplanned work, which often has a tendency to derail *planned work*. 

When we pick our own work, we can pretend we can do all of it eventually. A forced change takes that comfort away by consuming a large block of capacity we did not volunteer. We now have to shift our focus and efforts, and are left with whatever is not consumed to cover everything else that still has to ship. We cannot address everything we planned. This is the "unplanned work is the killer of planned work" *The Phoenix Project* hits on repeatedly. 

## Organizational Realities Nobody Warns You About

The technical part of moving off VMware and onto alternatives like Red Hat's OpenShift Container Platform (OCP) or other cloud offerings is, at its core, relatively trivial. It is real work and there is plenty of it, but it is the kind of work the industry understands well. But that's not the whole story; the part that actually tests teams is moving platforms that others depend on and did not ask to have moved, through an enterprise where the processes are not nearly as neatly divvied up and managed as the org chart implies, and where the people you need are already underwater on their own deliverables.

This is where the First Way stops being a clean path to follow, and instead we need to meander through a dark, at times impassable forest. We stumble about from bush to tree, acquiring scrapes along the way, until we run into a fellow traveller who tells us to talk to someone, who in turn tells us to talk to someone else, who in turn points us to a magical clearing. And in that clearing are dozens of people, all on task and getting things done - but with no real clue of how they got to the clearing. Everyone followed a slightly different path and spoke to different people along the way to find it because **there is no map.** There is only a bespoke trail you cut yourself, guided by whoever happened to point you the right way.

You see, flow across a large, enterprise organization (most of what follows does not apply to startups) assumes the handoffs work, there's a well understood and traveled process, and all are in agreement. In practice, the handoff is a ticket sitting in some other team's backlog, owned by people who have their own non-negotiable timeline bearing down on them, and your emergency is not *their* emergency. Worse, sometimes the "process" is, like the Pirate Code, more of a guideline than an actual rule; no one is quite certain who owns what and the process is to just "get it done" one way or another. There is rarely any malice in it. It is just finite capacity colliding with...well, more finite capacity, leading to some degree of scrambling and confusion. Two constrained systems trying to draw from each other at the same time. The bottleneck for your work turns out to be somebody else's bandwidth, which is a humbling thing to discover when you have done everything right on your side of the line. You can't give them more bandwidth, and your request is asking to further take up something they already don't have - time. 

Let's take a look at two non-technical matters of import when you hit that wall.

The first is knowing how to escalate without scorching the earth. You will need these same teams again next month, and the month after that, so the goal is never to win the exchange. That's a pyrrhic victory, and those are costly in a long-spanning career. Instead, the goal is to unblock the work and leave the relationship intact. That means escalating to the level that can actually reprioritize, framing the ask as a shared delivery problem rather than a grievance, and being specific about what you need and by when. People respond to a clear request with a clear cost attached to it. They dig in when they feel cornered or accused, and a cornered team moves slower, not faster, which is the opposite of what you are looking for.

The second is keeping a written record. Every request, commitment, and date that came and quietly went. If it's something you were told verbally, just send an email to capture it: "As discussed/agreed our last call..."  Call it covering yourself, or as I prefer, covering your ass..ets. It sounds defensive and a touch cynical, and it's honestly a bit of both, but it is also a mechanism that keeps a cross-team dependency from dying silently in a queue while everyone assumes someone else owns it. Be proactive, follow-up in a timely fashion, and (gently and politely) remind people of their commitment - our word is our bond. A written trail is not an accusation waiting to be slung like dung at someone. It's an artifact you point at when two teams remember the same conversation differently, and in a large org two teams will have different recollections often enough. The record turns "I thought your team had that" into a date sitting in plain view, and a date is much harder to argue with than a memory.

## A forced move is also a chance to clean house

When you are already touching everything, you have cover to fix things you could never get funded to fix on their own merits. A forced migration means you are elbow-deep in the entire behemoth whether you like it or not. Every application has to be inventoried, moved, and validated. Storage needs to be re-mounted, servers whitelisted in ACL exports, old infrastructure decommissioned (by who, especially if it's co-owned by more than one team in the system of record?). That's expensive and time consuming, but it is also a moment where the marginal cost of consolidation drops close to zero, because you are paying the inspection and migration cost on each app regardless of what you decide to do with it. So you merge what should have been merged years ago. You collapse the three tools that do roughly the same job into the one that does it well. You merge small, individual UIs into one consolidated one. Every redundant surface you remove is maintenance overhead you stop paying in perpetuity, and maintenance is capacity. The same finite capacity the migration just reduced. You now have a chance to reclaim some of it back and come out better for it on the other end.  

A caveat. There is a trap here that's easy to walk into with the best of intentions. Consolidation pushed too far produces a monolith, which is not a victory but a different problem. The skill is telling the difference between things that genuinely want to be one thing and things that should remain as they are. Merge the first kind without hesitation and leave the second kind alone, or you will spend the capacity you just took back untangling a Gordian knot you tied with your own hands.

## Are We Improving Throughput or Not?

We cannot fix all the tech debt; stop trying to. Spreading a finite team evenly across everything that is broken feels responsible and even fair, and it is quietly the worst possible option on the table, because evenly is mathematically indistinguishable from nowhere. It's like having 20 burgers to eat and instead of tackling them one at a time, you take one bite from each and end up feeling stuffed but finishing none. Recall the ten workstations. Pouring effort into the nine that already run fast (or passably) does nothing for a system still capped at ten units an hour.

Goldratt's rule gives us the filter; for any piece of debt we are tempted to pay down, we ask one question. Does fixing this relieve the throughput constraint and hand engineering capacity back to us, or does it merely make some non-constraint run faster? If it is the latter, we are not allowed to feel good about it, because speeding up a non-constraint does not help the system. It usually hurts. A faster non-constraint produces more work that flows downstream and piles up harder at the real bottleneck, so we have spent scarce capacity to make the actual problem worse, not better, while generating a metric that looks nice on a slide deck. That is the illusion Goldratt warned about, this time wearing a green dashboard and a thumbs-up in the sprint review.

The debt worth paying is the debt that frees people's time. The thing that lifts a recurring manual burden off the team that everything else waits on. The fix that turns a two day turnaround into a two hour one at exactly the step where work backs up. Those pay you back in capacity, and capacity is the only currency that compounds, because every hour freed this quarter is an hour you get to reinvest in the next one. Everything else is motion. It looks like progress, it survives a naive examination... and it **changes absolutely nothing** about how fast the system actually moves.

We find the constraint the way Bill Palmer and his team eventually do in *The Phoenix Project*, by following the work and watching for where it stops moving. Not where it is loudest and certainly not where the most insistent stakeholder happens to be pointing, but **where it stops.** That is the only place spending finite capacity buys us anything at all, and once you have learned to see it, you cannot unsee how much effort across our whole industry goes into lovingly optimizing everywhere except there.

## You Need Discipline, not Individual Heroics

We must accept that capacity is finite, something most people burn real energy pretending is not true. We cannot fix everything. Spreading ourselves evenly across all of it is the single choice guaranteed to leave the bottleneck sitting exactly where we found it.

A migration nobody chose forced that discipline on a lot of us at once, and the lesson had nothing to do with VMware or licensing or any particular destination platform. It was that the discipline holds whether or not someone imposes it from above. You can wait for the next Broadcom to come consume your slack and set your priorities for you, or you can go find your constraint now, while choosing is still a luxury you have, and spend every hour you own at the one place it actually counts.

<blockquote>
    Optimize at the constraint, or do not bother optimizing at all.
</blockquote>