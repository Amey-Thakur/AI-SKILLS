---
name: boy-scout-rule
description: Leave every file you touch marginally cleaner without expanding the change beyond its purpose. Use when editing code for one task and you notice small decay worth fixing in passing.
---

# Boy Scout rule

The rule borrows a camping maxim: leave the campground cleaner than you found
it. Applied to code, each commit improves the lines it already touches. The
failure mode is not neglect but its mirror: a one-line fix swells into a
refactor no reviewer signed up for, and the original change drowns.

## Method

1. **Scope cleanup to the diff you already own.** Improve only lines the
   primary change forces you to read or edit. A function three screens away
   may be ugly, but if you did not touch it, leave it and note it elsewhere.
2. **Cap the tax at a few minutes.** Rename one unclear variable, extract one
   magic number to a named constant, delete one dead branch. The moment the
   cleanup wants its own tests, stop and split it into a separate change.
3. **Separate cleanup commits from behavior commits.** Commit the rename or
   the reflow on its own, then the bug fix on top. A reviewer skims the
   mechanical diff and reads the real one closely, instead of untangling both.
4. **Prefer reversible, low-risk edits.** Formatting, naming, extracting a
   constant, tightening a type: yes. Reordering call sequences, changing error
   handling, swapping a data structure: no, those are changes in their own right.
5. **Format the touched file, not the repo.** Run `prettier --write path/to/file`
   or `ruff check --fix path/to/file`. A repo-wide reformat buries your real
   change under thousands of unrelated lines and poisons the blame history.
6. **File larger rot, do not chase it.** Open a tracking issue naming the file
   and line, or add a comment linking that issue number. The rule improves what
   you pass through; it does not license a detour into a rewrite.

## Litmus tests

- Can a reviewer state the commit's single purpose after reading the diff?
- Would reverting the cleanup while keeping the fix leave both still working?
- Did the touched-file count grow only because the real change reached there?
- Could you drop the cleanup entirely and still ship the fix on its own?

## Boundaries

On code you had no other reason to open, the rule does not apply: a dedicated
refactoring pass is a planned task with its own review, not an opportunistic
edit. Defer to team convention when a file is mid-migration or under a freeze.
