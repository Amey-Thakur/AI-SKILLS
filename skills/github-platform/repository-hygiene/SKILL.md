---
name: repository-hygiene
description: Keep a repository free of stale branches, dead files, oversized objects, and abandoned configuration. Use when a repository has grown cluttered or slow to clone.
---

# Repository hygiene

Repositories accumulate: merged branches, commented-out code, tooling
for processes that ended, and large files committed once. None of it is
urgent and together it makes the repository harder to work in and slower
to clone.

## Method

1. **Delete branches on merge, automatically.** Stale branches are the
   most common clutter and the easiest to remove at the source.
2. **Keep large binaries out of history.** Git stores every version
   forever, so a committed binary inflates every clone permanently and
   needs specialised storage instead.
3. **Remove dead code rather than commenting it.** History has the old
   version, and commented-out blocks are noise that confuses search (see
   dead-code-removal).
4. **Prune configuration for tools no longer used.** Configuration files
   for departed tooling mislead newcomers into thinking they are
   required.
5. **Keep ignore rules current.** New tooling produces new artefacts,
   and untracked noise makes status output useless.
6. **Audit stale open pull requests.** Long-open pull requests are
   either work someone should finish or work that should be closed, and
   both are decisions (see issue-and-project-tracking).
7. **Review access periodically.** Collaborators and integrations
   accumulate, and access nobody remembers granting is a real risk (see
   repository-permissions).

## Boundaries

Hygiene reduces friction rather than adding capability, so it competes
with feature work for attention. Rewriting history to remove large files
breaks every existing clone and needs coordination. Some apparent clutter
is deliberate, so deletion needs a check with whoever owns it.
