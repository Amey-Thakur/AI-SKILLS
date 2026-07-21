---
name: api-deprecation
description: Retire API surface with sunset headers, usage tracking, migration guides, and enforced timelines. Use when removing an endpoint, field, or version that consumers depend on.
---

# API deprecation

Removing API surface breaks whoever depends on it, and for public APIs
you often cannot see or contact all of them. Deprecation is the process
that gets consumers moved off before you remove, through clear signals,
measured usage, and a timeline long enough to migrate but firm enough
to actually end.

## Method

1. **Signal deprecation in-band.** `Deprecation` and
   `Sunset` HTTP headers (RFC standards) on responses from
   deprecated endpoints, `@deprecated` in schemas (GraphQL,
   proto: see graphql-schema-design, grpc-services), and
   deprecation notices in docs (see api-reference-docs): so
   consumers discover the deprecation programmatically and
   in documentation, not by surprise when it breaks. The
   signal reaches the machine and the developer.
2. **Measure who still uses it.** Track usage of the
   deprecated surface by consumer (see observability, api-
   versioning's usage tracking): you cannot end a
   deprecation you cannot measure, because you never know if
   anyone still depends on it. Usage data tells you who to
   contact and when it is safe to remove.
3. **Provide the migration path before deprecating.** The
   replacement (new endpoint, new field, new version) exists
   and works, with a clear migration guide (what to change,
   with examples: see tutorial-writing, changelog-writing):
   deprecating without a migration path is just breaking
   with extra notice. Consumers need somewhere to go before
   you tell them to leave.
4. **Set a timeline proportional to the change and the
   consumers.** Internal APIs with known consumers: weeks
   (coordinate directly). Public APIs with unknown
   consumers: months to a year, communicated clearly (see
   the sunset-program in api-versioning). The timeline
   balances giving consumers time against carrying the
   deprecated surface forever; state it and hold it.
5. **Contact the consumers you can reach.** For known/high-
   usage consumers (from the usage data), reach out
   directly: they are the ones a removal will hurt, and a
   personal heads-up prevents the angry-outage-postmortem.
   Broad-audience deprecations use changelog, email, and
   dashboard notices (see roadmap-communication's change-
   loudly, feature-sunsetting's communication).
6. **Enforce the timeline, optionally with brownouts.** As
   the sunset nears, brownouts (planned brief outages of the
   deprecated surface) surface remaining consumers who
   ignored the notices, and then remove on schedule (see
   feature-sunsetting's staged removal). A deprecation that
   never ends (the deprecated surface lives forever "just in
   case") carries full cost and teaches consumers that your
   deprecations are empty; if you announce it, finish it.

## Boundaries

- Deprecation is for surface consumers depend on; internal
  APIs with coordinated deploys can move faster (change
  all callers at once: see the internal-vs-external
  distinction in api-versioning). The ceremony scales with
  how little you control the consumers.
- Contractual and enterprise commitments may pin timelines
  longer than you would like; check obligations before
  announcing a sunset date (see feature-sunsetting's
  contractual boundary).
- Deprecation removes surface; it does not fix a bad API
  design by itself. If the whole approach was wrong, that
  is a version bump or a new API (see api-versioning), of
  which deprecation is one phase.
