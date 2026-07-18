---
name: linting-setup
description: Triage lint rules so bug-catchers are errors, style is left to the formatter, and every suppression carries a reason. Use when configuring a linter, taming warning noise, or setting a suppressions policy.
---

# Linting setup

A linter tuned to shout about every stylistic preference trains the team to
ignore it, and the one rule that would have caught a real bug scrolls past
in the noise. A useful lint config is triaged: bug-finding rules are
errors, style is left to the formatter, and every suppression is narrow and
justified.

## Method

1. **Split rules into bugs, style, and noise.** Set bug-finding rules to
   error (`no-unused-vars`, `no-floating-promises`,
   `react-hooks/exhaustive-deps`, `eqeqeq`, clang-tidy `bugprone-*`). Hand
   pure-style rules to the formatter and turn them off. Turn opinion-only
   rules off, not warn: warnings accumulate and get ignored.
2. **Start from a vetted base, then subtract.** Extend
   `eslint:recommended`, `@typescript-eslint/recommended`, ruff's default
   set, or golangci-lint's defaults, and disable the specific rules that
   fight your codebase rather than assembling a config from nothing. Record
   why each disable exists in a comment beside it.
3. **Make warnings fail or make them nothing.** Run with `--max-warnings 0`
   in CI so warning and error collapse into one bar: the build passes or it
   does not. A pipeline that tolerates 400 warnings is a pipeline with no
   linter.
4. **Suppress narrowly and with a reason.** A suppression names one rule on
   one line with a why: `// eslint-disable-next-line no-await-in-loop --
   sequential rate limit`. Ban file-wide `eslint-disable` and bare
   `# noqa`; those switch the linter off for everything, not the one case.
5. **Enable type-aware rules where they exist.** `@typescript-eslint` with
   type information, ruff's flake8-bugbear set, and clang-tidy's analysis
   catch defects a syntactic pass cannot: unhandled promises, mutable
   default arguments, use-after-move. They cost CI seconds and earn them.
6. **Ratchet on legacy code, do not boil the ocean.** Lint only changed
   files in CI (lint-staged or a diff filter) so new code meets the bar
   while the backlog shrinks with each touch. A one-shot fix of 5000
   findings gets reverted; a ratchet holds.

## Signals

- Does a lint error reliably mean a bug or a real risk, not a style
  opinion?
- Does every suppression in the tree name a rule and a reason?
- Is the CI warning budget zero, or is it quietly unbounded?

## Boundaries

Linting overlaps a real type checker but does not replace one: for deep
correctness lean on `tsc`, mypy, or the compiler. Formatting stays with the
formatter. When a rule and the team's actual practice disagree, decide once
and encode the decision in config, not in repeated review comments.
