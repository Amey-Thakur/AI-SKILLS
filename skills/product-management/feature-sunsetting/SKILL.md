---
name: feature-sunsetting
description: Remove features with usage evidence, migration paths, and staged communication that preserves trust. Use when retiring product surface or making the case that something should die.
---

# Feature sunsetting

Every feature costs maintenance, support, testing surface, and
cognitive load forever; removal is a product skill equal to shipping.
The craft is proving the cost-benefit honestly and moving the
affected users, not just deleting their workflow.

## Method

1. **Build the case on usage and cost.** Instrument actual
   usage (users, frequency, segments: see product-metrics),
   count the carry cost (bugs, support tickets, test time,
   the features it blocks: see tech-debt-register), and
   check strategic fit. "Low usage" alone is not the case:
   *who* uses it matters more than how many: 2% usage that
   is your top revenue accounts is a different conversation.
2. **Segment the affected before deciding.** Pull the actual
   list: which accounts, which plans, what they do with it,
   what they would do instead. Talk to the heaviest users
   (see customer-interviews): sometimes you find the
   workaround that makes removal safe; sometimes you find
   the use case that saves the feature (or becomes its
   replacement's spec).
3. **Provide the path before the deadline.** A replacement
   flow, an export (their data leaves with them: see
   data-retention's erasure sibling), or a documented
   alternative: with migration tooling where the users are
   many (see api-deprecation for the API twin, including
   sunset headers and usage tracking). No path means you are
   not sunsetting, you are breaking.
4. **Stage the removal.** Hide from new users (flag off for
   new signups: see feature-flags-hygiene), announce with
   dates to existing users (in-product where they use the
   feature, not just email), read-only period, then removal:
   with timelines proportional to workflow depth (a report
   format: weeks; an API or data format: quarters: see
   api-versioning's sunset program). Enterprise contracts
   may pin timelines: check before announcing (see
   Boundaries).
5. **Communicate the why, absorb the anger.** State the
   reason plainly (focus, low usage, replaced by X),
   acknowledge the cost to affected users, and give the
   escalation path; a visible "what we removed and why"
   changelog keeps trust (see roadmap-communication's
   change-loudly rule). Expect the loudest feedback of the
   feature's life *at removal*: measured in support volume,
   budget for it (see product-launch's support staffing,
   inverted).
6. **Actually delete, then verify.** Remove the code, the
   flags, the docs, the tests, the marketing pages (see
   dead-code-removal, docs-maintenance); watch the metrics
   and support themes through the removal window for the
   damage you missed; record the outcome against the case
   you made (see decision-journals): sunsets that were
   wrong teach your usage instrumentation something.

## Boundaries

- Contractual and compliance obligations override product
  logic; legal review joins any sunset touching paid
  commitments, data retention, or regulated workflows.
- Deprecating-but-never-removing ("zombie mode") accrues
  the full carry cost plus broken trust when it finally
  dies; if you announce a sunset, finish it.
- Sunsetting a whole product (with revenue, migrations,
  and PR surface) is this method at 10x ceremony with
  executive ownership; do not run it from a feature-level
  playbook alone.
