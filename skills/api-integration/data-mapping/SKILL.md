---
name: data-mapping
description: Translate between an external service's data model and your own, handling mismatches, nulls, and enum drift explicitly. Use when integrating a service whose model differs from yours.
---

# Data mapping

Two systems rarely agree on shape, naming, or what a field means. The
mapping layer is where those disagreements are resolved, and doing it
implicitly is how wrong data enters your system quietly.

## Method

1. **Map explicitly at the boundary.** One translation layer between
   their model and yours, so the rest of your code never sees their
   shape (see third-party-integration).
2. **Never store their identifiers as your primary keys.** Their
   identifier is a foreign reference, and coupling your keys to it makes
   provider migration nearly impossible.
3. **Handle unknown enum values without failing.** Providers add values,
   and a strict parser turns a routine provider change into an outage.
4. **Distinguish absent from null from empty.** These mean different
   things and providers use them inconsistently, so decide the mapping
   deliberately (see null-semantics).
5. **Validate on the way in.** Their data is untrusted input regardless
   of the provider's reputation (see input-validation).
6. **Record the raw payload alongside the mapped result.** When a
   mapping bug is found, the original is what allows reprocessing (see
   change-data-capture).
7. **Version the mapping.** Provider changes mean the mapping evolves,
   and knowing which version produced a record aids debugging.

## Boundaries

Mapping resolves structure, not semantics: two systems can both call
something status and mean unrelated things. Lossy mappings discard data
that a later requirement needs, which is why raw payloads are worth
keeping. Bidirectional sync multiplies the difficulty (see offline-sync).
