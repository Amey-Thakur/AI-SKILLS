---
name: cli-ux-design
description: Design command-line interfaces with predictable flags, honest exit codes, machine-readable modes, and helpful failure text. Use when building CLI tools people other than the author will run.
---

# CLI UX design

A CLI's users arrive mid-task, read nothing, and paste errors into
search bars. Design for that: guessable conventions, examples before
reference, and every failure message saying what to do next.

## Method

1. **Follow the conventions users already know.**
   `tool <noun> <verb>` (or verb-noun, but pick one) for
   multi-command tools; standard flags where they exist
   (`-h/--help`, `--version`, `-v` verbosity, `-o` output,
   `-f` force, `--dry-run`); long flags for scripts (readable in
   CI logs), short for interactive use. Arguments for the one
   required thing, flags for everything optional; more than two
   positional arguments and nobody remembers the order (see
   boolean-parameters instincts, CLI edition).
2. **Write help as examples first.** The top of `--help`: two or
   three copy-pasteable invocations of the most common tasks,
   then flag reference; `tool <cmd> --help` for depth. A man page
   or docs link for the rest. Users pattern-match examples; they
   do not parse usage grammars (see tutorial-writing's ethic in
   miniature).
3. **Separate the streams and the modes.** Results to stdout,
   progress/diagnostics to stderr (pipeable by construction;
   see python-cli-tools, bash-robustness); `--json` for machine
   consumers with a stable schema treated as an API (see
   api-change-management: scripts depend on it); detect TTY to
   choose human formatting (colors, tables, progress bars) vs
   plain output, with `NO_COLOR`/`--no-color` respected.
4. **Exit codes are the contract.** 0 success; 1 operational
   failure; 2 usage error; distinct codes for outcomes scripts
   branch on (diff-style "found differences" vs "error"),
   documented in help. Interrupts exit 130 cleanly with partial-
   state cleaned or reported (see graceful-shutdown at process
   scale).
5. **Make failure text actionable.** Error = what failed + the
   specific input + the next step: `config not found at
   ~/.tool/config.yml: run 'tool init' to create it`. Suggest
   near-miss corrections ("unknown command 'buidl', did you mean
   'build'?"). Never a bare stack trace for expected failures
   (see error-messages; traces are for bugs, behind `--debug`).
6. **Respect the environment and the guardrails.** Config
   precedence: flags > env vars (`TOOL_*`) > project config >
   user config, documented (see environment-config); secrets
   only via env/files, never flags (process lists leak; see
   secrets-management). Destructive operations: `--dry-run`
   support, explicit confirmation or `--yes` for automation
   (see automation-guardrails); long operations: progress to
   stderr and safe Ctrl-C. Keep startup fast (<100ms to first
   output or a spinner); a sluggish `--help` poisons the whole
   tool's feel (see startup-time).

## Boundaries

- Full-screen interactive TUIs (pickers, dashboards) are a
  different medium with different rules; a CLI may *offer* an
  interactive mode but every capability stays scriptable
  non-interactively (CI has no keyboard).
- Prompting for missing input is a convenience for TTYs only;
  when stdin is not a TTY, missing required input is an error,
  not a hang.
- Shell completion scripts are high-leverage polish once flags
  stabilize; generate them from the parser definition rather
  than hand-maintaining (see python-cli-tools frameworks).
