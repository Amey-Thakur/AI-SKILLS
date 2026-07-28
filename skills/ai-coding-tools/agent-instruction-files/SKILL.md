---
name: agent-instruction-files
description: Write the repository instruction file that coding agents read, so they follow project conventions without being told each session. Use when setting up a repository for Claude Code, Antigravity, Cursor, or any agent reading AGENTS.md.
---

# Agent instruction files

Coding agents read a repository instruction file at the start of every
session. It is the highest-leverage document in the repository, because
it shapes every subsequent action, and most are either empty or a wall
of text the agent cannot act on.

## Method

1. **Write instructions, not documentation.** What to do and what to
   avoid, since prose explaining the architecture is less useful to an
   agent than a rule it can follow.
2. **Cover the conventions an agent cannot infer.** Commit format,
   testing commands, directory meaning, and the quality gates that must
   pass before a change is done.
3. **State the commands exactly.** The precise build, test, and lint
   invocations, because an agent guessing them wastes turns and
   sometimes runs the wrong thing.
4. **Name what must never happen.** Files not to edit, commands not to
   run, and actions requiring human approval (see
   agent-delegation-protocol).
5. **Keep it short enough to be read carefully.** It consumes context
   every session, and a long file dilutes the rules that matter (see
   prompt-structure).
6. **Use the filename each tool expects.** AGENTS.md is widely read,
   with tool-specific files layering on top, and one canonical file
   imported by the others avoids drift.
7. **Update it when an agent gets something wrong.** Every correction
   you repeat twice belongs in the file rather than in the conversation.

## Boundaries

Instruction files guide behaviour probabilistically and are not
enforcement; anything critical needs a check in CI (see policy-as-code).
They are read at session start, so mid-session changes may not apply.
Different tools support different formats and import mechanisms.
