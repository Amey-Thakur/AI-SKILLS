---
name: agent-arch-board
description: Run an architecture board of agents where one proposes a design, several review it independently and blind, and a chair synthesizes a binding decision. Use when a design choice matters enough that one agent's opinion will not do and you want independent scrutiny before committing.
---

# Agent architecture board

An agent that proposes and blesses its own design produces confident nonsense
with nothing to check it. A board separates the roles: a proposer argues for a
design, several reviewers judge it blind to each other, and a chair reconciles
the verdicts into one binding decision. The value lives in the independence, so
reviewers who can read each other's scores converge and stop thinking.

## Method

1. **Proposer writes the design.** Load `principal-architect-role`. Output
   `rfc.md` in the shape the `rfc-process` skill defines: context, at least two
   options weighed, the recommendation, and the trade-offs it accepts. A proposal
   with one option is advocacy, not design.
2. **Fan out to blind reviewers.** Spawn reviewers in parallel, each in an
   isolated context that cannot see the others. Give each a lens: load
   `cloud-architect-role` for cost and scale, `security-engineer-role` for threat
   surface, `site-reliability-engineer` for operability. Blindness is enforced,
   not requested.
3. **Each reviewer scores against a rubric.** Output `review-<lens>.md`: a
   verdict of approve, approve-with-conditions, or reject, with rationale tied to
   named RFC sections. A reject must state what would turn it into an approve.
4. **Chair synthesizes a binding decision.** Load `staff-engineer`. Read every
   review together, reconcile the conflicts, and issue `decision.md` as an
   architecture decision record: the call, the conditions attached, and which
   review points drove it. The chair may overrule a reviewer but must say why in
   writing.
5. **Split verdicts escalate, they do not average.** When reviewers land on
   opposite sides of a point neither will concede, the chair sends it to a human
   architect rather than splitting the difference. Averaging two incompatible
   designs yields one that serves neither.
6. **Conditions are tracked to closure.** Every approve-with-conditions item
   becomes a checklist the proposer clears before the design ratifies. An open
   condition keeps the decision provisional.

## Run it

In Claude Code, run the proposer as one subagent, then spawn the reviewer
subagents in a single parallel batch so none sees another's output, then run the
chair over the collected reviews. Keep `rfc.md`, the review files, and
`decision.md` as artifacts on a design branch, mirroring an
`architecture-review-board`. Terminate when the chair issues a decision with
every condition listed, or when a split escalates to a human. To port, use
LangGraph with a fan-out-to-reviewers node and a synthesis node, a CrewAI judge
panel with parallel review tasks feeding a chair task, or AutoGen reviewers
messaging a moderator that withholds cross-talk until submissions close.

## Signals it works

- Reviewers submit before seeing each other, so no review anchors on another.
- Every reject names the change that would flip it to approve.
- The chair's decision cites specific review points, not a vote tally.

## Boundaries

This board decides technical direction, not budget or staffing, and it defers a
genuinely novel bet to the human owners who carry the risk. It assumes the
proposer produced a real RFC; garbage in still yields a confident decision out.
Ratifying anything irreversible waits on a human sign-off.
