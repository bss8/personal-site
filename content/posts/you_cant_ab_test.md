---
title: "You Can't A/B Test a Tool Nobody Asked For"
date: 2026-06-18
draft: false
---

A product team that wants to know whether a feature works has a clean way to find out. Ship it to half the users, withhold it from the other half, wait, then measure the difference between the two groups. The half without the feature is the control group. Whatever gap surfaces between them is the answer.

I developed a grassroots application and never got that luxury. The tool I built came up from the bottom and spread organically; it was not mandated from the top. Nobody commissioned or scoped it, and nobody was going to support taking time and money to run experiments on internal engineering users. So when leadership eventually asked "what is this actually worth," I had to answer without data from the experiment that would have made it easy.
This is the part of internal platform work that nobody writes about. Plenty of people will tell you how to build something. Far fewer will tell you how to prove it was worth building, especially if you're filling a gap you know needs to be filled but do not initially have a mandate to do it.

If you are wondering why you would build a tool nobody asked for, that's a fair question. If you are a domain expert and spot a gap, a need going unmet that is causing inefficiencies and pain for your customers, the appropriate action is to fill the gap and reduce or eliminate the pain your users feel. That is one part of building credibility and a career in your field. You may, after identifying the need, propose a project. If it's pressing enough, and leadership agrees, it may get added to the roadmap. That's a longshot, especially for internal tooling, as roadmaps are usually full for at least a year in advance. That does not mean the need should remain unmet for years while we wait for the green light (although I am aware that may often be the case). A solution can be built in the interim, and after demonstrating its value, it can become a true, internally supported platform with a place on the roadmap.

## Scavenging for numbers needed to calculate value

To understand the impact of a tool like this and put a number on it, I first had to dig up raw inputs. The calculations themselves were fairly straightforward, but entirely impossible to run without the raw numbers underneath them.

Job volume, failure rates, time saved per event. What does an engineer actually cost the company, fully loaded (salary plus benefits plus overhead)? What does it cost to run the compute in an on-prem data center? What is the real failure rate across the environment? None of that was sitting in a dashboard waiting for me. Some of it people shared verbally when I asked. Some of it lived in a document somebody pointed me to. Some of it was quietly guarded, the kind of figure nobody publishes because it doesn't make anyone look good or it hands competitors too much insight into internal operations.

So I went and got the data the slow way. I worked with our PM to figure out who actually owned each number, then sat down with Finance, IT, and engineering leadership to pin down the fully loaded cost of an engineer until three different sources agreed - or at least did not disagree, which is not the same thing but it may be the best you get. I did the same for compute cost, simulation failure rate, and all other numbers. By the time I was done, every input had been verified two or three ways from different sources. For some numbers there were no definitive answers, just a best guess.

I want to be clear about why this matters. When I finally put the case in front of leadership, not one person challenged the numbers. Not because the numbers were flattering, but because there was no soft spot to push on. I had been intentionally conservative. I rounded against myself and picked the low end of every range. A modest number that survives scrutiny will get you funded. An impressive number that falls apart the first time someone challenges it will get you shown the door, and it will cost you every future conversation too, eroding your credibility before you ever get the chance to establish it.


## The numbers (at a high level)

Let's walk the math with illustrative numbers. These are not my real figures, they're round numbers picked to show the method. Most of you won't be in HPC counting failed simulations anyway, so the specific values don't matter, just the way we think about this.

Say the fully loaded cost of an engineer is $150,000/year. Across a standard 2,080-hour work year that's $72/hour. This is the conversion rate between time and money, the way you put a dollar valuation on a customer's time (in my case the customers were internal engineering users). Attaching a dollar value to every metric matters, because compute hours, engineering hours, and time saved all need a common denominator, and that denominator is real dollars. 

