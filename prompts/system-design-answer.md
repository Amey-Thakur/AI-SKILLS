---
name: system-design-answer
description: Answer a system design question the way a strong senior engineer would, from requirements to tradeoffs to scale.
variables:
  - "{problem}: the system to design (e.g. design a URL shortener, a news feed, a rate limiter)"
  - "{scale}: expected scale and constraints, if given (users, QPS, data size, latency)"
settings: "Temperature 0.3-0.5 for structured, grounded reasoning."
---

Design: {problem}

Scale and constraints: {scale}

Work through it as a design interview or real design would:
1. Clarify requirements first: functional (what it must do), non-functional
   (scale, latency, availability, consistency), and what is out of scope.
   State assumptions where the prompt is silent, do not silently assume.
2. Estimate the load: QPS (read vs write), data volume and growth, so the
   design is sized to a number, not a vibe.
3. Define the API and the data model.
4. Draw the high-level architecture: the components and how a request flows
   through them. Start simple, then scale.
5. Deep-dive the hard parts: the bottleneck, the storage choice (SQL vs NoSQL
   and why), caching, partitioning/sharding, the consistency vs availability
   call. Name a real tradeoff at every significant choice.
6. Address scale, failure, and bottlenecks: what breaks first at 10x, and how
   you handle it (replication, load balancing, backpressure, graceful
   degradation).

Rules: reason from requirements to design, justify every choice with a
tradeoff, and prefer the simplest design that meets the requirements over the
most impressive. Flag where you would push back on unrealistic requirements.
If scale is unspecified, state the range you are designing for.
