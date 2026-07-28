---
name: agent-context-setup
description: Give a coding agent the right files and background at the start of a task, so it works from the real system rather than from assumption. Use when starting a non-trivial task with an agent.
---

# Agent context setup

An agent's output quality is bounded by what it knows about your
codebase. Most disappointing results come from an agent guessing at
conventions and interfaces it was never shown.

## Method

1. **Point at the relevant files explicitly.** Naming the modules
   involved beats hoping the agent searches well, and it saves several
   exploratory turns.
2. **Include one example of the pattern to follow.** An existing
   similar implementation communicates conventions faster than any
   description (see few-shot-examples).
3. **State the constraint that is not visible in code.** Performance
   requirements, compatibility commitments, and decisions already made
   and rejected.
4. **Give the failure, not the diagnosis, when debugging.** The actual
   error, stack trace, and reproduction, rather than your theory, which
   anchors the agent on your assumption (see debugging).
5. **Keep context focused.** Loading the whole repository degrades
   attention on what matters (see context-compression).
6. **Let the agent explore for discovery tasks.** When the question is
   how something works, searching is the task rather than overhead.
7. **Restate the goal when the session drifts long.** Long sessions lose
   the original objective, and a mid-course restatement is cheap (see
   staying-on-task).

## Boundaries

Context improves output and cannot supply capability the model lacks.
Very large contexts degrade rather than improve results.
Repository-wide instructions belong in an instruction file rather than
being repeated per task (see agent-instruction-files).
