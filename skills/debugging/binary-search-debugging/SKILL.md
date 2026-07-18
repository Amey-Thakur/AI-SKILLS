---
name: binary-search-debugging
description: Halve the search space repeatedly across code, data, time, and configuration until a single change isolates the failure. Use when the fault could live anywhere across a large surface and reading it all in order is too slow.
---

# Binary search debugging

When a failure could start in any of a thousand lines, inputs, or flags,
reading them in sequence is the slowest route there is. Bisection converts a
thousand suspects into about ten questions: a probe at the midpoint either
clears half the space or condemns it. The craft is choosing a clean midpoint in
whichever dimension the bug is hiding.

## Method

1. **Establish two anchor points before splitting.** Find one state where the
   bug is present and one where it is absent. Without both ends you have nothing
   to bisect, only a hunch to chase.
2. **Bisect the code path.** Drop a probe halfway down the call chain that
   asserts a known-good invariant. Holds there means the fault is downstream;
   broken means upstream. Move the probe into the surviving half and repeat.
3. **Bisect the data.** Feed the first half of the failing input, then the
   second, keeping the half that still fails. A 10,000-row file that crashes
   narrows to the offending row in about 14 splits.
4. **Bisect configuration and feature flags.** Toggle half the flags, plugins,
   or env overrides at once. When the outcome flips, the trigger sits in the set
   you just changed. Binary elimination beats flipping switches one at a time.
5. **Bisect uncommitted time by comment-out.** For "it worked an hour ago" with
   no clean commit to blame, disable half the changed region and rerun. This
   finds the guilty block even inside a single unstaged edit.
6. **Change exactly one variable per step.** Split data and code in the same
   run and a flipped result names neither cause. One cut, one rerun, one
   conclusion, written down before the next split.
7. **Stop at a one-line delta.** Keep halving until the gap between pass and
   fail is a single line, row, or flag. That delta is either the bug or a
   finger pointing straight at it.

## Signals

- Does each probe roughly halve the remaining suspects, not trim a handful?
- Are both anchor points still reproducible, or did one quietly drift?
- When a split flipped the outcome, was exactly one thing different?

## Boundaries

Bisecting version history is mechanical enough to automate: hand that to
git-bisect. When the space is already small or a stack trace names the line,
read it directly instead of halving out of habit.
