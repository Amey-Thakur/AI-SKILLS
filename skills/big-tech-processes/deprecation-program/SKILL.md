---
name: deprecation-program
description: Run a deprecation from usage telemetry through a hard sunset date, with migration tooling and staged comms, so a system retires without stranding its callers. Use when you own an API, endpoint, library, or service that must be turned off while other teams still depend on it.
---

# Deprecation program

A deprecation announcement changes nobody's behavior. Teams migrate the week
their code breaks, not the week you ask, so a "deprecated" label with no
telemetry, no tooling, and no off switch becomes a maintenance tax you pay
indefinitely. Run it as a program with a burndown and a real end date, not a
wiki page and good intentions.

## Method

1. **Instrument the surface before you say a word.** Add per-caller telemetry:
   which team, service, and code path hits it, and at what rate. Tagged access
   logs or OpenTelemetry spans beat an aggregate counter, because "2M calls a
   day" names nobody to email. You cannot deprecate a caller you cannot identify.
2. **Publish a notice carrying a hard date and the replacement.** State the
   exact date the system stops answering, the migration target, and the reason.
   Emit the warning at the call site too: a `Sunset` response header (RFC 8594),
   a `@Deprecated` annotation, a startup log line. A notice with no date is a wish.
3. **Ship the migration, not just the docs.** Write the codemod (jscodeshift,
   OpenRewrite, a scripted sed pass), the shim, or the adapter that does the
   mechanical rewrite. Every hour of toil left on a caller multiplies by the
   caller count; a codemod serving three teams has already paid for itself.
4. **Close the front door the day you announce.** Block new adopters at once: a
   lint rule, a denied build dependency, a registration flag that refuses fresh
   integrations. A "deprecated" system still gaining callers is not being
   deprecated, and the newcomers shout loudest when the date lands.
5. **Burn the list down with comms tied to the telemetry.** Track remaining
   callers as a countdown and mail the specific teams on it at 90, 30, and 7
   days, not a broadcast channel nobody reads. When a team stalls, escalate to
   its manager with the exact call counts your instrumentation produced.
6. **Rehearse the shutoff with a reversible brownout.** Before the real date,
   fail all calls for a scheduled hour, then restore. Stragglers feel the break
   while you can still undo it, and hidden dependencies surface before they
   become an outage. Keep a logged, expiring break-glass path for true emergencies.
7. **Delete the code and tombstone the address.** Remove the implementation and
   leave a clear error at the old entry point pointing at the replacement. Code
   kept "just in case" gets re-adopted and quietly un-deprecates itself, so close
   the program by making the old path impossible to return to.

## Checks

- Can you name every team calling the system this week from telemetry, rather
  than guessing from memory?
- Does the notice carry a specific off date and a migration path a caller can
  complete without opening a ticket to you?
- Is a brand-new caller blocked from integrating today, or can the list still
  grow under you?
- Did a timed brownout rehearse the shutdown before the real one fired?

## Boundaries

This covers retiring a system you own that has external callers. A purely
internal refactor with no downstream consumers needs none of the ceremony. A
security kill switch that must fire now overrides the comms calendar: run your
incident process, not a 90-day burndown. Match the notice window to your
organization's API deprecation policy and any contractual commitments to customers.
