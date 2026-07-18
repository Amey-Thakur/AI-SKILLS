---
name: property-based-testing
description: Generate many inputs to test invariants that must hold across a whole domain, and let shrinking reduce failures to a minimal case. Use when a rule should hold for all inputs, not just the few examples you would think to write.
---

# Property-based testing

Example tests check the cases you thought of. Property-based testing checks
the ones you did not: a framework generates hundreds of inputs and asserts a
property that must hold for every one. It is how you surface the empty string,
the max integer, the surrogate-pair character, and the leap second that break
code passing all your hand-picked examples. The work is stating properties
worth checking and writing generators that reach the interesting inputs.

## Method

1. **Assert invariants, not specific outputs.** Strong properties are
   relations true for all inputs: `decode(encode(x)) == x` for a round trip,
   `sort(xs)` is ordered and a permutation of `xs`, output never exceeds a
   bound. You rarely predict the exact result, you constrain it.
2. **Reach for known property shapes.** Round trip, invariant preservation,
   a comparison against a slow but obvious oracle, and idempotence
   (`f(f(x)) == f(x)`) cover most cases. Pick the shape before you write the
   generator.
3. **Write generators that hit the corners.** Use Hypothesis, fast-check, or
   QuickCheck to build inputs, and bias them toward zero, empty, negatives,
   Unicode, and boundary sizes. A generator that only makes tidy medium
   values tests nothing your examples missed.
4. **Trust shrinking, then read the minimal case.** On failure the framework
   reduces the input to the smallest that still fails, `""` or `[0, 0]`
   rather than a 300-element mess. That minimal case usually names the bug
   outright, so read it before touching the code.
5. **Pin every failure as a regression example.** The framework records the
   failing seed, but also add the shrunk input as an explicit example test so
   the exact case stays covered after you fix it and the generator moves on.
6. **Constrain to the valid domain, not past it.** Filter or construct inputs
   to the precondition with `assume(n > 0)` or a positive-int generator.
   Over-wide generators either drown in discards or test behavior the
   function never promised.

## Checks

- Does the property still read as one sentence about all inputs, or is it
  secretly a single example?
- When it fails, does the shrunk case point at the real bug rather than
  incidental noise?
- Do the generators actually produce empty, boundary, and out-of-order
  inputs, confirmed by inspecting a sample?

## Boundaries

Properties complement example tests, they do not replace them: keep readable
example tests for the documented behaviors and add properties where a rule
spans the domain. To grade how strong the resulting tests are, defer to
mutation-testing. Generator libraries differ, so follow the project's.
