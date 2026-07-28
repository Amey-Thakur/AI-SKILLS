---
name: agent-status-rollup
description: Aggregate desk-level state into an honest company view where problems stay visible instead of averaging away. Use when everything is reported green and things are still going wrong.
---

# Agent status rollup

Rollups lose information by design, and the information they lose first
is bad news. Three desks amber become one green, and the picture that
reaches the operator is comfortable and wrong. A good rollup preserves
the exceptions.

## Method

1. **Roll up the worst, not the average.** A parent takes the status of
   its most troubled child, since averaging is exactly how problems
   disappear.
2. **Require a reason with any non-green status.** What is wrong, what
   is being done, and by when. A colour with no explanation cannot be
   acted on.
3. **Keep the exception visible at every level.** The top-level view
   should name the specific problem rather than merely showing a colour,
   which means the exception travels rather than the summary.
4. **Distinguish at risk from failed from blocked.** Each needs a
   different response, and merging them into a single warning removes
   the information a decision needs.
5. **Timestamp everything and flag staleness.** A status not updated
   recently is unknown rather than good, and treating stale as green is
   the second most common rollup lie.
6. **Make the drill-down one hop.** Any summary line links to the desk
   detail, or people stop trusting the summary and go asking directly.
7. **Audit the rollup against reality periodically.** Compare what was
   reported to what actually happened, since a rollup that was green
   before a failure needs its inputs fixed (see agent-board-reporting).

## Boundaries

The rollup reports; it cannot know what desks fail to report, so a desk
that hides a problem produces a confident wrong picture. Status is not
progress, and a system can be green while delivering nothing of value.
Anything shared beyond the operator carries its own obligations (see
agent-executive-briefing).
