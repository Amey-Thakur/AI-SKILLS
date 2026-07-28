---
name: release-management
description: Ship releases on a predictable rhythm with versioned changes, tested artifacts, and notes users can act on. Use when releases are ad hoc or users cannot tell what changed.
---

# Release management

A release is a promise about what changed and what still works. The
practices that matter are the boring ones: versioning that carries
meaning, notes written for users, and a process repeatable enough that
anyone can run it.

## Method

1. **Version by compatibility, not by ambition.** Breaking changes,
   additions, and fixes each map to a component of the version, and
   marketing significance is not a reason to bump a major (see
   semantic-versioning).
2. **Keep the changelog as you go.** Written at release time it is a
   guess; written per change it is a record. Group by user impact rather
   than by commit (see changelog-writing).
3. **Automate the release itself.** Tag, build, test, publish, sign,
   with no manual steps that a tired person can skip. A manual release
   is one where the checklist eventually loses.
4. **Test the artifact, not just the source.** Install what you are
   about to publish, in a clean environment, and run it. Packaging
   breaks independently of code.
5. **State the upgrade path for anything breaking.** What changed, what
   to do about it, and whether a codemod or fallback exists. A breaking
   release without migration notes is a support queue.
6. **Publish where the ecosystem looks.** Registry, tags, and release
   pages consistent with each other, since a version present in one
   place and missing in another confuses tooling.

## Boundaries

- Release process ensures consistency; it does not make the release
  good, which is upstream in review and testing.
- Long-term support branches multiply the work and should be a
  deliberate commitment rather than an accident.
- Publishing rights are a security boundary: token scope, signing, and
  who can push matter as much as the process (see supply-chain-security).
