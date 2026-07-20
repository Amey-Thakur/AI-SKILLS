---
name: merge-vs-rebase
description: Choose merge or rebase by the history you want, use interactive rebase safely, and set a team policy. Use when deciding integration mechanics or resolving debates about git history style.
---

# Merge vs rebase

Merge and rebase produce the same code and different histories. The
choice is about what story you want git to tell, and the one
non-negotiable rule under all of it: never rebase commits that others
have already pulled.

## Method

1. **Understand what each does to history.** Merge preserves
   the true topology (a merge commit joins two lines, showing
   work happened in parallel); rebase rewrites your commits
   onto the tip of the base, producing a straight line as if
   you worked sequentially. Neither changes the final code;
   both are valid; the disagreement is aesthetic and
   practical, not correctness.
2. **Rebase your local, in-progress branch to stay current.**
   `git rebase main` on a branch only you have keeps it
   up-to-date with a clean linear history and surfaces
   conflicts incrementally. This is rebase's best use:
   private branch hygiene before it is shared or merged.
3. **Never rebase shared history.** Rebasing commits others
   have based work on rewrites history they depend on,
   forcing everyone into painful recovery: the one rule
   that causes real damage when broken. Published commits
   (on main, or on a branch a teammate pulled) are
   immutable; if you must undo them, `git revert` (a new
   commit) not rebase (see git-history-hygiene's
   force-push etiquette).
4. **Pick a team integration policy and automate it.**
   Common choices: merge commits (full topology,
   `--no-ff`), squash-and-merge (each PR becomes one clean
   commit on main: popular for readable history and
   bisectability), or rebase-and-merge (linear, preserves
   individual commits). Enforce it in the platform's merge
   button (see branch-strategy's protection rules); the
   worst outcome is a mix nobody can read.
5. **Use interactive rebase to curate before sharing.**
   `git rebase -i` to squash fixup commits, reorder, and
   reword into a coherent sequence *before* opening the PR
   or merging (see git-history-hygiene's atomic-commit
   goal): the reviewer reads intent, not your keystroke
   log. Fixup commits plus autosquash automate the common
   case.
6. **Recover safely when a rebase goes wrong.** The reflog
   (`git reflog`) records where branches pointed before any
   rewrite; `git reset --hard HEAD@{n}` restores. Knowing
   this makes rebase non-scary: nothing is truly lost for
   ~90 days, so experimentation on local branches is safe.

## Boundaries

- The choice affects readability and tooling (bisect, blame,
  revert), not code correctness; do not let it consume the
  energy a real design question deserves. Pick a policy,
  automate it, move on.
- Squash-and-merge simplifies main but loses intermediate
  commits (and their granular bisect/blame value): a
  reasonable trade for most teams, a loss for those who
  curate meaningful commit series (see
  git-history-hygiene).
- The never-rebase-shared rule has no exceptions worth the
  risk; when tempted, revert forward instead, and if a
  shared branch truly must be rewritten, coordinate
  explicitly and expect pain.