Say 1,000 engineers run 20,000 jobs a week. Over a year that's a little over a million jobs, 1,040,000 to be precise. At a 10% failure rate, that's 104,000 failed jobs a year that somebody has to notice, diagnose, and fix.
In the standard case, which I'll call ninety percent of failures, the tool shortens the time from "job died" to "engineer knows why it died" by three hours. Faster notification, the error surfaced in chat instead of buried in a log, the relevant documentation already pulled into the response. Three hours times 94,000 failures is 282,000 hours a year.

Then there's the bad case, the other ten percent. A long simulation goes in on a Friday afternoon. It dies Saturday morning. Nobody is watching on a Saturday, so it sits dead until Monday, and the engineer walks in to two lost days of forward progress on work that never advanced. The tool collapses that gap from days to minutes, because the notification fires the moment the job fails regardless of what day it is. Call it two working days, sixteen hours, recovered. Sixteen hours times 10,400 of those failures is another 166,400 hours.

Add them up and you're looking at something on the order of 447,000 hours a year. Multiply by $72 and you get a number with a lot of zeros that would look fantastic on a slide.

So here's where I have to stop you, because this is exactly where I had to stop myself. That number is wrong, and it's wrong in a way that feels right, which is the dangerous kind. The engineers are not sitting idle for all 447,000 of those hours. They're not staring at a dead job for three hours waiting on a diagnosis. They kick off the job, go work something else, and circle back. So what does the tool actually recover? Not the wall-clock gap. The portion of that gap that was costing real productive time. And to know that, you need to understand how they actually work. How often do they check a running job? Do they check every job or only the ones that matter? What are they doing in between? I had assumptions about all of this, and some of them were wrong.

That's the honest part of this work that nobody puts in the slide deck. Some trains of thought feel clean and rigorous right up until they walk you straight into a dead end. The "multiply everything by the hourly rate" path is one of them. When that happens, you don't get to keep the pretty number just because the arithmetic was correct. You go back, talk to your customers, perhaps even shadow a few of them for a day or two, send out a survey, and you rebuild the estimate on something real. The recovery from the dead end is the work.

I'm not going to publish the variables and values I eventually landed on. It's specific to my environment and the dollar amount is the least transferable thing in this entire article. The method is the part worth thinking about. Find your conversion rate, count your events, be ruthlessly honest about how much time you're actually recovering versus how much merely elapsed, and discard the clean path the moment it stops being true.

Keep in mind that you are going to present these numbers to a mixed room. Some people in it will follow a Monte Carlo simulation in their sleep, and some will glaze over at the word "rate" and get a migraine from "probability." Math that everyone can verify on the back of a napkin is more persuasive than a sophisticated model only you can defend. Simple and defensible beats elegant and fragile every time someone in the room decides to push.

And failure recovery is just one lever. The same arithmetic runs on everything else the tool does. One-click resubmission saves the minutes of reconstructing and relaunching a job, multiplied by how often that happens. Running job-management commands inside chat saves the context switch out to a terminal behind a VPN. Non-convergence, where a job runs to completion but the result is useless, is its own bucket of recoverable time. AI-assisted diagnosis shaves the three-hour case down further (but by how much, really?). Each one is the same form: events per year, times time saved per event, times the cost of time. Run it for each capability and add.

## Adoption as a proxy control group

Here's where the missing experiment comes back around, because it turns out I had a control group the whole time. I just had to read it differently.

Nobody is forced to use this tool. It's not mandated, it's not in anyone's job description, there's no compliance checkbox, and initially, nobody was using it anyway. Every single engineer who used it chose to, and keeps choosing to, every week. So we ask the obvious question. Why would a thousand busy engineers voluntarily adopt and stick with a tool that wasn't helping them? They wouldn't. They have actual work to do, and if they're using this, there's a reason.

The adoption curve is the evidence. Sustained, growing, voluntary usage is a revealed preference. It's a survey on its own, one where users vote with their time instead of their words. You don't get a clean control group, but you get the next best thing: a population that would walk away the instant the tool stopped being worth the bother, and didn't.

