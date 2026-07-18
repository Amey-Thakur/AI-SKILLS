---
name: rfc-process
description: Run a Request for Comments process so a proposal reaches the right audience, collects objections inside a bounded window, and records a decision people can point to later. Use when a change affects teams beyond the author's and needs durable buy-in.
---

# RFC process

An RFC moves a decision out of hallway conversations and into a written proposal
that anyone affected can read and challenge on the record. The process fails in
two opposite directions: a comment window so short that dissent never surfaces,
and one so open-ended that the proposal never converges and the author quietly
ships whatever they wanted from the start.

## Method

1. **Scope the audience before you write a line.** Decide who is affected, who
   must approve, and who is only informed. An RFC blasted to everyone is read by
   no one; an RFC that skips the team owning the code it touches gets vetoed
   after the author has already built it.
2. **State the decision in the first paragraph.** The proposal, the problem it
   solves, and what changes if it is accepted. A reader should know within a
   minute whether this touches them and whether they object.
3. **Put a real comment deadline in the document.** One to two weeks suits most
   cross-team RFCs. A named date turns "I'll get to it" into a commitment and
   tells the author the exact moment they are cleared to move.
4. **Make silence a stated rule, not a hope.** Declare up front what silence
   means, usually lazy consensus: no objection by the deadline counts as assent.
   Then ping the required approvers directly, so their quiet is a real choice and
   not an unread thread.
5. **Resolve every substantive comment in writing.** Reply inline with accepted,
   rejected and why, or deferred to a follow-up. A reviewer who raised a genuine
   concern should see what became of it without having to ask. Open threads block
   acceptance.
6. **Record the outcome where the next person will look.** Mark the RFC accepted,
   rejected, or superseded, date it, and link it from the code or the team index.
   A decision no one can find gets remade in six months by someone who never knew
   it happened.

## Signals

- Can a newcomer learn why this was decided this way, and who agreed, from the
  document alone?
- Did every required approver actively respond, or did the deadline pass on a
  thread nobody opened?
- Is the comment window an actual date in the doc, not an implied "soon"?

## Boundaries

Reversible, low-blast-radius calls do not need an RFC: match the weight of the
process to the cost of being wrong. This skill covers running the process; for
the depth of one technical proposal defer to the design-doc-google-style skill,
and follow your organization's RFC template where one already exists.
