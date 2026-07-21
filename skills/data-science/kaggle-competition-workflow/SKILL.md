---
name: kaggle-competition-workflow
description: Approach a Kaggle (or any ML competition) systematically: trustworthy validation, strong baseline, then disciplined iteration. Use when entering a data competition and want to place well without wasting the timeline.
---

# Kaggle competition workflow

Competitions reward a specific discipline: a validation scheme you can
trust, a strong baseline fast, then relentless iteration measured against
that validation, not the public leaderboard. Most competitors lose rank by
overfitting the leaderboard or skipping the foundations.

## Method

1. **Understand the problem and metric first.** Read the data, the target,
   and above all the evaluation metric: it dictates everything (a metric
   like log-loss, AUC, or RMSLE changes your loss, your thresholding, and
   what to optimize). Reproduce the metric locally so you can measure
   yourself.
2. **Build a trustworthy validation scheme before anything else.** This is
   the single most important step. A cross-validation setup that mirrors
   how train and test differ (grouped by entity, split by time, stratified
   for imbalance) is your private measure of progress (see
   cross-validation, leaderboard-strategy). Everything after is measured
   against it; get it wrong and you optimize noise.
3. **Get a simple baseline submitted fast.** A minimal pipeline (basic
   features, a gradient-boosted model with defaults, your CV) end to end,
   submitted early. It confirms the pipeline works, calibrates local-CV to
   leaderboard, and gives a number to beat (see ml-baselines). Do not spend
   week one on a fancy model with no baseline.
4. **Iterate on features, measured by CV.** On tabular problems, feature
   engineering drives the gains (see feature-engineering-tabular); on
   images/text, it is architecture and augmentation. Add improvements one
   at a time, keep what improves cross-validation (not public LB), and log
   every experiment so you know what worked (see experiment-tracking).
5. **Tune and then ensemble, late.** Hyperparameter tuning gives modest
   gains (see gradient-boosting-tuning); ensembling diverse models gives
   more (see model-ensembling). Do both after features are strong, not
   before: ensembling weak models is a weak ensemble.
6. **Manage the endgame deliberately.** Watch for overfitting the public
   leaderboard, trust your CV for final submission selection (pick your
   two by CV, not by public LB rank; see leaderboard-strategy), and read
   the forums and public notebooks for tricks and leaks you missed.

## Boundaries

- Competition skill and production ML differ: competitions reward squeezing
  the metric with heavy ensembles that would be too slow and fragile to
  deploy. The validation, feature, and leakage discipline transfers; the
  giant stacked ensemble does not (see model-deployment).
- The public leaderboard is a small, sometimes adversarial slice; treating
  it as truth is the classic way to drop hundreds of ranks on the private
  set (see leaderboard-strategy).
- Time is the real constraint; a good baseline plus honest CV plus a few
  strong iterations beats an unfinished grand plan. Prioritize by expected
  gain (see prioritize-tasks).
