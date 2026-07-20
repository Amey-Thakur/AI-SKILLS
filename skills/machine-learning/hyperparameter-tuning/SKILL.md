---
name: hyperparameter-tuning
description: Search hyperparameters with budgets, early stopping, and validation hygiene so gains are real, not overfit to the dev set. Use when tuning models or reviewing tuning claims.
---

# Hyperparameter tuning

Tuning is compute spent buying metric points. Spend it with a budget, a
search strategy better than grid, and the humility that hundreds of
trials against one validation set will overfit to that set.

## Method

1. **Tune only after the pipeline is trustworthy.** Splits disciplined
   (see train-test-discipline), features leak-free (see
   feature-engineering), baseline recorded (see ml-baselines). Tuning
   a leaky pipeline polishes a lie; and data/feature improvements
   usually dwarf hyperparameter deltas, so exhaust them first.
2. **Search the parameters that matter, on the right scales.**
   Learning rate (log scale), regularization strength (log),
   tree depth/leaves, subsampling rates; leave third-order knobs at
   defaults. Random or quasi-random search beats grid at equal budget
   (grid wastes trials on unimportant axes); Bayesian/model-based
   search (Optuna-class) pays off when single trials are expensive.
3. **Use early stopping as both tuner and guard.** For iterative
   learners (boosting, neural nets), fix a generous iteration cap and
   early-stop on validation: it tunes the most sensitive parameter
   for free. At the search level, successive-halving/Hyperband prunes
   bad trials at low fidelity so the budget concentrates on
   contenders.
4. **Set the budget before the first trial.** N trials or X GPU-hours,
   decided from the metric's value (see cloud-cost-optimization
   thinking); log every trial's config and result (see
   experiment-tracking). Open-ended tuning runs until someone gets
   bored, which is a stopping rule that favors noise.
5. **Protect the validation set from the search.** Hundreds of trials
   maximize validation-set luck along with skill: use K-fold CV
   inside the search when data is small (see cross-validation),
   re-fit the winner on train+validation only per your protocol, and
   report the final number from the untouched test set once. Expect
   test to come in slightly under the tuned validation score; if it
   craters, the search overfit.
6. **Prefer flat optima and reproducibility.** Between configs within
   noise of each other, take the one in a wide flat region (stable to
   drift and retrains) over a sharp peak; verify the winner across
   2-3 seeds before believing it (see model-evaluation uncertainty).
   Record final config in code, not in a notebook's memory.

## Boundaries

- Tuning cannot rescue the wrong model class or missing signal; a
  plateaued search is evidence to change representation, not to add
  trials.
- Percent-level gains that vanish across seeds are noise laundered
  through effort; the ship decision weighs stability and cost, not
  leaderboard decimals.
- AutoML earns its keep for breadth on tabular problems; it still
  obeys every rule here (budget, validation hygiene, test-once), and
  its winner still needs the deployment review (see
  model-deployment).
