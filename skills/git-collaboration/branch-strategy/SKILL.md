---
name: branch-strategy
description: Choose a branching model, default to trunk-based with short-lived branches, and set protection rules. Use when establishing team git workflow or fixing long-lived-branch merge pain.
---

# Branch strategy

The branching model shapes how a team integrates work, and most teams
over-complicate it. The default that fits the most cases is trunk-based
development: short-lived branches merged to one main line daily,
integration continuous, merge hell absent because divergence never
grows large.

## Method

1. **Default to trunk-based, short-lived branches.** One
   long-lived branch (main); feature branches live hours to
   a day or two, then merge; integrate continuously so no
   branch diverges far enough to fight (see
   git-history-hygiene, pull-request-size: small and short
   go together). The alternative (long-running feature and
   develop branches: git-flow) suits infrequent versioned
   releases and punishes continuous delivery with merge
   pain.
2. **Keep main always releasable.** Main passes CI at every
   commit (see deployment-pipelines) and is deployable at
   any time; broken main blocks everyone, so protect it.
   This is the invariant that makes short-lived branches
   safe to merge often: you are merging into something
   stable.
3. **Hide incomplete work behind flags, not branches.**
   Long-lived feature branches exist to keep unfinished
   work out of main; feature flags do that better, merging
   the code dark and enabling it when ready (see
   feature-flags-hygiene). This is what lets trunk-based
   work with large features: integrate continuously,
   release selectively.
4. **Set branch protection to enforce the workflow.** Main
   requires: passing CI, review approval (see code-review,
   code-owners), up-to-date-with-base, and no force-push;
   linear history if the team prefers it (see
   merge-vs-rebase). Protection rules are how the strategy
   survives the pressure to skip steps.
5. **Match release branches to your release model.**
   Continuous delivery: tag releases off main, no release
   branch needed (see release-tagging). Versioned/supported
   releases (you patch old versions): short-lived release
   branches cut from a main commit, cherry-picking fixes
   back. Do not carry release branches you do not support;
   they are debt.
6. **Delete branches after merge.** Merged branches are
   noise; auto-delete on merge so the branch list shows
   only active work (this also keeps the repo to one
   effective line plus current features). A branch list of
   two hundred stale entries hides the three that matter.

## Boundaries

- Trunk-based requires the safety net (strong CI, tests,
  flags, fast rollback: see deployment-pipelines,
  rollback-strategy); without it, frequent merges to main
  are frequent chances to break everyone. Build the net
  first.
- Open-source and external-contributor projects use
  fork-and-PR flows (contributors cannot push branches):
  a different model for a different trust boundary (see
  open-source-maintainer-role).
- The model serves the release cadence; pick from how you
  actually ship (continuous vs versioned vs supported
  releases), not from what a blog post named.
