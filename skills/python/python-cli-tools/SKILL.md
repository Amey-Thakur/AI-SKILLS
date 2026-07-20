---
name: python-cli-tools
description: Build Python command-line tools with correct exit codes, stream discipline, and a distributable entry point. Use when writing or packaging a CLI in Python.
---

# Python CLI tools

A good CLI is a function with a stable contract: arguments in, exit code
out, data on stdout, diagnostics on stderr.

## Method

1. **Pick the framework by size.** `argparse` for stdlib-only tools and
   scripts; `typer` when you want subcommands, type-hint parsing, and help
   generation with minimal code; `click` when you need its ecosystem
   (plugins, complex composition). Do not hand-parse `sys.argv`.
2. **Separate parsing from logic.** `main(argv=None)` parses and calls a
   pure function that takes plain values and returns data or raises. This
   makes the CLI testable without subprocess calls:
   `assert run(["--json"]) == 0`.
3. **Respect the streams.** Results to stdout, progress and errors to
   stderr, so pipes work: `tool | jq` must never choke on a log line. Offer
   `--json` for machine consumers and keep the human format for terminals
   (`sys.stdout.isatty()` decides the default).
4. **Exit codes are the API.** 0 success, 1 generic failure, 2 usage error
   (argparse's default). Catch expected failures at the top, print one
   clear line to stderr, `sys.exit(code)`. Let genuine bugs traceback;
   swallowing them hides your own defects.
5. **Handle interruption cleanly.** Ctrl-C should not print a traceback:
   catch `KeyboardInterrupt` in main, exit 130. Wrap SIGPIPE-prone output
   (`head` closing the pipe) by catching `BrokenPipeError` and exiting 0.
6. **Package with an entry point.** In pyproject:
   `[project.scripts] tool = "pkg.cli:main"`. Users install with
   `uv tool install .` or pipx and get `tool` on PATH; no `python tool.py`
   instructions, no `if __name__` execution of package modules.
7. **Version and help are non-negotiable.** `--version` printed from
   package metadata (`importlib.metadata.version`), `-h` with one-line
   examples of the two most common invocations.

## Boundaries

- For interactive TUIs (menus, live panes) this contract does not apply;
  that is a different kind of program (textual, curses).
- Do not read config from cwd implicitly; take a `--config` path or use
  platformdirs locations, or two runs will differ for invisible reasons.
