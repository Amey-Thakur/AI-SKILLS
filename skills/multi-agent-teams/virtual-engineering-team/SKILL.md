---
name: virtual-engineering-team
description: Run a product-engineering squad of agents from spec to shipped change with a PM, an architect, two engineers, a reviewer, and QA. Use when a task is too large for one agent and needs both division of labor and an independent quality gate.
---

# Virtual engineering team

Hand one agent "build the feature" and it carries the spec, the design, two
implementations, and its own review in a single context, then quietly drops
half of them. A squad splits that load so each agent owns a narrow charter and
passes a named artifact to the next. The shape is a sequential spine that fans
out to two parallel builders, converges through review, and ends at a QA gate.

## Team

- **PM** (`product-manager-role`): turns the request into a frozen, testable spec.
- **Architect** (`principal-architect-role`): produces the design and the file split.
- **Backend engineer** (`backend-engineer-role`): builds only the server files it owns.
- **Frontend engineer** (`frontend-engineer-role`): builds only the client files it owns.
- **Reviewer** (`code-review`): reads both diffs and files blocking findings.
- **QA** (`qa-engineer-role`): runs the merged branch against every criterion.

## Method

1. **PM freezes the spec.** Output `spec.md`: problem, user stories, and
   acceptance criteria in Given/When/Then. Nothing downstream begins until the
   criteria are testable, because a moving target defeats the gate at the end.
2. **Architect designs and splits.** Output `design.md`, typed interface stubs,
   and a task table assigning each engineer a disjoint file set. The split is
   the contract that keeps two builders from editing the same path.
3. **Engineers build in parallel against the stubs.** Each returns a git branch
   and a diff touching only its assigned files. The shared stubs are the seam,
   so neither engineer blocks on the other's internals.
4. **Reviewer reads both diffs in execution order.** Output a findings list:
   `file:line`, severity, failing scenario, fix. Route each blocker to the
   owning engineer, not to the whole squad.
5. **Loop review until it converges.** The engineer marks each finding fixed or
   rebutted with a reason. Cap at three rounds, then escalate a stuck point to a
   human rather than let agents argue taste.
6. **QA gates the merge.** QA maps every acceptance criterion to executed test
   evidence and returns go or no-go. Any unmapped criterion is a no-go.

## Run it

In Claude Code, give each role its own subagent through the Task tool and paste
the matching role skill into that subagent's prompt so it holds one charter.
The orchestrator walks the spine in order, spawns the two engineers in a single
parallel batch, then runs reviewer and QA. Pass artifacts as files on a shared
branch: `spec.md`, `design.md`, the diffs, the findings list. Stop when QA
returns go with all criteria green and no open blockers, or when the review loop
hits its cap and escalates. To port, model the spine as a CrewAI sequential Crew
with a parallel engineer task group, an AutoGen GroupChat, or a LangGraph graph
with a fan-out node and a QA node that conditionally routes back to the builders.

## Signals it works

- Each engineer's diff touches only the files the architect assigned it.
- QA's no-go always cites a specific acceptance criterion, never a vibe.
- The spec is frozen before code exists, so scope creep has nowhere to enter.

## Boundaries

This squad fits a bounded feature, not an open research problem where the spec
itself is the unknown. It defers the ship decision to a release owner and does
not replace human sign-off on anything irreversible. Size the team to the task:
a one-file fix needs an author and a reviewer, not six agents.
