---
name: canary-analysis
description: Judge a canary release against a concurrent baseline using pre-set metric gates, automatic rollback, and statistically honest windows. Use when a deploy is rolling out to a slice of production traffic and you must decide pass, hold, or revert.
---

# Canary analysis

A canary sends the new version to a small slice of live traffic and compares its
behavior against the old version, so a regression hits a fraction of users
instead of all of them. The judgment goes wrong when the comparison is unfair,
the sample is too small to mean anything, or a human eyeballs a green dashboard
and ships on the first good-looking minute. Rigor here is the difference between
catching a regression and blessing one.

## Method

1. **Compare against a concurrent baseline, not history.** Run the old version as
   a control on the same population in the same window, and diff the canary
   against it. Comparing to yesterday's numbers lets time-of-day, traffic mix, and
   weekend effects masquerade as a regression or hide a real one.
2. **Set metric gates before the deploy.** Pick error rate, latency at p50 and
   p99, CPU and memory, and one business metric such as checkout rate; declare the
   direction and threshold for each up front. Tools like Spinnaker's Kayenta score
   these into a single verdict.
3. **Wait for a minimum sample before scoring.** A canary on 1% of traffic for
   ninety seconds cannot detect a 2% regression. Require a minimum request count
   or duration per gate, and refuse to render a verdict until it is met.
4. **Stay statistically honest.** Do not peek and ship the instant it looks
   green: continuously re-checking inflates false positives. Use a fixed window or
   a sequential test built for repeated looks, and correct for the many metrics
   you are testing at once so noise does not read as pass.
5. **Automate rollback on a breach.** If a gate crosses its threshold, revert
   traffic to baseline immediately rather than paging a human to decide. A canary
   that needs someone awake at 3 a.m. to pull the cord is just a slower outage.
6. **Treat inconclusive as hold, not pass.** A canary that never drew enough
   traffic to detect a regression has given you no signal, not a clean bill.
   Folding "no signal" into "healthy" is how quiet regressions reach 100%.
7. **Ramp in stages and re-score at each step.** Go 1%, 5%, 25%, 50%, 100%,
   scoring again at every step. A regression invisible under 1% of load can appear
   plainly under the contention of 25%.

## Checks

- Is the baseline running concurrently on the same population, or is this a
  comparison to stale history?
- Did each gate clear its minimum sample, or was the verdict called on too few
  requests?
- Does a threshold breach revert automatically, or does it wait on a human?

## Boundaries

Canary analysis judges a deploy against live metrics; it does not replace
pre-production tests or a load test, and it is blind to slow-burn failures like
memory leaks and data corruption that outlast the window. Pair it with a longer
soak for those, and tune the gates and scoring to your delivery platform's
convention.
