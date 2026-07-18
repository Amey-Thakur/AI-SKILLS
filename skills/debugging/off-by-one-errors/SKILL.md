---
name: off-by-one-errors
description: Catch fencepost bugs by writing down the boundary convention and testing the endpoints instead of the middle. Use when a loop, slice, index, or range is off by a single element, drops the last item, or reads one past the end.
---

# Off-by-one errors

The bug lives at the edge, never the center. A loop that processes the
middle correctly can still miss the first element, double the last, or read
one slot past the array. These errors survive because tests exercise the
happy middle and skip the endpoints where the mistake actually is. Pin the
convention on paper, then attack the boundaries.

## Method

1. **Name the interval convention out loud.** Almost every language slice is
   half-open: `[start, end)`, start included, end excluded. `range(0, n)`
   yields `0..n-1`; `a[2:5]` gives indices 2, 3, 4. Write which end is
   inclusive before you reason about the count. Mixing a half-open slice
   with an inclusive comparison is the classic source.
2. **Compute length as end minus start, and check it.** For `[start, end)`
   the count is `end - start`, no plus-one. For a fully inclusive range
   `[lo, hi]` the count is `hi - lo + 1`. If your length formula needs a
   `+1` next to a half-open slice, one of them is wrong.
3. **Build a three-row boundary table.** For the smallest real input, write
   the first iteration, the last iteration, and the one that should not run.
   A loop over five items: does index 0 run, does index 4 run, does index 5
   stay out? Filling this table by hand finds the fencepost before the CPU
   does.
4. **Prefer iteration that hides the index.** `for x in items`, `for (const
   x of items)`, or `items.forEach` cannot be off by one because there is no
   bound to miscount. Reach for a raw `for (i = 0; i < n; i++)` only when you
   truly need the index, and then guard `<` versus `<=` deliberately.
5. **Test the empty, single, and full-boundary cases.** Length 0 (loop body
   must not run), length 1 (first and last are the same element), and the
   exact capacity of a buffer. `n`, `n-1`, and `n+1` around any limit are
   where the defect hides, so assert on those, not on `n/2`.
6. **Watch the known fencepost hotspots.** Inclusive `BETWEEN` in SQL,
   `substring` end arguments, circular-buffer wraparound with `% size`,
   pagination offsets (`page * size` versus `(page-1) * size`), and binary
   search `lo <= hi` versus `lo < hi`. Each has a canonical off-by-one.

## Checks

- Does the count formula match the interval convention with no stray `+1`?
- Do length 0 and length 1 both behave, not just the medium case?
- Does the last element get processed exactly once, never zero or twice?

## Boundaries

Follow the language's native convention rather than imposing your own:
Python and C are zero-based half-open, but some SQL, Lua, and business rules
are one-based and inclusive. The skill is making the convention explicit,
not standardizing it across a codebase that has reasons to differ.
