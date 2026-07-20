---
name: mobile-release-strategy
description: Ship mobile releases through phased rollouts with hotfix paths and a forced-upgrade policy that never strands users. Use when planning app releases, a rollout gate, or recovery from a bad build in the stores.
---

# Mobile release strategy

Mobile releases are irreversible: you cannot pull a build back from a
user's device, and store review adds days of latency. Every practice below
exists to compensate for those two facts.

## Method

1. **Run a release train, not feature-driven releases.** A fixed cadence
   (weekly or biweekly) with a cut date; features that miss the cut ride
   the next train behind a flag. This removes "hold the release" pressure
   and makes every release small enough to bisect.
2. **Phase every rollout.** Start at 1-2%, watch crash-free rate and the
   two or three business metrics that matter for 24 hours, then 10%, 50%,
   100%. Halt criteria are numeric and pre-agreed (crash-free sessions
   below 99.5%: stop), not judgment calls at 2 a.m.
3. **Keep a hotfix lane.** A branch cut from the released tag, expedited
   review request, and a rehearsed checklist. Measure hotfix lead time in
   drills; if it is a week, your only real mitigation is server-side
   flags, so flag anything risky.
4. **Gate features server-side.** Risky code ships dark and turns on
   remotely after the binary proves stable. This converts most "pull the
   release" events into "flip the flag off" events, which take minutes.
5. **Design the forced-upgrade path before you need it.** A minimum
   supported version the app checks at launch, a soft-nag window before
   the hard wall, and a store link. Without it, a broken API contract or
   security hole lives forever on old installs.
6. **Version deliberately.** Marketing version for humans, build number
   monotonically increasing, API compatibility declared per release so the
   backend team knows what it must keep serving.

## Boundaries

- Store review can reject any release; never promise same-day fixes to
  stakeholders, and never bundle a policy-sensitive change into a hotfix.
- Phased rollout on Android and iOS cannot target specific users; for
  cohort control you need server-side flags, not store percentages.
- This governs distribution, not quality; it assumes CI already gates on
  tests and startup health.
