---
name: agent-strategy-review
description: Run a periodic strategy review with agents that check whether stated goals still match reality, argue the alternatives, and force an explicit continue or change decision. Use when quarterly planning repeats last quarter's plan by default.
---

# Agent strategy review

Strategy drifts by inertia: goals set once are carried forward because
changing them feels like failure. A review desk exists to make the
default explicit rather than automatic, by testing the goals against
what has actually happened.

## Team

- **Evidence gatherer** (`agent-analytics-desk`): assembles what
  happened against what was expected.
- **Advocates**: one arguing to continue, one arguing to change, each
  from the evidence.
- **Synthesiser** (`decision-matrix`): frames the decision with its
  strongest objection.

Shape: evidence first, opposing arguments in parallel, one decision
pack.

## Method

1. **Restate the current strategy plainly first.** Where we are trying
   to win, for whom, and why we believed we could. Many reviews discover
   the team cannot state this consistently.
2. **Compare expectation to outcome without softening.** What was
   predicted, what happened, and the size of the gap (see
   agent-board-reporting).
3. **Argue both sides properly.** A continue advocate and a change
   advocate, each making the strongest honest case, because a review
   with one voice ratifies rather than tests.
4. **Separate execution failure from strategy failure.** A good strategy
   executed badly and a bad strategy executed well need opposite
   responses, and conflating them is the most expensive error here.
5. **Name what would change your mind.** Stated in advance for the next
   period, which converts the following review from opinion into a
   check (see decision-journals).
6. **Decide explicitly, including to continue.** Continuing is a
   decision that must be made rather than a default that occurs.
7. **Set the review date and the metrics before ending.** Otherwise the
   next review starts from scratch.

## Run it

In Claude Code, run the evidence gatherer first into a facts file, spawn
the two advocates in parallel each writing their own argument, then the
synthesiser into a decision pack. The human decides. Port to AutoGen as
a GroupChat with fixed opposing roles, or CrewAI as parallel tasks into
one synthesis task.

## Signals it works

- Each review states what was predicted and what happened.
- Continuing is recorded as a decision with reasons.
- The next review has pre-agreed evidence to check against.

## Boundaries

Agents assemble evidence and argue positions; humans own strategy, which
depends on context, relationships, and appetite for risk that no agent
holds. Advocates argue from available evidence and cannot see what was
never measured. This is a thinking aid, not a substitute for the
accountable person's judgement.
