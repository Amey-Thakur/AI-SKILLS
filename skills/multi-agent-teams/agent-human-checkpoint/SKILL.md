---
name: agent-human-checkpoint
description: Place human approval at the points where being wrong is expensive or irreversible, with enough context to decide quickly. Use when agents perform work that has real consequences.
---

# Agent human checkpoint

Autonomy is valuable until it touches something irreversible. A
checkpoint is the deliberate pause where a person decides, and its
design matters: too many checkpoints and people rubber-stamp, too few
and the first bad action is unrecoverable.

## Method

1. **Place checkpoints by reversibility and consequence.** Before money
   moves, before anything reaches a customer, before data is deleted,
   before a commitment binds (see agent-delegation-protocol).
2. **Give the human what they need to decide, not everything.** What is
   proposed, why, what it affects, and what happens if it is wrong. A
   full transcript is not a decision aid.
3. **Make approval an explicit act.** Timeouts that auto-approve are
   not checkpoints; if the work must proceed unattended, it was not
   checkpoint-worthy.
4. **Make rejection productive.** A rejection should carry a reason the
   agent can act on, so the next attempt is better rather than identical.
5. **Batch related approvals.** Twenty separate prompts get
   rubber-stamped; one grouped decision with the exceptions highlighted
   gets read.
6. **Keep the audit trail.** What was proposed, who approved, when, and
   what happened, because this is the record that matters when something
   goes wrong (see audit-logging).
7. **Review checkpoint value periodically.** One always approved without
   change is either unnecessary or not being read, and both are worth
   knowing.

## Boundaries

A checkpoint transfers the decision, and with it the responsibility, to
a person who must actually have the context to exercise it. Approval
fatigue is real and makes checkpoints worse than useless. Some actions
should not be proposed by an agent at all, however good the checkpoint
(see agent-orchestration-antipatterns).
