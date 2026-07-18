---
name: agent-code-review-loop
description: Run an author agent and a reviewer agent in a loop with a strict finding format, a verification pass, and a convergence rule that ends it. Use when you want agent-to-agent code review that improves the diff instead of spinning forever on style or re-flagging fixed issues.
---

# Agent code review loop

Two agents reviewing code without rules produce an endless argument: the
reviewer invents nitpicks to look thorough, the author rewrites working code to
appease it, and neither knows when to stop. A disciplined loop fixes this with
three constraints: a finding must survive a verification pass, the author must
resolve each one on the record, and a convergence rule declares the loop over.

## Method

1. **Reviewer reads intent before judging a line.** Load `code-review`. State
   the change's purpose back in one sentence first, so a deliberate behavior is
   not reported as a bug and the author does not waste a round defending it.
2. **Fix the finding format.** Every finding is `file:line, severity, one-line
   defect, failing scenario, suggested fix`. Severity is blocker, major, minor,
   or nit. A finding without a location and a scenario is a question, and it is
   filed as one.
3. **Require a verification pass.** Before reporting, the reviewer constructs
   the concrete input or state that triggers the defect and the wrong result
   that follows. If it cannot build that scenario, the finding is dropped. This
   is the single rule that kills invented nitpicks.
4. **Author resolves each finding explicitly.** For every item: fixed with the
   commit, or rebutted with a reason. No silent drops. The resolution log is the
   artifact the next round reads, so nothing gets lost between passes.
5. **Enforce the convergence rule.** The loop ends when zero blockers and majors
   remain open and the latest pass surfaced no new ones. Cap at three rounds;
   past that, escalate the disagreement to a human rather than iterate on taste.
6. **Forbid reopening without new evidence.** A reviewer cannot re-raise a
   resolved finding unless it names a new failing scenario. This stops the loop
   from thrashing on the same line across rounds.

## Run it

In Claude Code, run the author as one subagent and the reviewer as another,
passing the diff and the findings list as files between them so each round reads
the prior resolution log, not the whole chat. The orchestrator counts rounds and
holds the convergence rule: it stops the loop on a clean pass or on the round
cap. Keep severities honest so a nit never blocks a merge and a blocker never
slips through. To port, model the loop as a CrewAI hierarchical process with a
review task, an AutoGen two-agent chat with a termination condition, or a
LangGraph cycle whose conditional edge exits when open blockers reach zero.

## Signals it works

- Every reported finding carries a concrete failing scenario, no bare opinions.
- The loop terminates on the convergence rule, not on an agent giving up.
- No resolved finding reappears in a later round without fresh evidence.

## Boundaries

This is line-level iteration between two agents on a diff; for multi-lens review
of a design use `agent-design-review-panel`, and for the ship gate use
`agent-qa-gate`. The loop improves the change in front of it and does not judge
whether the change should exist, that call belongs to the author's charter and
the humans above it.
