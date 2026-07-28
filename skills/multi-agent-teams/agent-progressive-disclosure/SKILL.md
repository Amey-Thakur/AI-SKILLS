---
name: agent-progressive-disclosure
description: Give agents context in stages, escalating to more capable models or fuller context only when the cheap path proves insufficient. Use when most tasks are easy but a few are hard and cost or latency matters.
---

# Agent progressive disclosure

Sending every task to the strongest model with the fullest context is
simple and expensive, and often worse, since a large context degrades
attention. Progressive disclosure starts cheap and escalates on
evidence, which usually handles most work at a fraction of the cost.

## Method

1. **Start with the smallest viable context and model.** Most tasks are
   routine, and routine tasks do not need the flagship model or the
   whole corpus.
2. **Define the escalation trigger explicitly.** Low confidence, a
   failed verification, or an explicit cannot-answer. Escalating on
   vibes means escalating always.
3. **Let the agent say it lacks context.** An agent that can request
   more is far more useful than one that guesses, and the request itself
   tells you what was missing.
4. **Escalate along one axis at a time.** More context or a stronger
   model, so you learn which one mattered rather than paying for both.
5. **Cache what escalation revealed.** If a class of task always
   escalates, promote it to start at the higher tier rather than paying
   the failed cheap attempt each time (see agent-specialist-router).
6. **Cap the ladder.** After the top tier, the answer is a human, not
   another retry.
7. **Measure the escalation rate.** Rising rates mean the cheap tier no
   longer fits the work, which is a signal to re-tune rather than to
   raise limits.

## Boundaries

This optimises cost and latency; it adds a failed first attempt to every
escalated task, so it loses on workloads that are uniformly hard.
Confidence signals from models are unreliable, so triggers based on
verification outcomes are sounder. Never let cost optimisation weaken a
check on consequential work (see agent-human-checkpoint).
