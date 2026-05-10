---
title: "Speaking the Language of Money When Asking for It"
date: 2026-05-10
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

> "If you can't explain it in $dollars, you can't explain it." - Me (I think)

You need money. More importantly you need a lot of money that isn't yours - and you need to convince someone else to give it to you. 
Let's say you need to purchase something - additional storage capacity, or perhaps new software. It's not directly customer facing; you're building plumbing that's not glamorous but necessary and an overall net gain. You don't have budgetary authority and you need to put together a convincing case in a time where most companies are focused on "streamlining" and "efficiency" to reduce overhead, increase *EBITDA*, and maximize profitability. You also can't count on getting a mulligan, so no do-overs; you get one shot, one opportunity. Would you capture it, or just let it slip? 

Wait - EBITDA. Did you recognize that or did you gloss over it? Earnings before interest, taxes, depreciation, and amortization. It's how executives measure operational profitability. If that's new to you, bookmark it as we'll need it.

Let's take a look at a concrete example - purchasing new software. We need to put a business case together for a purchase that has a high enough TCO to raise eyebrows, but a short payback period and high overall ROI when you factor in CapEx, OpEx, opportunity cost of inaction, and the value streams it unlocks. A tight case that minimizes annual licensing overhang through right-sizing, accounts for implementation and onboarding in the total cost picture, and makes the payback period impossible to argue with.

If all of that already makes sense, congrats - you don't really need this article. But if any of it washed over you, or you know the terms but freeze when you have to produce the actual numbers, let's keep going.

To anchor the discussion and have something practical to talk about, let's pretend we need to buy infrastructure software.

Suppose you're building an AI-enabled system for digital supply chain logistics analysis and you're currently using a `vector + LLM` approach with a traditional RDBMS like Azure SQL Server (which supports native `VECTOR` data types). It's functional but there's a problem.

The problem is that a vector store examines the semantic "closeness" between a search term and the underlying data we've stored. If you ask a simple query - which general in history has the most victories and fewest defeats - there's a high chance it may give you a different answer each time. That's because semantic similarity is not the same as structured reasoning; counting victories and comparing across generals requires stepping through  relationships instead of finding nearby vectors. After some digging, you determine that a graph database like Azure CosmosDB with the Gremlin API or Neo4j with Cypher are not only a better fit for this system, but could potentially be used throughout multiple problem domains in your organization. For the generals question, you can naturally step through the graph, walking from a general along relationship edges like "victorious_at" a battle, arriving at an accurate count instead of a semantic guess. You're convinced there's value here and you want to request funds to buy an enterprise license.

But here's the challenge: your intuition is initially messy, the problem is technical, and there's no number attached to any of this. How do you translate your vision into something others will not only understand, but support financially at a potential risk to the organization?

## Do your homework before the pitch

We've all heard the phrase "do your homework" in one context or another. It pairs well with another - "a fool and his money are soon parted."

A sizeable amount of effort needs to be invested upfront to ensure we not only understand what we're trying to do, who it benefits, and how much it's worth - but that we can succinctly and clearly explain it to the people who control the purse. We do our homework to remove foolishness and ignorance from the equation - both for us and for our stakeholders - minimizing the chance that the company spends hard earned money for no good reason. 

You may argue that the problem domain is complex, so you need a long explanation complemented with charts and graphs. That, in my experience, is exactly what a technologist does - and it is often both wrong and loses the room. The litmus test for any funding pitch is simple: can you explain it to a non-technical person in under ten minutes, clearly and well enough that you don't just secure their buy-in but their enthusiasm? If you're overwhelming your audience with jargon and PowerPoint decks riddled with complex graphics, you're most likely not telling them what they actually need to know. And what they need to know isn't complex, nor should it take long to communicate. It boils down to three things:     
    
1. How much money do you need?
2. What do you intend to do with it?
3. How much money are you going to save or make because of it?

To get to that point, you need to understand the problem, the proposed solution, and the path to making it a reality at great depth.     
For our graph database example, that means coming in with answers to questions like:

- How much does the existing solution cost, fully loaded?    
- How much will the new software cost - license, implementation, onboarding? This is our Total Cost of Ownership (TCO). Implementation and onboarding are typically one-time capital expenditures (CapEx); the annual license is recurring operating expense (OpEx). Both matter, but they get budgeted differently and your finance partner will care about the split.    
- What are we getting for that money - how many licenses, for how many users, with what resource limits?    
- Is pricing dynamic or fixed? If fixed, how do we right-size so we're not paying for capacity we'll never use? If a vendor wants to sell you 500 seats and you have 80 users, you don't need 500 seats - negotiate for what you'll actually use with room to grow.    
- What happens at renewal? 
    
