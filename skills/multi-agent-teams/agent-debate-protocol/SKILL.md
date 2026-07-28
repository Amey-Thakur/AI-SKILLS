---
name: agent-debate-protocol
description: Have agents argue opposing positions from the same evidence, then synthesize, so the strongest case for each option is heard before deciding. Use when a decision is genuinely contested and one agent's answer would hide the trade-off.
---

# Agent debate protocol

Asking one agent for a recommendation gets you a confident answer with
its counterarguments buried. Debate surfaces them by construction:
advocates argue their assigned side properly, and the synthesis has to
account for both rather than for one.

## Method

1. **Fix the options before the debate.** Two or three concrete
   positions. Advocates argue the given options; letting them invent new
   ones mid-debate turns argument into brainstorming.
2. **Assign sides, and require genuine advocacy.** Each agent argues its
   position as strongly as the evidence permits, including where the
   evidence is thin. Balanced advocates produce mush.
3. **Give every advocate the same evidence.** Differences should come
   from interpretation, not from information asymmetry, or the debate is
   decided by who was told more.
4. **Run at least one exchange.** Opening statements alone are parallel
   monologues; a rebuttal round is where weak arguments are exposed.
5. **Have a separate synthesizer.** Not one of the advocates, since an
   advocate cannot fairly weigh its own case (see
   agent-pricing-committee for a worked example).
6. **Require the synthesis to state the losing case's strongest
   point.** If it cannot, the debate was not real.
7. **End with a recommendation and its conditions.** What would have to
   be true for the other option to win, which is what makes the decision
   reviewable later (see agent-decision-log).

## Boundaries

Debate clarifies trade-offs; it does not produce truth, and a confident
advocate can win an argument the evidence does not support. It costs
several times a single query, so reserve it for consequential and
genuinely contested decisions. Humans decide; the pack is an input (see
agent-human-checkpoint).
