---
name: makefile-design
description: Write Makefiles with honest dependencies, phony discipline, and self-documenting help, and know when make is the wrong tool. Use when standardizing project task-running or fixing rebuild bugs.
---

# Makefile design

Make does two different jobs: incremental file builds (its native
genius) and a task-runner facade (`make test`, `make deploy`).
Design differently for each and label which one you are doing.

## Method

1. **State real dependencies for real files.** A rule's target and
   prerequisites must be actual paths:
   `dist/app.js: $(SRC) package.json`: then make's incremental
   rebuilds work honestly. Depending on nothing, or on directories
   (mtimes lie), or on files a recipe does not actually produce
   breaks the model: stamp files (`.build-stamp: deps && touch $@`)
   bridge tools that lack single outputs.
2. **Mark every non-file target .PHONY.** `test`, `lint`, `clean`,
   `deploy`: without `.PHONY`, a file named `test` silently
   disables your test target forever. Group the declaration next
   to each target; a task-runner Makefile is mostly phonies and
   that is fine: it is the standard entry-point convention teams
   actually share (see onboarding-docs).
3. **Write recipes that fail loudly and run anywhere.** Each recipe
   line is its own shell: chain with `&&` or use
   `.ONESHELL`; set `SHELL := bash` plus
   `.SHELLFLAGS := -eu -o pipefail -c` so failures stop the build
   (see bash-robustness). Assume nothing about the environment:
   pin tool invocations through variables
   (`PYTHON ?= python3`) so CI and developers override cleanly
   (see environment-config).
4. **Make help the default target.** A `help` target that greps
   `##` comments from targets
   (`test: ## Run the test suite`) and prints them; new
   contributors discover the interface with bare `make`. This
   costs six lines and replaces a README section that would rot
   (see readme-writing).
5. **Use variables and pattern rules before copy-paste.**
   `$(BINARIES): bin/%: cmd/%/main.go` compiles a family from one
   rule; `?=` for overridable defaults, `:=` for computed-once.
   But stop before make-programming: `foreach`/`eval`
   metaprogramming is write-only; if the build needs logic,
   generate the Makefile or move that part to a script the
   Makefile calls (see bash-robustness step 6).
6. **Choose make deliberately against the alternatives.** Make
   wins for: file-based incremental steps, ubiquity (preinstalled),
   language-agnostic glue as the front door
   (`make setup test build`) over per-ecosystem runners.
   It loses for: Windows-native teams (see
   powershell-essentials), complex DAGs with caching/remote
   execution (Bazel-class), and pure task-running where a
   `justfile` or package scripts already fit the team. Do not
   rebuild your language's build system inside make; wrap it
   (`build: ; npm run build`) so make stays the thin common
   interface (see deployment-pipelines for where these targets
   get called).

## Boundaries

- Parallelism (`make -j`) is only safe when dependencies are
  complete and recipes do not share hidden state (temp files,
  ports); an undeclared dependency that "works" serially corrupts
  parallel builds (see build reproducibility in
  artifact-versioning).
- Recursive make per subdirectory hides the dependency graph and
  defeats -j; prefer one top-level Makefile including fragments.
- Tabs-not-spaces and GNU-vs-BSD make differences are real;
  declare GNU make as the requirement if you use its functions
  (see shell-portability's declare-your-dialect rule).
