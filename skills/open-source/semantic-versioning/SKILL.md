---
name: semantic-versioning
description: Communicate compatibility through version numbers so consumers know what upgrading costs. Use when releasing a library, deciding whether a change is breaking, or setting a dependency range.
---

# Semantic versioning

A version number is a compatibility claim. Major means expect to change
your code, minor means new capability that is safe to take, patch means
a fix. The value is entirely in honouring it, since one dishonest minor
teaches everyone to pin exact versions forever.

## Method

1. **Decide breaking by consumer impact, not by intent.** If reasonable
   existing usage stops working, it is breaking, regardless of whether
   that usage was documented or intended.
2. **Define the public surface explicitly.** What is covered by the
   compatibility promise and what is internal. Without this, every
   internal change is arguably breaking (see api-surface-minimalism).
3. **Prefer deprecation to removal.** Add the new path, mark the old one
   deprecated with a warning and a date, and remove at the next major.
   This converts a breaking change into a planned migration (see
   api-deprecation).
4. **Treat behaviour changes as breaking too.** Changing a default,
   tightening validation, or altering output format breaks consumers
   just as surely as removing a function.
5. **Use zero-major honestly.** Pre-1.0 signals instability, and staying
   there for years while users depend on you is a way of avoiding the
   promise rather than making one.
6. **Set dependency ranges you can defend.** Accepting minors from an
   upstream that breaks them is optimism; pinning everything exactly is
   a maintenance burden. Choose per dependency based on its track
   record (see dependency-management).

## Boundaries

- Versioning communicates compatibility; it does not create it, and a
  major bump does not excuse a gratuitous break.
- Security fixes sometimes must break compatibility, and saying so
  loudly is better than smuggling it into a patch.
- Some ecosystems have their own conventions that override this scheme,
  and consistency with the ecosystem wins.
