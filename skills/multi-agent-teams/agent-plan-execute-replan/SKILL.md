---
name: agent-plan-execute-replan
description: Separate planning from execution and replan when reality diverges, so a long task does not follow a plan that stopped being true. Use when work has many steps and early assumptions are likely to be wrong.
---

# Plan, execute, replan

An agent that plans once and executes blindly follows a stale plan into
the ground. One that replans constantly never finishes. The working
pattern is an explicit plan, execution against it, and replanning
triggered by divergence rather than by every observation.

## Method

1. **Plan in steps with observable outcomes.** Each step states what
   done looks like, which is what makes divergence detectable at all.
2. **Separate the planner from the executor.** The planner holds the
   goal and the sequence; executors do one step with only what that step
   needs (see agent-context-isolation).
3. **Check the outcome after every step.** Comparing what happened to
   what was expected is the entire mechanism; without it you have a
   script, not a loop.
4. **Replan on divergence, not on every step.** A step that succeeded as
   expected needs no replanning, and replanning by default burns context
   and loses coherence.
5. **Keep the goal fixed while the plan changes.** Drifting goals are
   how long-running agents end up solving a different problem than the
   one asked (see goal-driven-execution).
6. **Cap total steps and replans.** A hard ceiling turns an infinite
   loop into a reported failure, which is always the better outcome.
7. **Surface the plan to the human.** A visible plan is reviewable
   before expensive execution and is the cheapest intervention point
   (see agent-human-checkpoint).

## Boundaries

This pattern handles uncertainty; it cannot rescue an impossible or
under-specified goal, which needs a human to reframe. Every replan
costs a full planning pass. Steps with irreversible effects must be
gated regardless of how confident the plan is (see
agent-delegation-protocol).
