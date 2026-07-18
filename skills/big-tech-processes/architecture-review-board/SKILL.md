---
name: architecture-review-board
description: Run an Architecture Review Board that reviews significant technical proposals through consistent lenses, issues binding decisions recorded as ADRs, and offers an appeals path. Use when architectural choices cross team boundaries and need a durable, accountable decision rather than a hallway consensus.
---

# Architecture review board

An ARB exists to make the expensive, hard-to-reverse technical decisions once,
with the right people in the room, and to write down why. Its failure modes are
symmetric: too loose and it rubber-stamps whatever arrives, too heavy and it
becomes a tollbooth every team learns to route around. A useful board reviews
only what matters, decides with authority, and leaves a record the next
architect can trust.

## Method

1. **Set a submission bar that filters on blast radius.** Require ARB review
   when a proposal introduces a new datastore or language, crosses team
   boundaries, changes a shared contract, or opens a security or compliance
   surface. Borrow the one-way-door test: reversible, two-way-door choices stay
   with the team. Everything else is noise the board should decline.
2. **Demand a written proposal, not a meeting request.** The submission is a
   design doc or ADR draft stating the problem, the options considered, the
   recommendation, and the trade-off accepted. A board that reviews slides
   reviews charisma. Reject submissions that skip the alternatives: a proposal
   with one option is a decision already made.
3. **Have a shepherd pre-review before the board's time.** One reviewer reads
   the proposal cold, checks it meets the bar and answers the obvious
   questions, and either advances it or sends it back. This keeps the full
   board out of triage and the author out of a public ambush.
4. **Review through fixed lenses so decisions stay consistent.** Every proposal
   is judged on reversibility, build-versus-buy, operability and on-call cost,
   security and data handling, total cost, and fit with the stated tech
   strategy. Named lenses stop the outcome from turning on which reviewer spoke
   loudest that day.
5. **Issue a binding decision in one of four shapes.** Approve, approve with
   conditions, reject with reasons, or defer pending specific information. "We
   have concerns" is not a decision. Record it as an ADR with the date, the
   deciders, the rationale, and the constraints, and link it from the affected
   repositories.
6. **Publish an appeals path and mean it.** An author who disagrees can escalate
   to a named authority (a principal engineer, a CTO review) within a set
   window. A board with no appeal breeds workarounds; a clear appeal makes the
   board's authority legitimate rather than resented.
7. **Time-box the loop and measure your own latency.** Commit to a decision
   within a fixed number of days of a complete submission, and track that
   turnaround. The fastest way to make teams stop consulting the ARB is to make
   consulting it slow.

## Checks

- Would a reversible, single-team choice be turned away at the door, or does the
  board review everything that lands?
- Does every decision exist as a dated ADR with rationale, not just a verbal
  yes in someone's memory?
- Can an author who disagrees escalate through a named, bounded appeals path?
- Is the board's own decision latency measured, or is it quietly the slowest
  step in every project?

## Boundaries

The ARB decides architecture that crosses boundaries or is hard to reverse; it
does not review routine, team-local design, which belongs to normal code and
design review. It rules on the proposal, not on implementation quality or
release readiness. The depth of any single proposal is the design-doc skill's
job; where your organization already runs an RFC or ADR convention, adopt its
template rather than inventing a parallel one.