And that's before you get into the harder questions about security and compliance posture, integration complexity, and who owns the IP for features your company requests and pays the vendor to build. Those aren't optional as a sharp stakeholder will ask if you don't, and you don't want to be caught unprepared.

> Do your homework so you're not the fool in the room and so those betting on you don't end up the fool either.  

## Do your due diligence (it's different from your homework)

Doing your homework and doing your due diligence are, while closely related, separate things.

`Doing your homework = removing ignorance from the equation (starting with yours)`   
`Doing your due diligence = no sole source, no blind trust`     
    
In some instances a team may evaluate options internally - install evaluation versions, research competing products online, pick the one they like best, and go to the vendor. 
    
That'll cost you. You may think: "But I did my homework, I evaluated multiple competing products internally and thoroughly researched them." And you may well have, but if you only reach out to one vendor, they'll smell it instantly. Their legal department will be more aggressive during negotiations, their sales rep will push to close faster, and you're not likely to get the best price.
    
What can we do instead? Perhaps we should do what the government does - have multiple vendors submit competitive bids and choose the cheapest one. Well, partially.
    
Reach out to multiple vendors and have them submit proposals back to you. Instead of you going to them, have them come to you. Let them know professionally but directly that they're not the only vendor you're speaking with and that they are in a competitive process for your business; they'll need to earn it.

Get to know each vendor's sales team and ask to be connected to their technical team to get a demo and ask questions. Understand performance tradeoffs between products, their SLAs, their support packages - do they include after-hours support or is it business hours only? If you're getting a sweetheart deal from one vendor but prefer another's solution, let them know and see if they can match. The credible threat of walking away is often enough; you don't have to actually leave, you just need them to believe you will.

Don't be afraid to channel your inner Niccolo Machiavelli. Stir the pot. Light a fire. Most importantly, don't be afraid to walk away. You don't owe the vendors anything, and in the absence of a solution you're confident in, sometimes the right answer is no deal and back to what you have.

Doing your due diligence means using a combination of sales tactics and political savviness to get your targeted vendors to come to you with good data and a better offer, which will make your job that much easier.

## Frame it in terms of value and attach a number

This is where most technical people flinch, and that is what usually kills otherwise worthwhile proposals. You have to be brave enough to attach a number to everything, even when you're not sure. Especially when you're not sure.

Start with what you already have. Your current solution has a cost: infrastructure, runtime, licensing, and maintenance - so add it all up. If you're running Azure SQL Server with a vector extension, what's the monthly compute bill? What's the storage cost? What's the fully loaded cost per query at your current volume? These numbers exist and if you look, you will find them.

Now the harder part: what does the current solution cost you in ways that don't show up on an invoice? Every time an engineer works around a limitation in the existing system, that's hours spent on a workaround instead of on value. Every time your AI returns a hallucinated answer because your vector store can't reason about relationships, that's a decision made on bad data. What does that cost? You may not know exactly, and that's fine. Take a guess, state your assumptions, and move on. A transparent estimate with stated assumptions is infinitely more credible than having nothing.

For the new solution, your vendor proposals give you the cost side. But you also need to estimate the return. This is where you need to talk to people, not just crunch numbers in a spreadsheet alone. Go to the sales team and ask how long it takes them to profile a customer relationship today. Go to the infrastructure team and ask how many hours per month they spend diagnosing cascading failures. Go to whoever owns the AI system and ask how often hallucinations or retrieval failures create downstream rework and how long that takes to fix. Get their estimates, even rough ones, and translate every single one into real dollars.

The Bureau of Labor Statistics publishes loaded hourly rates by occupation. If your graph database saves a software engineer two hours a week on a workaround, and that engineer makes $75 an hour all in, that's $7,800 a year per engineer. Scale that across the impacted teams. That's your operating expense (OpEx) reduction via recurring annual savings. Suddenly "saves engineer time" has not one but two numbers attached to it - how much time in hours and what that time is worth in dollars - and these numbers are something a budget holder can actually evaluate. 

Now we can crunch the numbers budget holders are particularly interested in. If the new software costs $40,000 a year and saves you $7,800 per engineer across 10 engineers, that's $78,000 in annual OpEx reduction against $40,000 in cost - a payback period of about six months, and a return on investment (ROI) of 95% in year one. Those two numbers - payback period and ROI - are what a finance partner will look for first so have them handy. 

Do this for every value stream you identified, every distinct way the new solution creates value: hours saved, incidents reduced, improved decision quality, reduced AI failure rates, faster customer response times (all of these combined provide value to the customer).

The goal is not a perfect financial model but to **show that you've thought seriously about return, not just cost, and that you're willing to put a flag on the proverbial hill and defend it.**

