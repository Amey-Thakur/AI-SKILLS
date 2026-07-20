---
name: bash-robustness
description: Write bash that fails loudly, quotes correctly, cleans up after itself, and passes shellcheck. Use when writing shell scripts that automation or other people will depend on.
---

# Bash robustness

Bash's defaults are optimized for interactive forgiveness, not script
correctness: errors continue, unset variables expand to nothing, and
words split themselves. A robust script overrides all three and proves
itself with shellcheck.

## Method

1. **Open with the strict preamble, knowing its limits.**
   `set -euo pipefail` (exit on error, unset-is-error, pipeline
   fails on any stage). Know the honest caveats: `-e` is disabled
   inside `if` conditions and `&&`/`||` chains, and command
   substitution in an assignment (`local x=$(cmd)`) masks failure:
   split declaration and assignment. Where a command may legitimately
   fail, say so: `cmd || true`.
2. **Quote every expansion, always.** `"$var"`, `"$(cmd)"`, `"$@"`
   for argument passthrough: unquoted expansions word-split and
   glob, which is the root of most "works until a space or `*` shows
   up" bugs. Filenames from the world get `--` guards
   (`rm -- "$file"`) and `find -print0 | xargs -0` for iteration.
3. **Clean up with trap, not hope.** Temp files via `mktemp`,
   removed in `trap 'rm -rf "$tmpdir"' EXIT`; the trap runs on
   error and Ctrl-C too, which is the point. Multi-resource scripts
   compose cleanup functions; a script that leaves debris on
   failure is a slow disk-full incident (see graceful-shutdown's
   ethic at script scale).
4. **Fail with context, log to stderr.** `die() { echo "error:
   $*" >&2; exit 1; }` and use it with specifics ("config $f not
   readable"); progress messages to stderr so stdout stays clean
   for data (the python-cli-tools stream contract, shell edition).
   Check preconditions early: required commands
   (`command -v jq >/dev/null || die ...`), required variables,
   expected file existence (see guard-clauses).
5. **Run shellcheck as a gate, not a suggestion.** In CI and
   pre-commit (see git-hooks-automation); fix or explicitly
   directive-suppress every finding with a reason. Shellcheck
   catches the quoting, `-e`, and subshell traps that reviews miss;
   a script that cannot pass it is not done. Format with shfmt for
   diff stability (see code-formatting).
6. **Know when to leave bash.** Past ~100 lines, needing real data
   structures, JSON manipulation beyond one `jq`, error handling
   with context, or unit tests: switch to Python (see
   python-cli-tools) or another real language. Bash excels at
   orchestrating processes and files; it punishes application
   logic (see shell-portability for the dialect question).

## Boundaries

- `set -e` is a tripwire, not error handling; money-path scripts
  (deploys, data mutation) check each critical step explicitly and
  report what succeeded before the failure (see script-idempotency
  for rerun safety).
- Parsing `ls`, HTML, or human-formatted output is fragile by
  construction; use the tool's machine format (`--json`, `-0`,
  `--porcelain`) or a real parser (see text-processing).
- Concurrency in bash (background jobs, `wait`, flock) is
  workable for simple fan-out but has no supervision story;
  parallel pipelines belong in an orchestrator or a language with
  one (see background-jobs).
