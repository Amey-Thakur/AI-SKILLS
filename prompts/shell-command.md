---
name: shell-command
description: Get the right terminal command for a task, explained, with the dangerous parts flagged before you run it.
variables:
  - "{task}: what you want to do in the terminal"
  - "{environment}: OS and shell (macOS/zsh, Linux/bash, Windows/PowerShell), and any tools available"
settings: "Temperature 0.2 for correctness."
---

Give me the terminal command(s) for: {task}

Environment: {environment}

Provide:
1. The command, in a code block, ready to run (quoted paths, correct flags for
   the stated OS and shell: GNU and BSD tools differ, so match the
   environment).
2. A one-line-per-part explanation of what each piece does, so I understand it
   before running it and can adapt it.
3. Safety flag: if the command is destructive or irreversible (deletes,
   overwrites, force-pushes, changes permissions, affects many files), say so
   clearly, show how to preview or dry-run it first, and how to scope it
   narrowly.

Rules: prefer a clear, correct command over a clever one-liner. If the task is
better done with a short script than a command, say so and provide it. If
there is a safer or more standard tool for the job, mention it. Never suggest
piping a remote script straight into a shell without noting the risk.
