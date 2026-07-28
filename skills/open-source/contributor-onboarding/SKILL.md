---
name: contributor-onboarding
description: Lower the cost of a first contribution with a working setup, a clear scope, and a fast review so people come back. Use when a project wants contributors and gets drive-by patches or none.
---

# Contributor onboarding

Most first contributions die before the first commit, in an environment
that will not build or a question nobody answered. Onboarding is
removing those failures, because the second contribution is what you are
actually recruiting.

## Method

1. **Make setup work from a clean machine in one document.** Every step
   tested on a fresh checkout, with prerequisites named and versions
   stated. A setup that only works on a maintainer's laptop is the most
   common barrier.
2. **Say what the project wants.** Scope, non-goals, and the kinds of
   change that will be accepted, so a contributor does not build
   something you will refuse (see api-change-management for the same
   discipline on interfaces).
3. **Curate genuinely small first issues.** A good first issue is
   self-contained, has a described outcome, and is not blocked on
   architectural knowledge. Labelling something hard as easy is worse
   than labelling nothing.
4. **Review the first contribution quickly.** Speed matters more than
   depth here; a week of silence loses the contributor regardless of how
   good the eventual review is.
5. **Separate blocking feedback from preference.** Say plainly what must
   change to merge and what is optional, because a wall of comments
   reads as rejection (see giving-feedback).
6. **Credit the work visibly.** Attribution in release notes and in the
   history is most of the compensation an open source contributor
   receives.

## Boundaries

- Onboarding attracts contributions; it does not guarantee maintainers,
  which is a different and harder problem (see maintainer-sustainability).
- Some projects genuinely should not accept outside contributions, and
  saying so is kinder than an unstaffed process.
- Lowering the bar for setup does not mean lowering it for quality;
  standards belong in review, communicated early.
