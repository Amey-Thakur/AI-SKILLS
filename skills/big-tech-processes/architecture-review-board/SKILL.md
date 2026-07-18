---
name: architecture-review-board
description: Run an Architecture Review Board that filters proposals by blast radius, reviews them through fixed lenses, issues binding decisions recorded as ADRs, and honors an appeals path. Use when a technical choice crosses team boundaries and needs a durable, accountable decision instead of hallway consensus.
---

# Architecture review board

An ARB exists to make the expensive, hard-to-reverse decisions once, with the
right people present, and to write down why. Its failure modes are a matched
pair: too loose and it stamps whatever arrives, too heavy and it becomes a
tollbooth every team learns to route around. A board worth keeping reviews only
what matters, decides with real authority, and leaves a record the next
architect can trust.

## Method

1. **Set a submission bar keyed to blast radius.** Require review when a proposal
   adds a new datastore or language, crosses team boundaries, changes a shared
   contract, or opens a security or compliance surface. Apply the one-way-door
   test: reversible, two-way-door choices stay with the team. Everything else is
   noise the board should decline at intake.
2. **Demand a written proposal, not a calendar hold.** The submission is a design
   doc or ADR draft stating the problem, the options weighed, the recommendation,
   and the trade-off accepted. A board that reviews slides reviews charisma.
   Reject anything with a single option: one option is a decision already made,
   dressed as a question.
3. **Run a shepherd pre-review before spending the board.** One reviewer reads the
   proposal cold, confirms it clears the bar and answers the obvious questions,
   and either advances it or returns it. This keeps the full board out of triage
   and the author out of a public ambush over a missing section.
4. **Judge through fixed lenses so outcomes stay consistent.** Score every
   proposal on reversibility, build-versus-buy, operability and on-call cost,
   security and data handling, total cost of ownership, and fit with the stated
   tech strategy. Named lenses stop the decision from turning on whoever spoke
   loudest that afternoon.
5. **Issue a binding decision in one of four shapes.** Approve, approve with
   conditions, reject with reasons, or defer pending named information. "We have
   concerns" is not a decision. Record the outcome as a dated ADR with the
   deciders, the rationale, and the constraints, and link it from the
   repositories it governs.
6. **Publish an appeals path and honor it.** An author who disagrees escalates to
   a named authority, a principal engineer or a CTO-level review, inside a set
   window. A board with no appeal breeds quiet workarounds; a real appeal is what
   makes the board's authority legitimate rather than resented.
7. **Time-box the loop and measure your own latency.** Commit to a decision within
   a fixed number of working days of a complete submission, and track that
   turnaround like any other target. Nothing teaches teams to stop consulting the
   ARB faster than making the ARB the slowest step in the project.

## Checks

- Would a reversible, single-team choice be turned away at intake, or does the
  board review whatever lands on it?
- Does every decision exist as a dated ADR with rationale, not a verbal yes in
  someone's memory?
- Can an author who disagrees escalate through a named, bounded appeals path?
- Is the board's own decision latency measured, or is it quietly the slowest step
  in every project?

## Boundaries

The ARB decides architecture that crosses boundaries or resists reversal; it
does not review routine, team-local design, which belongs to normal code and
design review. It rules on the proposal, not on implementation quality or release
readiness. The depth of any one proposal is the design-doc skill's job, and where
your organization already runs an RFC or ADR convention, adopt its template
rather than standing up a parallel one.