## "Why not just use what we have?"

Assume you will get this question. Plan for it, because there are always naysayers, and some people have never met a new idea they couldn't find a problem with. That's often not cynicism. If someone has been burned by a poorly executed change in the past, their skepticism is earned. Assume everyone is operating in good faith and doing what they think is best for the organization. Your job is not to steamroll them, it's to come prepared with facts and data, because the status quo has a strong gravity pull and you're going to need real force to reach escape velocity.

In our graph database example, expect questions like:

- "We already have Azure SQL Server, why are we adding another system to maintain?"
- "Can't we just optimize our existing queries?"
- "What happens when this vendor raises prices or gets acquired?"
- "Who owns this after you build it, and what's the bus factor?"
- "We tried something like this two years ago and it didn't work."

None of these are unreasonable. Have an answer for each one before you walk in. For the SQL Server question, the answer is not a technical rebuttal, it's a value rebuttal: SQL Server can answer some question eventually, through an analyst, in 45 minutes; for some questions of a high enough complexity the query can collapse entirely due to recursive self joins (which graphs avoid). What you're building provides that answer in milliseconds, inside an agent loop and without a human involved. Those are not substitutes for each other.

For the "we tried this before" objection, don't dismiss it. Ask what happened and understand why it failed so you can avoid it. Then explain specifically what is different this time, whether that's the tech maturity, the approach, the team, or the problem definition. Respecting the experiences of others in the room - good or bad - goes a long way. 

You're not there to win an argument. You just need to move the organization forward, and sometimes that means slowing down long enough to bring the skeptics with you rather than trying to run past them.
You can't always win everyone over though; some people are entrenched in their thinking and reflexivelly opposed to change. Recognize it for awareness and move on, as more than likely you won't need unanimous approval, just a solid majority plus the key controlling votes. 


## Prep the room before you're in it

The worst thing you can do is walk into a funding meeting where your proposal is the first time anyone in that room is hearing about it. Don't do that to yourself, and don't do it to them.

This doesn't mean going around your leadership's back or building a shadow coalition. It means being thoughtful about how you introduce a new idea into an organization before you ask anyone to bet money on it.

Start small. If the software has an evaluation version, install it, run a pilot, and do an informal demo for anyone who's curious. You're not selling anything yet, you're just familiarizing people with what the technology even is and what it can do. A stakeholder who has already seen a demo is a very different conversation than one hearing about graph databases for the first time while you're asking them to sign off on a six-figure license.

Grab lunch with people. In a low-stakes setting, describe the limitations of the current system honestly: "We keep running into this problem where the AI gives inconsistent answers on relationship queries, and I've been looking at whether a graph layer would solve it. What's your take?" You're not pitching, you're thinking out loud and inviting their perspective. People are far more receptive to ideas they feel they helped shape than ideas that arrive fully formed and asking for a decision.

If you have a more technical audience, write a whitepaper. Put your analysis in writing, share it, and let people engage with it on their own time. It signals rigor and gives people something to react to before the formal conversation.

And whatever you do, respect the processes and territories that already exist in your organization. If you have a purchasing department that wants to be included in every vendor interaction, include them from day one. Don't treat them as a bureaucratic obstacle, treat them as a true partner instead (they can tell the difference). They've seen more vendor negotiations than you have and know where the landmines are; if they trust you, they'll go to bat for you when it matters. If you cut them out and they find out later, you've made an enemy without needing to.

Figure out what the process is and work within it while bringing people along. The goal is to walk into your funding meeting with the outcome already mostly decided, and the meeting itself just being the formality that makes it official.

## Closing thoughts

Getting the money to do something - buying hardware, software, or services - is possible. It happens every day across many industries, including yours (likely this quarter). 
But what also happens every day is that good ideas stall or die because they were not justified well enough for others to buy into the value proposition. The technologists pitching them assumed their audience would do the translation work. The audience usually doesn't because that's not their job; it's yours.

If you've been on the outside looking in and wondering how some projects get funded while others don't, the answer is rarely about which idea was technically superior. Funding is given to the ones most clearly communicated, in the language of money, to the stakeholders with the authority to fund them. Opt for clarity over cleverness; a merely passable idea with a tight business justification, a credible payback period, and stakeholders who already understand it will beat a brilliant idea explained in convoluted jargon every time.

None of this is a substitute for the work itself because you still need to deliver what you proposed. A successful pitch gets you the money; relentless execution is what turns the money into value, and a proven track record of delivering value is what gets you the next pitch. In short: speak the language of money, do your homework and due diligence, and don't leave anyone behind. When everyone in the room is on roughly the same page (perfection is the enemy of good), ask for what you need.
