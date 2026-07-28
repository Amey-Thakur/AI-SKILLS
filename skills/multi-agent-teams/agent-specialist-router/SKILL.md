---
name: agent-specialist-router
description: Route each request to the agent best suited to it, with a fallback and an explicit unknown path, instead of one generalist handling everything. Use when tasks vary enough that one prompt serves none of them well.
---

# Agent specialist router

One agent covering many task types is mediocre at each, because the
instructions that help one hurt another. A router classifies first and
dispatches to a specialist, which improves quality and cost at the price
of one extra step and a new failure mode: misrouting.

## Method

1. **Define the categories by how work differs, not by topic.** If two
   categories would take identical instructions, they are one category.
2. **Classify cheaply.** The router does not need the strongest model;
   it needs a reliable one with a small, well-specified job.
3. **Give the router an explicit unknown.** Forcing every input into a
   category is what produces confidently wrong routing. Unknown goes to
   a generalist or a human.
4. **Make each specialist genuinely specialised.** Tailored
   instructions, examples, and tools. A router in front of identical
   agents adds latency and nothing else.
5. **Log the routing decision with the input.** Misrouting is invisible
   otherwise, and the log is what lets you fix the categories (see
   agent-eval-design).
6. **Handle multi-category requests deliberately.** Either split them or
   send to the broadest relevant specialist, decided in advance rather
   than per case.
7. **Let specialists reject.** A specialist that recognises the work is
   not its own should return it rather than attempt it (see
   agent-handoff-protocol).

## Boundaries

Routing improves fit; it adds a step that can itself be wrong, and a
misroute is usually worse than a generalist attempt. It suits stable
task distributions and needs recategorising as work changes. Maintaining
many specialists costs more than one generalist, so the quality gain
must justify it.
