---
name: repository-structure
description: Organise a repository so a newcomer finds what they need and automation has predictable paths. Use when starting a repository or when nobody can find anything in an existing one.
---

# Repository structure

Structure is documentation that cannot go stale. A newcomer landing on
the root should be able to tell what the project is, how to run it, and
where the code lives, without asking.

## Method

1. **Make the root readable.** A handful of files with obvious purposes,
   since a root with forty entries communicates nothing (see
   documentation-for-adoption).
2. **Put the community files where the platform expects them.** Contributing
   guidance, code of conduct, security policy, and templates in the
   conventional locations so the platform surfaces them.
3. **Separate source, tests, docs, and tooling.** Predictable top-level
   directories let both people and automation target the right paths
   (see github-actions-workflows).
4. **Keep configuration together.** Scattered configuration files are
   the most common root clutter, and grouping them where the tooling
   allows keeps the root legible.
5. **Write the readme for the first ten minutes.** What it is, how to
   run it, and where to go next, before any badge collection.
6. **Document the layout when it is not obvious.** A short map of
   directories saves every newcomer the same exploration.
7. **Keep generated artefacts out of version control.** Build output and
   dependencies belong in ignore rules, and committing them creates
   noise in every diff (see repository-hygiene).

## Boundaries

Conventions differ by language and ecosystem, and consistency with the
ecosystem beats a personally preferred layout. Monorepos need additional
structure for boundaries and ownership (see monorepo-workspaces).
Restructuring an established repository breaks links and muscle memory,
so it needs justification.
