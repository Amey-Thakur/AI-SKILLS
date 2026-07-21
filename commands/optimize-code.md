---
description: "Make code faster or lighter by finding the real bottleneck first, with measured, behavior-preserving changes."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Optimize this code. Preserve behavior exactly.

{code}

Goal: {goal}

Approach:
1. State what the code does, so the behavior that must not change is clear.
2. Identify the actual bottleneck by reasoning about complexity and cost: the
   algorithm (an O(n^2) scan beaten by a set/map lookup is the biggest win),
   then unnecessary work (repeated computation, work in a loop that belongs
   outside), then allocation and I/O. Do not micro-optimize before naming the
   real cost.
3. Show the optimized code, idiomatic and readable. State the expected
   improvement and why (from N^2 to N, one query instead of N).
4. Note anything that could change behavior (edge cases, ordering, precision)
   so it can be verified, and what to measure to confirm the win.

Rules: correctness first, then the algorithm, then constants. Prefer the
change that keeps the code clear over the clever one that obscures it. If it
is I/O-bound, say so: the fix is overlapping the waiting, not tightening the
loop. If the code is already appropriate for its scale, say so.
