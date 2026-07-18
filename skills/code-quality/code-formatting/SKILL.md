---
name: code-formatting
description: Hand formatting to an opinionated tool run automatically so the team stops arguing style and diffs stay readable. Use when adopting a formatter, onboarding a repo, or cleaning up noisy review diffs.
---

# Code formatting

Formatting debates are the cheapest possible way to spend a team's
attention: everyone has a preference, none of them affect behavior, and the
argument recurs on every pull request. The escape is to hand the whole
question to a tool with almost no options, run it automatically, and never
discuss brace placement again.

## Method

1. **Pick one opinionated formatter and take its defaults.** Prettier for
   JS/TS, Black for Python, gofmt for Go, rustfmt for Rust, spotless or
   ktlint for Kotlin/Java. The point is to remove choices, so do not spend
   the meeting tuning line width past the default (Black 88, Prettier 80).
2. **Format the whole repo in one commit.** Run the formatter across every
   file, commit it alone with a message like "Apply Black", and add that
   SHA to `.git-blame-ignore-revs` so `git blame` skips the reformat and
   still points at the real author of each line.
3. **Enforce in CI, not by asking.** Add `black --check`, `prettier
   --check`, or `gofmt -l` as a pipeline step that fails on any unformatted
   file. A check that lives only in a reviewer's head gets skipped the week
   they are busy.
4. **Format on save and on commit.** Wire the formatter into editor "format
   on save" and a pre-commit hook (pre-commit, or husky with lint-staged)
   so files are correct before they are ever pushed. CI becomes the
   backstop, not the first line of defense.
5. **Keep formatting out of feature diffs.** Never let a reformat ride
   along in a behavior change: the reviewer cannot find the two lines that
   matter under two hundred that only moved. Reformat in its own PR, then
   build on the clean base.
6. **Pin the formatter version.** Lock the exact version in the lockfile or
   tool config so two developers on different releases do not fight over a
   rule that changed between them. Upgrade deliberately, in its own commit.

## Litmus tests

- Does a fresh clone plus one command format identically on every machine?
- Can a reviewer read any diff with no formatting-only lines in the way?
- Does `git blame` on a reformatted line show the author, not the reformat
  commit?

## Boundaries

Formatters own whitespace and layout, not naming, structure, or clarity:
those belong to review and to linting. Where a language has no dominant
formatter, a documented editorconfig plus a lint rule set is the fallback,
and consistency within the repo outranks which style would have won an
argument.
