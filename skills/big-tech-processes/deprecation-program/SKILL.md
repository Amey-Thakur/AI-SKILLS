---
name: deprecation-program
description: Run a deprecation from telemetry through a hard sunset date so a system can be retired without breaking the callers who still depend on it. Use when you own an API, library, endpoint, or service that must be turned off and other teams still use it.
---

# Deprecation program

Announcing a deprecation is easy: the hard part is that the announcement moves
nobody. Teams migrate off a system on the day it breaks, not the day you ask
them to, so a deprecation without instrumentation, tooling, and a real off
switch becomes an open-ended maintenance tax you pay forever. Run it as a
program with an end date, not a wiki page marked "deprecated".

## Method

1. **Instrument the surface before you announce anything.** Add per-caller
   telemetry: which team, service, and code path hits the thing, at what rate.
   OpenTelemetry spans or a tagged access log beat an aggregate request count,
   because "1M calls/day" tells you nothing about who to email. You cannot
   deprecate a caller you cannot name.
2. **Publish a notice with a hard sunset date and the replacement.** State the
   date the system stops working, the migration target, and the reason. Emit a
   deprecation warning at the call site: a log line, a response header (the
   `Sunset` header from RFC 8594), a compiler annotation. A notice with no date
   is a suggestion.
3. **Ship migration tooling, not just docs.** Write the codemod (jscodeshift,
   OpenRewrite, a sed script), the compatibility shim, or the adapter that does
   the mechanical work. Every hour of migration you make a caller spend is
   multiplied by the number of callers; a codemod pays for itself past three.
4. **Stop the bleeding.** Block new adopters the moment you announce: a lint
   rule, a denied build dependency, a flag that refuses new integrations. A
   deprecation that keeps gaining callers is not a deprecation, and the newest
   ones will be the loudest when the date arrives.
5. **Drive the number down with escalating comms tied to telemetry.** Track
   remaining callers as a burndown. Email at 90, 30, and 7 days, and address
   the actual teams still on the list, not a broadcast channel. Escalate to
   their management when the count stalls, with the names your telemetry gives.
6. **Enforce the date with a reversible brownout first.** On the sunset date,
   turn the system off. Rehearse with timed brownouts (fail calls for one hour,
   then restore) so stragglers feel the break while you can still roll back.
   Keep a break-glass path for a genuine emergency, logged and expiring.
7. **Remove the code and tombstone the entry point.** Delete the
   implementation, leave a clear error at the old address pointing to the
   replacement, and close the program. Dead code left "just in case" gets
   re-adopted and un-deprecates itself.

## Checks

- Can you name every team still calling the system this week from telemetry,
  not guess from memory?
- Does the deprecation notice carry a specific off date and a migration path a
  caller can follow without asking you?
- Is a new caller blocked from adopting today, or can the list still grow?
- Did you rehearse the shutdown with a timed brownout before the real one?

## Boundaries

This covers retiring a system you own with external callers. A purely internal
refactor with no downstream consumers needs none of this ceremony. Security
kill switches that must fire immediately override the comms timeline: follow
your incident process, not a 90-day burndown. Match the notice period to your
organization's API deprecation policy and any contractual commitments.
