---
name: model-ensembling
description: Combine diverse models through averaging, blending, and stacking to beat any single model. Use when squeezing maximum accuracy from a competition or high-stakes prediction, after strong single models exist.
---

# Model ensembling

Combining models beats picking the best one, because different models make
different errors and averaging cancels them. Ensembling is how competitions
are won on the margin. The one requirement most people miss: the models
must be diverse, or the ensemble adds nothing.

## Method

1. **Build diverse base models first.** The ensemble's power comes from the
   models disagreeing in their errors: different algorithms (boosted trees,
   neural nets, linear), different features, different seeds, different data
   subsets. Averaging five near-identical models barely helps; averaging
   genuinely different ones helps a lot. Diversity is the goal, not just
   more models.
2. **Start with simple averaging.** Average the predictions (for
   probabilities, often the geometric mean or averaging logits; for rank
   metrics like AUC, rank-averaging) of your strong models. This trivial
   ensemble usually gives a real, free gain over the best single model and
   is robust. Weight by validation performance if some models are clearly
   stronger.
3. **Blend with a holdout for learned weights.** Instead of equal weights,
   learn the combination weights on a holdout set (a simple linear model
   over the base predictions). More powerful than averaging, but needs
   clean out-of-fold predictions to avoid leaking (the blend must not train
   on data the base models saw for those predictions).
4. **Stack for the most gains, carefully.** Stacking trains a meta-model on
   the base models' out-of-fold predictions as features. It extracts the
   most from an ensemble but is the easiest to leak: the base predictions
   feeding the meta-model must be genuinely out-of-fold (predicted on data
   that base model did not train on), or you get a fantasy validation score
   (see cross-validation, train-test-discipline).
5. **Keep out-of-fold discipline throughout.** Every ensembling method
   depends on honest out-of-fold predictions. Any point where a model's
   prediction for a row was influenced by that row's label leaks, and the
   ensemble's local score lies. This is the single failure that sinks
   ensembles on the private leaderboard.
6. **Weigh the gain against the cost.** Ensembles add accuracy and subtract
   simplicity, speed, and maintainability. In competitions the accuracy
   wins; in production a small single model often beats a giant ensemble
   once latency, cost, and fragility are counted (see model-deployment,
   ml-baselines).

## Boundaries

- Ensembling amplifies whatever the base models have; it cannot fix a
  fundamental flaw (leakage in the features, a broken validation scheme)
  shared across them. Garbage in, ensembled garbage out.
- The gains are marginal relative to features and validation; do not reach
  for stacking before the single-model foundations are strong (see
  kaggle-competition-workflow's ordering).
- Heavy ensembles rarely belong in production (latency, cost, operational
  complexity); reserve them for where the last decimal of accuracy is worth
  it, like a competition (see managed-vs-selfhosted's cost thinking).
