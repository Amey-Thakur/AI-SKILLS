---
name: pull-request-size
description: Keep pull requests small through vertical slicing and stacking, because review quality and latency both collapse with size. Use when PRs are too big to review well or sit for days.
---

# Pull request size

Small PRs are reviewed faster, more thoroughly, and merged sooner; big
PRs get a rubber-stamp because nobody can hold 2000 lines in their
head. The size of a PR is the single biggest lever on both review
quality and cycle time, and it is almost entirely under the author's
control.

## Method

1. **Aim for a PR a reviewer can hold in one sitting.**
   Roughly a few hundred lines of meaningful change; review
   quality drops sharply past that (studies and experience
   agree: beyond ~400 lines, defect detection craters
   because attention does). The number is a guide; the real
   test is "can one person review this well in one focused
   pass" (see code-review's execution-path reading).
2. **Slice vertically, not by layer.** Ship a thin
   end-to-end increment (one scenario working through the
   whole stack: see user-story-writing's slicing), not "all
   the database changes" then "all the API changes": layer
   slices are individually un-reviewable (no observable
   behavior) and individually un-shippable. Vertical slices
   are small *and* complete.
3. **Stack dependent PRs.** A large feature becomes a stack
   of small PRs, each building on the last, each reviewed
   independently (stacked-diff tooling, or manual base-
   branch chaining): the reviewer sees small coherent
   pieces instead of one wall. This is how you keep PRs
   small without blocking on a big feature landing all at
   once.
4. **Separate mechanical from substantive changes.** A
   rename, a format pass, or a move (see boy-scout-rule's
   restraint) goes in its own PR, not mixed with logic
   changes where it buries the three lines that matter in
   three hundred that do not. "Refactor + feature" in one
   PR is two reviews fighting for attention; split them.
5. **Hide incomplete work behind flags to keep merging.**
   Small PRs mean merging before the whole feature is
   user-ready; feature flags let incomplete code land dark
   (see feature-flags-hygiene, branch-strategy's trunk-based
   pairing): integrate continuously, enable when done. This
   is what makes small-PR discipline compatible with large
   features.
6. **Do the size math on latency.** A big PR sits for days
   (reviewers defer the intimidating one), blocks the
   author, accumulates merge conflicts, and gets a shallow
   review anyway: worse on every axis. Small PRs get
   reviewed in minutes-to-hours, keep the author moving,
   and rarely conflict (see deployment-pipelines' flow).
   Author effort to split is repaid many times in cycle
   time.

## Boundaries

- Some changes are irreducibly large (a generated-code
  update, a framework migration touching every file, a
  vendored dependency): flag these clearly, review the
  human-written parts closely and the mechanical parts by
  spot-check, and never bury real changes inside them (see
  code-review's large-diff honesty).
- Small PRs require good CI and test coverage to merge
  safely and often (see testing-strategy,
  deployment-pipelines); the discipline assumes the safety
  net that trunk-based development needs.
- Splitting has a floor: PRs so tiny they lack context
  (one line with no story) waste review overhead too; the
  target is small-and-coherent, not atomized.
