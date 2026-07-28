---
name: marketing-attribution
description: Assign credit for conversions across touchpoints honestly, knowing what each model hides. Use when deciding where to spend and channels each claim the same conversions.
---

# Marketing attribution

Attribution is a modelling choice presented as a measurement. Every
model distributes credit differently, and the total across platforms
routinely exceeds actual conversions because each claims the same
customer.

## Method

1. **Know what your model assumes.** Last click credits the final
   touchpoint and ignores discovery; first click does the opposite.
   Neither is true, and both are useful for different questions.
2. **Distrust platform-reported conversions.** Each platform grades its
   own work with its own window and view-through rules, and summing
   them double counts.
3. **Use incrementality tests for the real answer.** Turning a channel
   off and measuring the difference is the only method that isolates
   causation (see ab-test-design, correlation-causation).
4. **Ask customers how they found you.** Self-reported attribution is
   noisy and captures dark channels such as word of mouth that no
   tracking sees.
5. **Match the window to the sales cycle.** A seven-day window on a
   three-month cycle attributes almost nothing correctly.
6. **Track the whole journey where consent allows.** First-party data is
   more reliable than platform pixels and increasingly the only durable
   option (see consent-management).
7. **Use attribution for direction, not precision.** It indicates which
   channels contribute; treating the numbers as exact drives bad
   reallocation.

## Boundaries

Attribution models correlation and rarely establishes causation. Privacy
protections have reduced tracking accuracy substantially, and this
continues. Brand effects and word of mouth are largely unattributable
and often the largest contributors.
