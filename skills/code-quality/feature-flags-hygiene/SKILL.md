---
name: feature-flags-hygiene
description: Ship code behind flags without accumulating flag rot, through disciplined naming, expiry, and cleanup sweeps. Use when adding a feature flag or auditing the flags already live in a codebase.
---

# Feature flags hygiene

A feature flag lets you ship code dark and turn it on when ready, splitting
deploy from release. The cost arrives later: every live flag doubles the
paths the code can take, and forgotten flags compound until no one knows
which branch runs in production. Treat each flag as debt with a due date.

## Method

1. **Name for intent and lifetime.** Prefix by kind: `release_`, `ops_`,
   `experiment_`, `perm_`. `release_checkout_v2` states its own purpose;
   `flag_new_thing` tells a maintainer nothing. Encode the owning team so an
   orphan has a contact.
2. **Set an expiry at creation.** Every release flag gets a removal date and
   a cleanup ticket in the same pull request that adds it. A flag with no
   death date becomes a permanent branch. Default release flags to 90 days.
3. **Default to off, fail to off.** New flags start disabled. If the flag
   service is unreachable, the code falls back to the old behavior, not to a
   half-shipped one. Test the off path, since it is what most users run.
4. **Keep flag checks shallow.** Read the flag once at the entry point and
   branch there, rather than threading `if flag` through ten functions. Deep
   checks are the ones stranded when you finally delete the flag.
5. **Sweep on a cadence.** Each sprint, list flags past expiry by crossing
   `grep -rn "isEnabled(" src/` against the flag dashboard. For each, remove
   the flag and its dead branch, keeping the winning path.
6. **Delete the flag and the loser together.** Removing a flag means
   deleting the check, the config entry, and the code path that lost. A
   "cleaned up" flag that leaves dead `else` branches is half a job.

## Checks

- Does every live flag have an owner, a purpose legible from its name, and
  an expiry date?
- Are any flags past their removal date still in the codebase?
- If the flag provider errored right now, would the app serve the safe old
  path?

## Boundaries

Kill switches and long-lived operational toggles (`ops_`, `perm_`) are
deliberately permanent: exempt them from expiry sweeps but still name and
document them. Defer to your platform's flag tool (LaunchDarkly, Unleash,
Flagsmith) for storage, targeting, and audit history.
