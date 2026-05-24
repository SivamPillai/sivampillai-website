---
title: "Autobot — Building an Autonomous Line Follower Robot (2009)"
subtitle: "A retrospective on building an autonomous robot for a national-level competition — and the engineering lessons hidden inside a simple line follower"
description: "Autobot was a line follower robot built during my third year of engineering for a national-level robotics competition in 2009. What began as a wired control system evolved into an autonomous robot capable of navigating complex optical paths under real-world constraints."
pubDate: 2020-02-11
tags: ["robotics", "autonomous", "embedded systems", "line follower", "electronics", "college project", "engineering"]
role: "Project Lead, Programmer & Systems Integration"
status: "shipped"
author: "Sivam Pillai"
link: "https://www.youtube.com/watch?v=2Mr_DHkr3DM"
impact: "One of my earliest autonomous robotics projects — an experience that shaped how I think about reliability, real-world systems, and engineering under uncertainty."
image: "public/projects/x003-hero.webp"
---

There’s a moment in the video where it genuinely looks like the robot has lost the line.

The front wheel drifts away from the track.  
The audience reacts.  
A few people start cheering nervously.

And then — almost unexpectedly — the robot corrects itself and locks back onto the path.

That moment pretty much captures the entire story behind **Autobot**.

---

## The Competition

Back in 2009, during my third year of engineering, my friends and I participated in a national-level robotics competition held at Government College of Engineering, Aurangabad, Maharashtra.

The challenge was simple in theory:

> Build a robot capable of autonomously following an optical path as quickly and accurately as possible.

Like many engineering problems, it sounded far simpler than it actually was.

---

## The Birth of Autobot

What eventually became *Autobot* did not begin as a fully autonomous robot.

Our original design was a wired and controlled system intended primarily for speed. But as the project evolved, we decided to redesign it into a fully autonomous line follower using onboard sensors for navigation.

That transition changed everything.

Suddenly we were no longer just building a moving machine.

We were building a system that had to continuously sense, interpret, and react to its environment in real time.

Looking back now, I think this was one of my earliest experiences with designing feedback-driven autonomous systems — long before I formally worked in AI, IoT, or intelligent monitoring systems.

---

## Building Through Iteration

Like most student engineering projects, the robot went through countless iterations.

The mechanical structure and physical design evolved through brainstorming sessions, experiments, and repeated adjustments as a team. I handled the programming and overall systems integration while all of us collectively worked through the design challenges.

Some of the most interesting decisions came from pure improvisation.

For example, the front wheel assembly was actually repurposed from a toy car because we could not find the right wheel dimensions in the local market at the time. Instead of waiting for ideal components, we adapted what we had available and redesigned parts of the structure around it.

Looking back, that small detail probably captures the spirit of the entire project better than anything else.

Interestingly, the sensors were mounted toward the rear side of the robot rather than the front. This meant the robot often visually appeared unstable because the front wheel could drift away from the line before the sensors detected the deviation and corrected the motion.

To spectators, it looked like the robot was moments away from failure.

But internally, the control logic was still functioning correctly.

Ironically, this “almost failing” behavior made the run far more exciting for the audience.

---

## Why Sensor Symmetry Mattered

Another important realization came while handling junctions and intersections on the track.

We learned that sensor alignment had to be extremely symmetrical.

At crossing points, even a slight imbalance could cause the robot to incorrectly interpret the path and drift toward one side instead of continuing forward.

That seemingly small mechanical detail ended up becoming critical to the reliability of the entire system.

It was one of those moments where engineering stops being about isolated components and starts becoming about systems behavior.

---

## The Problem We Never Expected

Originally, we had been told the competition would take place indoors.

But shortly before the event, the setup was moved outdoors.

That single change created a completely unexpected problem.

The optical sensors began reacting to sunlight.

During preliminary testing, the robot started losing the path unpredictably because ambient light interfered with the sensor readings.

At that moment, it genuinely felt like the entire project might fail.

But after some quick experimentation, we improvised a surprisingly simple solution:

We added black tape around the sensors to shield them from direct sunlight.

And suddenly, the robot became stable again.

That experience taught me something I still think about often:

> Real-world systems rarely fail inside ideal laboratory assumptions.  
> They fail at the boundaries where reality interferes with design.

---

## Competition Day

We were the very first team on the track that day.

I still remember nervously walking around the arena in an orange shirt, constantly hoping the robot would not lose the path in front of everyone.

The funny thing was that many robots during the competition ended up drifting off the track entirely.

Autobot never did.

It wasn’t the fastest robot in the competition — we finished fourth overall — but it successfully completed the course without losing the path even once.

And honestly, that felt like a bigger victory.

> Autobot wasn’t the fastest robot on the track — but it never lost the line even once.

Because by that point, reliability mattered more to us than raw speed.

---

## Looking Back

Today, when I work on AI systems, industrial monitoring platforms, and autonomous decision-making systems, I sometimes think back to projects like this.

Not because the technology was advanced by modern standards.

But because the underlying engineering lessons remain exactly the same:

- Real systems behave differently outside controlled environments
- Reliability is often more important than peak performance
- Small design decisions can have system-wide consequences
- Constraints force creativity
- Engineering is ultimately an iterative process of observation, adaptation, and refinement

Autobot may have been a college robotics project from 2009.

But in many ways, it was also the beginning of how I learned to think as an engineer.

---

## Watch the Robot in Action

<iframe width="100%" height="400" src="https://www.youtube.com/embed/2Mr_DHkr3DM" frameborder="0" allowfullscreen></iframe>

You can probably spot me in the orange shirt nervously following the robot around the arena 😄

---

## Credits

This project would not have been possible without the teamwork, brainstorming, and support of my friends and teammates: *Ridhi, Madhuri, Krishna*

A memorable project.  
An unforgettable competition.  
And one of the earliest engineering journeys that stayed with me long after college.