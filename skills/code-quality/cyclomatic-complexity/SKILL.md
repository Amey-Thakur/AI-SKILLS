---
name: cyclomatic-complexity
description: Measure a function's branching complexity and reduce it so the logic stays testable. Use when a function has many paths, deep nesting, or a long if or switch chain.
---

# Cyclomatic complexity

Cyclomatic complexity counts the independent paths through a function: one plus
each branch point (`if`, `for`, `while`, `case`, and every `&&` or `||`). Paths
multiply the tests a function needs and the states a reader must hold at once,
and past roughly ten paths a function stops fitting in one head.

## Method

1. **Measure before you judge.** Run a real tool: `radon cc -s file.py`, the
   ESLint `complexity` rule, `gocyclo`, or SonarQube. Rank functions by score
   and start with the worst. A number ends the argument about whether a function
   merely "feels" complex.
2. **Set a threshold, treat crossings as a signal not a law.** Flag functions
   over 10 for a look and over 15 for a rewrite plan. The score is a smoke
   alarm: it says where to look, not that the code is wrong. Some parsers and
   state machines earn their number.
3. **Extract cohesive branches into named functions.** Each block pulled out
   drops the parent's count and gives the logic a name and a seam to test. A
   40-path function that becomes a 6-path coordinator calling five 8-path
   helpers is far more testable, even though the total branches barely move.
4. **Replace nesting with early returns.** Guard invalid and edge cases at the
   top and return, so the main path steps out from under the arrow of nested
   `if` blocks. Every level removed cuts the states a reader tracks through the
   rest of the function.
5. **Turn a long switch on a value into table dispatch.** Map keys to handlers:
   `handlers[event.type](event)`. A twelve-case switch scoring 12 becomes a
   lookup scoring 1, and adding a case is a map entry rather than a new branch.
6. **Collapse compound conditions into named predicates.** `if (a && b && !c)`
   hides several paths in one line. Extract `isEligible(...)` returning a
   boolean: the branches move into a small, separately testable function whose
   name states what it decides.

## Checks

- Does the tool's score actually drop after the change, not just relocate to a
  helper you forgot to re-measure?
- Can you still name every path the function takes, or did extraction only hide
  them behind a call?
- Is the deepest nesting two levels or fewer once the guards are in place?

## Boundaries

The score is one signal: a low number with terrible names is still unreadable,
and a slightly high number in a genuinely branchy state machine can be the
clearest form available. Do not extract single-use helpers with vague names just
to move a metric. Defer length questions to function-size and profiling to the
performance skills.
