---
name: gradient-boosting-tuning
description: Tune gradient-boosted trees (XGBoost, LightGBM, CatBoost) effectively: the parameters that matter and the order to tune them. Use when using gradient boosting on tabular data and wanting real gains from tuning.
---

# Gradient boosting tuning

Gradient-boosted trees are the workhorse of tabular ML and Kaggle. They
work well at defaults, which is exactly why undisciplined tuning wastes
time for marginal gains. Knowing which parameters matter, and tuning them
in the right order against honest validation, is the skill.

## Method

1. **Start from good defaults and a strong baseline.** LightGBM, XGBoost,
   and CatBoost perform well out of the box; tune to squeeze the last few
   percent, after features (which matter more; see
   feature-engineering-tabular). Fix a trustworthy cross-validation first,
   because you will make dozens of comparisons against it (see
   cross-validation).
2. **Tune the parameters that control complexity first.** The
   highest-impact knobs govern how complex each tree gets and how much the
   model can fit: number of leaves / max depth, and minimum samples per
   leaf. These trade underfitting against overfitting more than anything
   else; get them roughly right before fine-tuning the rest.
3. **Pair learning rate with number of trees, using early stopping.** Lower
   learning rate plus more trees generally improves accuracy at the cost of
   time. Do not tune tree count by hand: set a low learning rate and a high
   cap, and let early stopping on the validation fold pick the count. This
   single mechanism tunes the most sensitive interaction for free.
4. **Add regularization to fight overfitting.** Subsampling rows
   (bagging fraction) and columns (feature fraction) per tree, plus L1/L2
   penalties, reduce overfitting and often improve generalization. Turn
   these up when train score far exceeds validation.
5. **Search efficiently, not exhaustively.** Random or Bayesian search
   (Optuna) over the parameters above beats grid search at equal budget;
   set a budget and stop (see hyperparameter-tuning). Guard the validation
   set: hundreds of trials overfit to it, so confirm the final config
   generalizes and expect the leaderboard/test to come in slightly under
   the tuned CV.
6. **Handle categoricals and imbalance with the library's tools.**
   LightGBM and CatBoost take categorical features directly (often better
   than manual encoding); set class weights or `scale_pos_weight` for
   imbalance rather than blindly resampling (see imbalanced-data). Use the
   library's native handling before hand-rolling.

## Boundaries

- Tuning yields modest gains compared to features and ensembling; on a
  plateau, add signal or diverse models rather than more trials (see
  feature-engineering-tabular, model-ensembling).
- The three libraries differ in defaults, categorical handling, and speed;
  the tuning principles transfer, the exact parameter names and best
  values do not, so read the specific library's docs.
- Boosted trees overfit noisy targets readily; strong regularization and
  honest validation matter more the noisier the problem, and sometimes a
  simpler model generalizes better (see ml-baselines).
