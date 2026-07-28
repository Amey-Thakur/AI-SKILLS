---
name: floating-point-behavior
description: Reason about rounding, precision limits, and comparison in floating point so numerical results are predictable. Use when money, physics, aggregation, or any comparison of computed values is involved.
---

# Floating point behaviour

Floating point represents most decimal values approximately, which makes
familiar arithmetic laws fail: addition is not associative, equality is
unreliable, and errors accumulate. None of this is a bug, and all of it
surprises people.

## Method

1. **Never use floating point for money.** Use integer minor units or a
   decimal type, because a fraction of a cent per transaction becomes a
   reconciliation problem (see currency-localization).
2. **Never compare with equality.** Compare within a tolerance
   appropriate to the magnitude of the values, since two mathematically
   equal computations can differ in the last bits.
3. **Understand that order changes the result.** Summing a large list
   gives different answers in different orders, which matters for
   reproducibility and for parallel reduction.
4. **Sum small values before large ones.** Adding small numbers to a
   large accumulator loses them entirely, and compensated summation
   avoids it where accuracy matters.
5. **Watch subtraction of near-equal values.** Cancellation destroys
   significant digits and is the main source of catastrophic error in
   numerical code.
6. **Know the special values.** Infinity and not-a-number propagate
   silently through calculations and compare unusually, so they need
   explicit checks.
7. **Choose precision deliberately.** Single precision is faster and
   smaller and runs out of significant digits sooner than people expect
   (see gpu-precision-modes).

## Boundaries

These are properties of the representation rather than defects, and they
apply in every language. Decimal types solve the money problem and are
slower. Numerical stability for scientific computing is a specialist
discipline beyond these basics.
