---
name: coding-agent-workflow
description: Direct and supervise a coding agent (Claude Code, Cursor, Antigravity) so it ships correct, verified work. Use when delegating engineering tasks to an AI agent and you want reliable results, not plausible-looking ones.
---

# Coding agent workflow

A coding agent is fast and tireless but confidently wrong when
under-directed. Getting reliable work out of one is a skill: brief it
tightly, keep changes reviewable, insist on verification, and stay the
accountable engineer, not a spectator.

## Method

1. **Brief with a goal and a done-condition, not a vibe.** State exactly
   what you want, the constraints, and how to know it is complete
   (tests pass, the behavior works, the output matches). A vague task
   gets a vague, plausible result. Point the agent at the relevant files
   and conventions rather than letting it guess (see agent-complete-task
   for the prompt shape).
2. **Keep changes small and reviewable.** One task per run; a focused
   diff you can actually read beats a sprawling change that touches forty
   files. Large tasks get decomposed into steps you review between (see
   agent-task-breakdown, pull-request-size's logic applied to agents).
3. **Make it explore before it edits.** The agent should read the code
   and match its patterns, not impose a generic style. Instruct it to
   understand first; unfamiliar-codebase mistakes come from skipping this
   (see agent-explain-codebase).
4. **Demand verification, and check it.** Require the agent to run the
   tests, build, and linter, and to exercise the actual behavior, then
   report what it ran. Then verify yourself: agents claim success they
   have not demonstrated. "It should work" is not "it works" (see
   agentic-loops' verify-before-done rule, verify skill).
5. **Review the diff like any code review.** Read what changed and why,
   not just whether it runs. Watch for scope creep (unasked refactors),
   silent behavior changes, weakened tests, and confident comments over
   subtly wrong logic. You are accountable for merging it (see
   review-my-code, code-review).
6. **Gate the irreversible.** Destructive or outward-facing actions
   (deleting, force-pushing, deploying, sending) get your confirmation,
   not the agent's autonomy; keep it working on a branch, and keep the
   changes reversible (see llm-guardrails, automation-guardrails).

## Boundaries

- The agent accelerates the work; it does not transfer accountability.
  Merging unreviewed agent output because it looked confident is how bad
  changes ship.
- Agents excel at well-specified, verifiable tasks and struggle with
  ambiguous ones; the payoff tracks how well you can state the goal and
  check the result. Underspecified creative architecture is still yours.
- This is human-directs-agent supervision; multi-agent orchestration
  (agents coordinating agents) is a separate discipline with its own
  costs (see multi-agent-teams, multi-agent-workflow).
