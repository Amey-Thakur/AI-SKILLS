---
name: agent-board-reporting
description: Assemble an investor or board update from source metrics with agents that draft, fact-check every number, and surface bad news rather than bury it. Use when periodic reporting eats days and the numbers keep needing correction.
---

# Agent board reporting

Board reporting fails in two directions: a scramble that produces
inconsistent numbers, or a polished narrative that quietly omits what
went wrong. Agents fix the first reliably and can worsen the second, so
this desk is built around a check that specifically hunts for omission.

## Team

- **Metrics assembler** (`saas-metrics`, `product-metrics`): pulls the
  standing metric set from source and computes movement.
- **Narrator** (`status-updates`): drafts the commentary against the
  numbers.
- **Fact checker**: verifies every figure back to source and flags any
  claim without one.
- **Omission checker**: asks what a well-informed sceptic would want to
  know that the draft does not say.

Shape: assemble, draft, then two independent checks before human review.

## Method

1. **Fix the metric set in advance and keep it stable.** Changing which
   metrics appear between periods is how reporting loses credibility.
   If a metric is dropped, say so and why.
2. **Compute from source every period.** Never carry a number forward
   from the last deck, because that is how an error survives four
   quarters.
3. **Write commentary that explains movement.** Each material change
   needs a cause, and where the cause is unknown, saying so is
   stronger than a plausible story.
4. **Run the omission check as a separate pass.** Its only job is to
   find the missing bad news: the metric that stalled, the churned
   account, the missed milestone. Fold it into drafting and it stops
   working (see agent-red-team-blue-team).
5. **Separate fact from forecast visibly.** Actuals, forecast, and
   aspiration are three different things, and blurring them is the
   failure that damages trust permanently.
6. **Keep the ask explicit.** What the board is being asked to decide,
   approve, or help with, stated plainly rather than implied.
7. **Version the pack with its source snapshot.** Later questions
   should be answerable against exactly what was reported.

## Run it

In Claude Code, run the assembler over exported data into a metrics
file, the narrator over that file, then the fact checker and omission
checker as separate subagents writing findings the human reads
alongside the draft. Nothing goes to a board without human sign-off.
Port to LangGraph with two verification nodes that can return the draft
for rework.

## Signals it works

- Every number traces to source, recomputed this period.
- The omission check regularly finds something the draft had softened.
- Actuals and forecasts are never presented in the same shape.

## Boundaries

Agents assemble and draft; the accountable human owns what is
communicated to investors and directors. Statements to investors carry
legal weight, and misstatement has consequences that no drafting
process transfers to a tool. Forward-looking statements, valuations,
and financial statements need qualified review.
