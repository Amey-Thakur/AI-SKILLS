---
name: docs-maintenance
description: Keep documentation from rotting through staleness detection, ownership, doc tests, and deliberate deprecation. Use when docs have drifted from reality or no process keeps them current.
---

# Docs maintenance

Documentation decays the moment it is written, because the code keeps
moving and the docs do not. Stale docs are worse than missing docs:
they mislead confidently, and readers trust them until burned.
Maintenance is the process that keeps docs true, and it must be
systematic because good intentions do not survive a busy quarter.

## Method

1. **Test what can be tested.** Code examples run in CI (see
   docs-as-code, tutorial-writing), links checked, generated
   reference regenerated on every build (see api-reference-
   docs): so the mechanically-verifiable parts of docs break
   the build when they drift, not the reader's afternoon
   three months later. This catches the highest-impact
   staleness automatically.
2. **Change docs with the code that invalidates them.** The
   PR that changes behavior updates the affected docs (see
   docs-as-code): this is the single most effective
   maintenance practice, because it fixes drift at the
   moment it would occur, by the person who knows what
   changed, while it is fresh (see pull-request-size's
   same-PR discipline).
3. **Assign ownership.** Every doc (or doc area) has an
   owner accountable for its accuracy (see code-owners):
   ownerless docs are nobody's job and rot fastest. The
   owner is not the sole author but the person who ensures
   it stays true, reviews changes to the code it describes,
   and answers "is this still right".
4. **Detect staleness actively.** Signals: docs referencing
   removed features or old commands, last-updated dates far
   behind the code's, support questions revealing a gap or
   error, analytics showing high-traffic pages (worth
   maintaining) vs dead ones (candidates to cut). A periodic
   review pass (quarterly) against these signals catches
   what automated tests cannot (see the drift-monitoring
   ethic, applied to docs).
5. **Deprecate and delete deliberately.** Docs for removed
   features get removed (see feature-sunsetting's honesty);
   superseded guides get a redirect or a clear "outdated,
   see X"; the docs graveyard of half-true old pages is its
   own information-architecture problem (see docs-
   information-architecture). Deleting stale docs is
   maintenance, not loss: a wrong page removed is a reader
   un-misled.
6. **Make maintenance low-friction and shared.** If fixing a
   doc is a one-line PR with a preview (see docs-as-code),
   the whole team fixes what they notice (see boy-scout-
   rule); if it requires a separate CMS and process, only
   the docs silo touches it and drift wins. Low friction
   plus shared ownership is what makes maintenance actually
   happen.

## Boundaries

- Not all docs deserve equal maintenance; high-traffic,
  high-stakes docs (getting-started, API reference,
  security: see api-reference-docs) get rigorous upkeep,
  low-traffic internal notes get less. Spend maintenance
  where readers and consequences are.
- Automated checks catch mechanical drift (broken examples,
  dead links) but not semantic drift (prose that is subtly
  wrong now): human review and the same-PR discipline
  remain necessary (the same limit as data-quality-checks
  vs semantic correctness).
- A maintenance process cannot rescue docs with no owner
  and no co-location; docs-as-code and ownership (steps
  2-3) are the prerequisites that make the rest possible.
