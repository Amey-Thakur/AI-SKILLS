---
name: agent-arch-board
description: Run an architecture board of agents where one proposes a design, several review it independently and blind, and a chair synthesizes a binding decision. Use when a design choice is consequential enough that one agent's opinion is not enough and you want independent scrutiny before committing.
---

# Agent architecture board

One agent proposing and blessing its own design produces confident nonsense with
no counterweight. A board separates the roles: a proposer argues for a design,
several reviewers judge it independently and blind to each other, and a chair
reconciles the verdicts into one binding decision. The value is the
independence: reviewers who can see each other's scores converge and stop
thinking.

## Method

1. **Proposer writes the design.** Load `principal-architect-role`. Output
   `rfc.md` in the shape the `rfc-process` skill defines: context, at least two
   options considered, the recommended option, and the trade-offs it accepts. A
   proposal with one option is advocacy, not design.
2. **Fan out to independent reviewers.** Spawn reviewers in parallel, each in an
   isolated context that cannot see the others' work. Assign each a lens: load
   `cloud-architect-role` for cost and scale, `security-engineer-role` for
   threat surface, `site-reliability-engineer` for operability. Blindness is
   enforced, not requested.
3. **Each reviewer scores against a rubric.** Output `review-<lens>.md`: a
   verdict of approve, approve-with-conditions, or reject, plus rationale tied to
   specific sections of the RFC. A reject must name what would change it to an
   approve.
4. **Chair synthesizes a binding decision.** Load `staff-engineer`. Read all
   reviews together, reconcile conflicts, and issue `decision.md` as an
   architecture decision record: the decision, the conditions attached, and
   which review points drove it. The chair may overrule a reviewer but must say
   why in writing.
5. **Split verdicts escalate, they do not average.** When reviewers land on
   opposite sides of a point neither will concede, the chair does not split the
   difference; the point goes to a human architect. Averaging two incompatible
   designs yields one that works for neither.
6. **Conditions are tracked to closure.** Every approve-with-conditions item
   becomes a checklist the proposer must satisfy before the design is ratified.
   An unmet condition keeps the decision provisional.

## Run it

In Claude Code, run the proposer as one subagent, then spawn the reviewer
subagents in a single parallel batch so none sees another's output, then run the
chair over the collected reviews. Keep `rfc.md`, the review files, and
`decision.md` as artifacts on a design branch, mirroring an
`architecture-review-board`. Terminate when the chair issues a decision with all
conditions listed, or when a split escalates to a human. To port, use LangGraph
with a fan-out-to-reviewers node and a synthesis node, a CrewAI judge panel with
parallel review tasks feeding a chair task, or AutoGen reviewers messaging a
moderator that withholds cross-talk until submissions close.

## Signals it works

- Reviewers submit before seeing each other, so no review anchors on another.
- Every reject states the change that would flip it to approve.
- The chair's decision cites specific review points, not a vote tally.

## Boundaries

This board decides technical direction, not budget or staffing, and it defers a
genuinely novel bet to the human owners who carry the risk. It assumes the
proposer produced a real RFC; garbage in still yields a confident decision out.
Ratification of anything irreversible waits on a human sign-off.
