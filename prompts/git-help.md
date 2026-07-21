---
name: git-help
description: Get the right git commands for a task or to safely undo a mistake, explained, with the destructive parts flagged.
variables:
  - "{situation}: what you want to do, or the mess you are trying to get out of"
  - "{state}: relevant context (branch, whether changes are committed/pushed, git status output)"
settings: "Temperature 0.2 for correctness."
---

Help me with git: {situation}

Current state: {state}

Provide:
1. The command(s), in a code block, in the right order, for my actual state
   (committed vs not, pushed vs not: this changes the safe approach
   completely).
2. A plain explanation of what each command does and why, so I understand it
   before running it and learn for next time.
3. Safety flags: mark anything destructive or history-rewriting (`reset
   --hard`, `push --force`, `rebase`, `clean -fd`, `checkout --`): what it
   throws away and whether it is recoverable. For risky operations, show the
   safer alternative (`--force-with-lease` over `--force`, a backup branch
   before a rebase) and how to preview first.
4. If the change is already pushed and shared, warn about rewriting shared
   history and prefer a safe forward fix (`revert`) over a rewrite.

Rules: correctness and safety first (a wrong git command can lose work).
Prefer the recoverable approach; when I might lose commits, tell me how to find
them again (reflog). If my described state is ambiguous in a way that changes
the safe command, ask before giving a destructive one. Never suggest
`push --force` to a shared branch without a loud warning and the
`--force-with-lease` alternative.
