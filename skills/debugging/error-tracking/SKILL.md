---
name: error-tracking
description: Wire an error tracker to releases, tune grouping rules, and route each issue to an owner so exceptions become triaged work. Use when exceptions vanish into log noise and nobody knows which are new, which are spiking, or whose they are.
---

# Error tracking

An exception buried in a log file is a tree falling in an empty forest. An error
tracker (Sentry, Rollbar, Bugsnag) turns that same exception into a
deduplicated issue with a count, a trend, and a first-seen time. Wired without
care, though, it becomes its own noise: one bug fanned into ten thousand
issues, or ten bugs crushed into one nobody can read.

## Method

1. **Stamp every event with the release.** Set `release` to the commit SHA or
   semver and send a deploy marker on each ship. The tracker can then draw
   "first seen in v2.4.1" and turn a wall of errors into "the deploy an hour ago
   introduced these three". Regression detection needs this or it guesses.
2. **Upload source maps and symbols per release.** A minified frontend stack or
   a stripped binary points nowhere. Upload the source map or debug symbols
   tagged to the same release so frames resolve to real file and line. Without
   it, grouping keys off garbage and every deploy looks brand new.
3. **Group by an explicit fingerprint.** The default groups on the top frames,
   which splits one bug the moment a variable leaks into the message. Set a
   `fingerprint` (say the error class plus a stable route) so one defect stays
   one issue and the count carries meaning.
4. **Scrub volatile data out of the message before it groups.** Ids,
   timestamps, and user input in an exception string fracture one bug into
   thousands. Move them to tags or context and hold the message constant, so
   `Timeout on /orders/:id` groups instead of spawning an issue per order.
5. **Route issues to an owner automatically.** Map file paths or service tags to
   teams, through a CODEOWNERS-style rule or the tracker's ownership settings,
   so a new issue lands in the right queue and pings the right channel. An
   unassigned issue is an issue nobody triages.
6. **Attach the context that makes it actionable.** Set `user`, `request_id`,
   breadcrumbs, and environment on every event. When the owner opens the issue
   the trail from user action to exception is already there, and they debug
   instead of begging for a repro.

## Signals

- Can you tell from the tracker which issues first appeared in the latest ship?
- Does one real bug map to exactly one issue, not thousands or a merged blob?
- When a new issue opens, does it reach a named owner with no human routing it?

## Boundaries

An error tracker catches thrown exceptions; a silent wrong answer that raises
nothing stays invisible to it and belongs to metrics and log analysis. The
error id it records is a starting point: the surrounding request lives in the
logs and the trace. Follow the project's existing environment and release tags
so history stays continuous.