That signal told me there was value there. I backed it with direct evidence, reaching out to the initial 380+ engineers one at a time (a painstaking but necessary and rewarding process), asking what they thought, what it saved them, and what was missing, then pointing them to a short questionnaire. The response rate was good. I sorted the answers by who they came from, individual contributors, tech leads, and engineering group managers, because the same tool means different things at different altitudes, and leadership reads endorsements from their own level differently than they read them from the floor.

## The hard ceiling nobody warns you about

If there's one thing I wish someone had told me earlier, it's this. A grassroots tool hits an information ceiling, and it hits it hard. Engineers find the tool and love it. Tech leads see their people using it and pass it around the group. And then, no and then, that's it. Awareness of the thing does not climb on its own past the team level, because nothing in the org is built to carry that kind of news from the floor upward. Information flows down freely. It does not flow up without a pump. Which, now that I write it out, follows the natural laws of gravity and energy minimization about as well as anything. For a bottom-up project, you have to be the pump.

So I climbed by hand and pushed the tool one level up as I went. I'd pull the adoption numbers for a team, show them in a meeting with that team's engineering manager, and let the data do the talking. Once I had a few engineering managers under the same director on board, I'd take the aggregate to the director, then to the executive director above them. Floor to ceiling, one rung at a time, carrying the same verified numbers and the same growing endorsement list up with me.

The endorsements and the adoption numbers were the fuel for that climb. One engineering group manager put it in writing in a way that stuck: over seventy-five percent of his team used the tool, it saved them significant time, and it improved their work-life balance. That last part stayed with me, and I've joked ever since that my app is good for your mental health. It started as a line in a survey response and ended up in front of senior leadership, because an endorsement from a manager about his own team is the kind of evidence that travels up the chain on its own.

## Numbers convince the room but don't travel, so craft something that does

Which brings me to the last thing, and the one I'm proudest of.

A spreadsheet convinces the people sitting in front of it. The problem is that you can't be in every room, and the spreadsheet can't present itself. The number that won the meeting on Tuesday is dead weight by Thursday unless something carries it forward when you're not there.

So I crafted something that could travel. I made a set of short videos about the tool, and I refused to make the usual low quality IT video, the screen recording with poor audio that nobody finishes. I scripted them properly and went through several revisions. I spliced real demo footage with B-roll, labeled each segment with title cards so viewers always knew what they were looking at: job submission here, job management there, kill commands, AI chat. I chose catchy but non-distracting background music and timed it to the tempo of the narration. I dropped in the B-roll sparingly, just enough to keep things interesting without pulling focus off the app. I leaned on professional tools I'd never used at that level and pushed them as far as I could.

The first two videos taught me how to do it and helped me get my footing. I learned what landed and what didn't, and by the third attempt it clicked (third time really is the charm). That one ran about three minutes, and for the voiceover I used a tongue-in-cheek narrator with a heavy country accent. It was funny (I thought), clear, and memorable in a way a slide deck or an Excel sheet never is. That video made it all the way up to the VP level, and it got there largely on its own, organically forwarded, because people share something that makes them smile in a way they will never share an attachment called `business_case_v4_final.xlsx`.

That's the lesson I'd share with anyone building something nobody asked for (but who in their right mind would do that anyway?). The numbers earn the right to be taken seriously. The endorsements give the solution credibility. A sharp, shareable, genuinely enjoyable artifact is what does the work when you're not in the room, and you will never be in every room (nor do you need to be).

So you may not get a control group, but that's OK. You get a tool that quietly makes people's day easier and users who prove your case every week by refusing to quit you. You get managers who hand you their endorsements unprompted because you saved their teams real time. And you get a short video with a country accent that walks into rooms you'll never be invited to and makes the argument for you. Build something valuable and prove it honestly, then give the proof a way to travel without you.

#### _That's how a tool nobody asked for becomes one nobody can imagine giving up._