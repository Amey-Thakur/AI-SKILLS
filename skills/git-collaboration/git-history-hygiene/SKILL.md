---
name: git-history-hygiene
description: Keep git history atomic, bisectable, and readable with curated commits and disciplined force-push. Use when commits are messy, history is hard to navigate, or bisect and blame mislead.
---

# Git history hygiene

Git history is documentation that writes itself if you let it: a
readable log lets future-you bisect a bug to one small commit and
blame a line to its reason. Messy history (a hundred "wip", "fix",
"actually fix" commits) throws that away.

## Method

1. **Make each commit one logical change that builds.** A
   commit does one thing (a feature increment, a fix, a
   refactor: never a fix plus an unrelated cleanup) and
   leaves the code compiling and passing tests: so every
   commit is a valid bisect point (see below) and can be
   reverted cleanly. "One logical change" is the atomic-
   commit rule that makes everything else possible.
2. **Write commit messages that explain why.** Subject line
   in the imperative, under ~50 chars, summarizing the
   change; body explaining the *why* and context the diff
   cannot show (see commit-messages). The diff shows what
   changed; the message is where the reasoning lives, and
   it is the highest-leverage documentation you will ever
   write because it is attached forever to the exact change.
3. **Curate before sharing, not after.** During development,
   commit freely (wip, checkpoints); before opening the PR
   or merging, interactive-rebase into a clean sequence
   (squash fixups, reorder, reword: see merge-vs-rebase).
   The reviewer and history see intent; your messy process
   stays private. Squash-and-merge automates this at the
   PR level if the team prefers (see merge-vs-rebase).
4. **Keep history bisectable.** `git bisect` finds the
   commit that introduced a bug in log(n) steps: it only
   works if every commit builds and the history is
   granular enough to localize. Atomic, building commits
   (step 1) are what make bisect the debugging superpower
   it is (see binary-search-debugging); a history of giant
   or broken commits defeats it.
5. **Force-push only your own branches, with lease.**
   `--force-with-lease` (never bare `--force`) on your
   private branch is fine (curating before review); force-
   pushing shared branches rewrites others' history (the
   cardinal sin: see merge-vs-rebase). After a shared
   commit lands, changes go forward (revert), never by
   rewriting.
6. **Undo forward on shared history.** `git revert` creates
   a new commit undoing a bad one, preserving the record
   that it happened and was reversed: honest and safe on
   shared branches; the reflog (`git reflog`) recovers
   local mistakes for ~90 days, so local experimentation
   carries no real risk.

## Boundaries

- History hygiene serves navigation and debugging, not
  vanity; a team that squash-merges every PR has clean
  history without per-commit curation, a valid trade (see
  merge-vs-rebase). Match effort to how much the team
  actually uses granular history.
- Do not over-curate to the point of hiding real
  development reality where it matters (a genuinely
  complex change's steps can be worth preserving); the
  goal is readable-and-useful, not artificially pristine.
- Generated files, secrets, and large binaries do not
  belong in history at all (they bloat the repo forever
  and secrets stay recoverable: see secrets-management,
  git-hooks-automation for prevention); .gitignore and
  hooks prevent, history-rewriting to remove them after
  is painful.
