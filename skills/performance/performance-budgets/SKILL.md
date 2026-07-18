---
name: performance-budgets
description: Set numeric performance budgets and enforce them in CI so regressions fail the build instead of reaching users. Use when performance keeps sliding release over release or a team wants to hold a latency or bundle target.
---

# Performance budgets

A budget turns "feels slow" into a number a build can check. Without one,
performance decays by a few milliseconds per merge until someone notices in
production, and by then no single commit is to blame. The budget names the
number, the metric, and the gate that trips before the regression ships.

## Method

1. **Pick metrics tied to user pain, not vanity counters.** For web, use
   Largest Contentful Paint, Interaction to Next Paint, and total transfer
   size per route. For services, use p95 and p99 latency and requests per
   second at a fixed error rate. "Average response time" hides the tail
   where users actually suffer.
2. **Set thresholds from current p75, not aspiration.** Measure the field or
   lab baseline, then set the budget slightly tighter: if LCP p75 is 2.4s,
   budget 2.5s to stop drift, and open a separate goal to reach 2.0s. A
   budget you already fail on merge one is noise.
3. **Enforce in CI as a failing check.** Run Lighthouse CI with
   `assert.assertions` on `largest-contentful-paint` and `total-byte-weight`,
   or `size-limit` for bundles, or `k6` thresholds like
   `http_req_duration: ['p(95)<300']`. Exit nonzero so the pull request goes
   red, not yellow.
4. **Measure on stable hardware.** Lab numbers swing with runner load. Pin a
   dedicated runner or median three runs, and compare against the base branch
   in the same job so machine noise cancels.
5. **Budget the things that grow silently:** JavaScript bytes, image weight,
   database query count per request, and third-party script count. These
   creep without any one author feeling responsible.
6. **Make the failure message actionable.** Print the metric, the budget, the
   measured value, and the delta from base: "bundle 512KB over 480KB budget,
   +34KB since main". A red X with no number gets bypassed.

## Checks

- Does a synthetic commit that adds a 100KB dependency turn the build red?
- Can any engineer read the budget file and name every threshold in units?
- Do the CI numbers track field data, or has lab drifted from real users?

## Boundaries

Budgets catch regressions against a baseline; they do not tell you the right
target. Deriving the target from user research or revenue impact is a product
decision. For diagnosing why a specific number regressed, defer to profiling
and the relevant optimization skill.
