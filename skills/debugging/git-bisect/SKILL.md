---
name: git-bisect
description: Find the exact commit that introduced a regression by driving git bisect with an automated pass/fail script. Use when a behavior worked in an older build and you need the first bad commit out of hundreds, not a guess.
---

# git bisect

When a regression hides somewhere in three hundred commits, reading diffs is
hopeless and blaming the obvious file is usually wrong. `git bisect` runs a
binary search over history and, paired with a pass/fail command, checks out and
tests each midpoint for you. You supply one good commit, one bad commit, and a
script that exits 0 or non-zero.

## Method

1. **Confirm a known-good commit by hand.** Check out a tag or dated commit
   where the behavior worked and verify it yourself. A wrong "good" anchor
   sends the whole search into the wrong half and hands you a false culprit.
2. **Open the session.** Run `git bisect start`, then `git bisect bad` on the
   broken commit (often `HEAD`) and `git bisect good <sha>` on the confirmed
   one. Git checks out the midpoint and prints how many steps remain.
3. **Write a test that exits 0 for good and non-zero for bad.** A one-liner is
   ideal: `pytest tests/test_x.py::test_y -q` or a tiny shell script. Make it
   trip on this specific regression, not on unrelated breakage along the way.
4. **Automate the walk with `git bisect run`.** Pass the command:
   `git bisect run ./check.sh`. Git tests each midpoint unattended and names the
   first bad commit in about log2(N) steps, roughly nine for five hundred commits.
5. **Exit 125 for commits you cannot test.** If a midpoint fails to build for an
   unrelated reason, have the script `exit 125` so git skips it instead of
   scoring it good or bad and corrupting the result.
6. **Read the first-bad diff, not just its hash.** Git names the commit; you
   still owe the mechanism. A one-line change there is your lead, and sometimes
   it only exposed a latent fault planted much earlier.
7. **Close with `git bisect reset`.** Return to your branch and working state
   before you start the fix, or the next command runs against a detached HEAD
   and confuses everything downstream.

## Checks

- Did you verify the "good" commit by hand rather than assume it?
- Does the script isolate this regression and ignore noise from other failures?
- After the run, did `git bisect reset` restore your original branch?

## Boundaries

Bisect finds where behavior changed, not why it is wrong: a refactor can
surface a bug written long before it. For non-history spaces like data, config,
or a single uncommitted edit, use binary-search-debugging instead.
