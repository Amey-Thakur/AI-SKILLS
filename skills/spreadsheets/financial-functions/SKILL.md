---
name: financial-functions
description: Use present value, rate, and payment functions correctly, with consistent periods and sign conventions. Use when modelling loans, investments, or discounted cash flows.
---

# Financial functions

Financial functions are correct and unforgiving: a mismatch between the
rate period and the payment period, or an inconsistent sign convention,
produces a plausible number that is wrong by a wide margin.

## Method

1. **Match rate and period exactly.** A monthly payment schedule needs a
   monthly rate, and using an annual rate with monthly periods is the
   most common error.
2. **Follow the sign convention consistently.** Money out is negative
   and money in is positive, and mixing them produces results that look
   reasonable and are not.
3. **Discount cash flows at a rate you can justify.** Present value is
   only as meaningful as the discount rate, and small changes move the
   answer substantially (see capital-allocation).
4. **Be explicit about timing.** Payments at the start or end of a
   period change the result, and the parameter is easy to overlook.
5. **Lay out cash flows visibly.** A schedule of periods and amounts is
   auditable; a single function call over a hidden range is not (see
   spreadsheet-modeling).
6. **Sanity-check against a simple case.** Verifying the function
   reproduces a hand-calculated simple example catches most parameter
   mistakes.
7. **Test the sensitivity.** Vary the rate and the term to see how much
   the conclusion depends on assumptions (see cost-structure-analysis).

## Boundaries

These functions compute mechanics and not judgement: the inputs encode
assumptions that determine the answer. Tax, accounting treatment, and
regulatory rules are outside their scope and need qualified advice.
Nothing here is financial advice (see financial-statements-literacy).
