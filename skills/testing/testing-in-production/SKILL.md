---
name: testing-in-production
description: Verify changes against real traffic without risking users, using canaries, shadow traffic, and feature gates with automatic rollback. Use when a behavior cannot be trusted from staging alone and needs production load or data to prove out.
---

# Testing in production

Some failures only appear under real traffic: the query plan that degrades at
production data volume, the input distribution no fixture captured, the
integration that behaves differently against the live dependency. Staging
cannot reproduce them, so the choice is to learn from an outage or to verify
in production on purpose, with guardrails. Done right, real traffic validates
the change while a switch keeps the blast radius small.

## Method

1. **Gate every new path behind a flag defaulting off.** Ship the code dark,
   then enable it for internal users, then a small cohort, on a flag you can
   flip without a deploy. The flag is the kill switch: turning it off must
   fully restore the old path.
2. **Canary before full rollout.** Route a small percentage, start at 1 to 5,
   to the new version and compare its error rate and latency against the
   baseline over the same window. Promote only when the canary holds its SLO.
3. **Automate the abort.** Define the rollback trigger before you roll: error
   rate above threshold, latency regression, a spike in a key business metric.
   Wire it to revert automatically, because a human watching a dashboard will
   miss the two-minute window.
4. **Shadow traffic for read-heavy changes.** Mirror real requests to the new
   code path, compare its responses against production's, and discard its
   output. This exercises real inputs at zero user impact, as long as the
   shadow path performs no writes.
5. **Never let a test path mutate real data.** Shadow and canary writes go to a
   sandbox or are suppressed; dark reads are safe, dark writes are not. A
   verification run that corrupts a user's record has failed no matter what it
   measured.
6. **Probe continuously with synthetics.** Run scripted transactions (login,
   core action, checkout) against production on a schedule so a regression
   surfaces from your own probe, not from the first angry customer.

## Litmus tests

- Can you disable the new path in seconds without a deploy?
- Is the rollback trigger defined and automated, not left to someone watching
  graphs?
- Does any production verification write real user data, and if so, why is that
  safe?

## Boundaries

This is verification under live traffic, which assumes solid pre-merge testing
beneath it: unit, integration, and smoke coverage still gate the deploy. Flag
lifecycle and cleanup belong to feature-flags-hygiene, and the alerting that
watches a rollout to alerting-design. High-risk domains like payments or
medical may forbid production experiments outright: honor that.
