---
name: virtual-engineering-team
description: Run a squad of agents as a product-engineering team from spec to shipped change, with a PM, an architect, two engineers, a reviewer, and QA. Use when a task is large enough to need division of labor and a quality gate, not a single agent doing everything.
---

# Virtual engineering team

One agent asked to "build the feature" holds the spec, the design, two
implementations, and its own review in one context, and quietly drops half of
it. A squad splits the work so each agent owns a narrow charter and hands a
named artifact to the next. The shape is a sequential spine that fans out to
parallel builders, then converges through review into a QA gate.

## Method

1. **PM turns the request into a frozen spec.** Load `product-manager-role`.
   Output `spec.md`: problem, user stories, and acceptance criteria written
   Given/When/Then. Nothing downstream starts until the criteria are testable.
2. **Architect turns the spec into a design and a split.** Load
   `principal-architect-role`. Output `design.md` plus typed interface stubs
   and a task table that assigns each engineer a disjoint set of files. The
   split is the contract that lets two engineers run without colliding.
3. **Two engineers build in parallel against the stubs.** Load
   `backend-engineer-role` and `frontend-engineer-role`. Each returns a git
   branch and a diff touching only its assigned files. The typed stubs are the
   seam, so neither waits on the other's internals.
4. **Reviewer reads both diffs in execution order.** Load `code-review`.
   Output a findings list, `file:line`, severity, failing scenario, fix. Route
   blockers and majors back to the owning engineer, not to the whole team.
5. **Loop review until it converges.** An engineer marks each finding fixed or
   rebutted with a reason. Cap at three rounds, then escalate the deadlock to a
   human rather than let the agents thrash on taste.
6. **QA gates the merged result.** Load `qa-engineer-role`. QA runs the code
   against every acceptance criterion, maps each to test evidence, and returns
   a go or no-go. An unmapped criterion is a no-go.

## Run it

In Claude Code, give each role its own subagent via the Task tool, pasting the
named role skill into that subagent's prompt so it holds one charter. The
orchestrator (you, or a top-level agent) runs the spine in order, spawns the
two engineer subagents in a single parallel batch, then runs reviewer and QA.
Pass artifacts as files on a shared branch: `spec.md`, `design.md`, the diffs,
the findings list. Terminate when QA returns go with all criteria green and
zero open blockers, or when the review loop hits its cap and escalates. To port
this, model the spine as a CrewAI sequential Crew with a parallel task group for
the engineers, an AutoGen GroupChat, or a LangGraph graph with a fan-out node
and a QA node that conditionally routes back to the engineers.

## Signals it works

- Each engineer's diff touches only the files the architect assigned it.
- QA's no-go always names a specific acceptance criterion, never a vibe.
- The spec is frozen before code exists, so scope creep has nowhere to enter.

## Boundaries

This squad fits a bounded feature, not an open-ended research problem where the
spec itself is the unknown. It defers the ship decision to a release owner and
does not replace human sign-off on anything irreversible. Match team size to the
task: a one-file fix needs an author and a reviewer, not six agents.
