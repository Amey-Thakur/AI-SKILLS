---
name: api-surface-minimalism
description: Keep the public API small by defaulting to private visibility and retiring symbols through deprecation before deletion. Use when designing a module's exports or reviewing what a package exposes to callers.
---

# API surface minimalism

Every exported symbol is a promise you maintain until you break it, and callers
bind to whatever you expose whether or not you meant them to. A wide surface is
expensive forever: it constrains refactors, multiplies test burden, and turns
internal details into contracts. The method is to expose the minimum callers
need and to withdraw capability on a schedule, never by surprise.

## Method

1. **Default every symbol to private.** Start at the language's tightest
   visibility: `private`, an unexported lowercase name in Go, no `__all__` entry
   in Python. Widen only when a concrete caller needs it. Export on demand.
2. **Publish one entry point per module.** Funnel access through a single index
   or facade so internal file structure stays free to change. Callers importing
   deep paths like `pkg/internal/impl/thing` freeze your layout in place.
3. **Prefer functions over exposed data.** Return a value or accessor instead of
   an exported mutable object or field. An exported field is a two-way contract;
   a getter lets you change the representation behind it later.
4. **Gate new surface behind its own review.** Treat "add to public API" as a
   decision distinct from the feature. Ask whether it could ship internal first
   and graduate to public once a second caller actually appears.
5. **Deprecate before you delete.** Mark the old symbol with `@Deprecated`,
   `warnings.warn(DeprecationWarning)`, or a doc note stating the replacement and
   the removal version. Keep it working at least one minor release.
6. **Delete on a published cadence.** Remove deprecated symbols only at a major
   version or an announced window, and record each in the changelog. Silent
   removal turns a routine upgrade into an outage for someone downstream.

## Checks

- Grep the exports: can you name a caller outside the module for each one?
- Does removing a symbol force a major bump, or did it never reach release notes?
- For each deprecation, are the replacement and removal version stated together?

## Boundaries

Libraries under a strict semantic-versioning contract set the real rules here:
follow the project's stability policy over personal taste. Internal code with a
single consumer can be looser, and framework plugin points sometimes must
expose more than feels comfortable.
