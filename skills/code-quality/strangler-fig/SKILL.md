---
name: strangler-fig
description: Replace a legacy system incrementally behind a routing facade, moving one slice at a time instead of a big-bang rewrite. Use when retiring or rewriting a system that must keep running throughout.
---

# Strangler fig

A big-bang rewrite ships nothing for months, then swaps two systems at once
and prays. The strangler fig pattern, named for the vine that grows over a
tree until it stands on its own, replaces a system piece by piece behind a
facade that routes each request to old or new. Value ships continuously and
rollback is a config change.

## Method

1. **Put a facade in front of the old system.** Route all traffic through one
   interception point: a reverse proxy, an API gateway, or a dispatch layer.
   Until every call passes through that seam, you have nowhere to redirect a
   slice from old to new.
2. **Carve off one thin vertical slice.** Pick a single endpoint or
   capability, low-risk and self-contained, and reimplement just that in the
   new system. Resist starting with the scariest module; start where a win
   is cheap and reversible.
3. **Route the slice to new, keep the rest on old.** Flip that one route at
   the facade. The new path handles its slice while everything else stays on
   the legacy system, untouched and serving.
4. **Shadow before you trust.** Send the slice to both systems, compare
   outputs, and log divergence, but keep serving the old result until the new
   one matches on real traffic. Shadowing catches the cases your tests
   missed.
5. **Migrate data on the slice boundary.** Move or sync only the data the new
   slice owns, using dual-write or change-data-capture so both systems stay
   consistent during the overlap. Do not migrate the whole store up front.
6. **Retire the strangled path, then repeat.** Once a slice runs clean on new
   long enough, delete its old code and data. Iterate slice by slice until
   the legacy system serves nothing, then remove the facade if nothing else
   needs it.

## Checks

- Can you point to the single facade every request flows through?
- Is at least one slice fully served by the new system in production right
  now?
- Can you route a slice back to the old system with a config flip and no
  deploy?

## Boundaries

Strangler fig suits systems large enough that a rewrite would take months and
must keep running throughout; a small script is cheaper to replace outright.
This skill governs migration shape, not the safety of edits to the legacy
code you keep touching along the way: for those, see legacy-code-changes.
