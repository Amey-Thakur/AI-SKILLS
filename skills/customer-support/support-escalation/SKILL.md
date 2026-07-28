---
name: support-escalation
description: Move a ticket to engineering or management with the context needed to act, and set expectations with the customer while it moves. Use when a ticket cannot be resolved at the current level.
---

# Support escalation

Escalation fails in both directions: too readily, and engineering
becomes a second support queue; too reluctantly, and customers wait days
for something the front line was never going to solve.

## Method

1. **Define what qualifies before it happens.** A bug with reproduction,
   a decision above the agent's authority, or a case exceeding a time
   threshold. Vague criteria produce inconsistent escalation.
2. **Escalate with a complete package.** What the customer did, what
   happened, what was expected, what has been tried, and the account
   details. An escalation the receiver must investigate from scratch
   wastes both roles (see bug-report-triage).
3. **Attempt reproduction first.** A confirmed reproduction turns an
   escalation into an actionable bug; an unreproduced report usually
   returns for more detail.
4. **Tell the customer what changes.** That it moved, what happens next,
   and when they will hear, since silence during escalation is where
   trust is lost.
5. **Keep ownership with support.** The support agent remains the
   customer's contact through the escalation rather than handing the
   relationship to engineering.
6. **Set a follow-up cadence and hold it.** Updates on a schedule even
   when the update is that there is no news (see
   agent-accountability-loop).
7. **Feed resolutions back.** Every escalation resolved should produce
   an article, a macro, or a fix that prevents the next one (see
   knowledge-base-design).

## Boundaries

Escalation moves the problem; it does not prioritise it against
engineering's other work, which is a product decision. Repeated
escalations of the same issue are a product defect rather than a support
process problem. Customer-facing commitments about timelines need
authority to make.
