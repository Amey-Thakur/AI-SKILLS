---
name: agent-design-review-panel
description: Convene several reviewer agents with fixed distinct lenses, correctness, security, cost, and simplicity, then synthesize their verdicts. Use when one review agent keeps missing whole classes of problems because it cannot hold every concern at once on a design or a plan.
---

# Agent design review panel

A single reviewer asked to check "everything" checks the thing it thought of
first and calls it done. Split the concern into lenses and give each its own
agent, and the security hole the correctness reviewer skimmed past gets caught
by the agent that only looks for security holes. The shape is a parallel judge
panel: reviewers run independently, then a moderator merges their verdicts.

## Method

1. **Assign one lens per reviewer, no overlap.** Correctness: does the design do
   what the spec says on every path. Security: load `security-engineer-role` and
   hunt injection, authz gaps, secret handling. Cost: compute, latency, and
   dollar spend at expected scale. Simplicity: load `principal-architect-role`
   and challenge every part that could be deleted.
2. **Give all reviewers the identical input packet.** The design doc, the spec
   it answers, and the constraints. Same input, different lens, so a
   disagreement reflects the lens and not a difference in what they read.
3. **Run them in isolation to avoid anchoring.** No reviewer sees another's
   findings before forming its own. Cross-talk collapses four independent
   opinions into one loud one, which is the failure the panel exists to prevent.
4. **Require a common finding format.** Each reviewer returns findings as
   `severity, location, concern, recommendation` plus a one-word lens verdict:
   approve, revise, or reject. A uniform shape lets the moderator merge without
   re-reading four different styles.
5. **Moderate: merge, dedupe, and rank by lens priority.** The moderator
   collapses duplicate findings and resolves conflicts by a stated order, a
   security reject outranks a cost revise. It never overrules a lens on that
   lens's own turf.
6. **Emit one panel verdict with the blocking lens named.** Approve only when no
   lens rejects. On revise, the author fixes and the panel re-runs, capped at
   two rounds before a human breaks the tie.

## Run it

In Claude Code, spawn one subagent per lens in a single parallel Task batch,
each prompt carrying its lens and the shared packet, and forbid them from
reading each other's output. A separate moderator subagent reads the four
finding lists and produces the synthesis. Store each review and the synthesis as
files so the author sees who blocked and why. Terminate on a clean approve
across all lenses, or on the revise cap with escalation. To port, this is a
CrewAI parallel task group feeding a synthesis task, an AutoGen GroupChat with a
summarizing manager, or a LangGraph fan-out to reviewer nodes joining at a
reducer node.

## Signals it works

- Findings cluster by lens, and no two reviewers report the same issue.
- The panel verdict names the exact lens that blocked, or approves cleanly.
- Reviewers reach different conclusions, proving they did not anchor on one voice.

## Boundaries

A panel reviews a design or plan, not a line-level diff: for author-reviewer
iteration on code use `agent-code-review-loop`. Four lenses is a default, not a
law, add a performance or accessibility lens when the artifact demands it. The
moderator arbitrates priority; it does not invent findings the reviewers missed.
