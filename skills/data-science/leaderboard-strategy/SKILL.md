---
name: leaderboard-strategy
description: Trust your cross-validation over the public leaderboard, avoid overfitting it, and select final submissions wisely. Use in the endgame of a Kaggle competition, where rank is won or lost by validation discipline.
---

# Leaderboard strategy

The public leaderboard is a trap dressed as feedback. It scores a small
slice of the test data, and chasing it overfits to that slice, dropping you
hundreds of ranks when the private leaderboard reveals the rest. The whole
strategy is: trust your own validation, use the public LB as one weak
signal, and select finals by CV.

## Method

1. **Make your cross-validation the source of truth.** A CV scheme that
   matches how train and test differ (see cross-validation,
   kaggle-competition-workflow) is your honest, larger measure of progress.
   The public LB scores far fewer rows; your CV usually estimates the
   private LB better. When they disagree, investigate rather than trusting
   the LB.
2. **Establish the CV-to-LB relationship early.** Submit the baseline and
   note the gap and correlation between local CV and public LB. A stable
   offset (LB tracks CV plus a constant) means the LB is informative; a CV
   that improves while LB does not (or vice versa) is a warning of a split
   mismatch or a leak you should understand.
3. **Do not tune on the public leaderboard.** Every decision made to
   improve the public score, rather than CV, overfits to that small slice.
   Probing the LB, selecting features by LB movement, or picking
   hyperparameters by submission is how a strong CV model becomes a fragile
   LB-tuned one. Limit submissions to sanity-checks, not a search loop.
4. **Watch for a shakeup.** When the public LB is small or the metric is
   noisy, private rankings reorder dramatically at reveal ("the shakeup").
   The competitors who survive it trusted robust CV and avoided
   LB-overfitting; those who climbed the public LB by chasing it fall.
   Expect a shakeup and build for the private set.
5. **Select final submissions by CV, with a hedge.** You typically choose
   two final submissions: pick them by cross-validation score, not public
   LB rank. A common strategy is one best-CV submission and one safe/robust
   submission (a solid ensemble), hedging against both variance and your CV
   being slightly off. Never pick both finals by public LB.
6. **Understand the split before trusting anything.** Whether the public/
   private split is random, by time, or by group changes everything; a
   time-based test means recent-data CV matters most, a grouped test means
   grouped CV. Read the competition's description and the data to infer the
   split (see train-test-discipline).

## Boundaries

- This is a competition discipline; in production there is no public
  leaderboard, but the underlying lesson (trust honest offline validation
  over a small noisy signal) transfers directly to shipping models (see
  model-deployment, ab-test-design).
- Robust CV cannot fix a leak or a fundamentally wrong split; if CV and LB
  both look impossible, suspect leakage in the data or your features (see
  feature-engineering-tabular, exploratory-data-analysis).
- Reading forums and public notebooks is legitimate and valuable (shared
  tricks, discovered leaks); ignoring the community is its own strategic
  error.
