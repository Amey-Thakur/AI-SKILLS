---
name: loss-function-selection
description: Choose a loss that matches the task and the metric you care about, and understand what each penalises. Use when a model optimises well and performs badly on the thing that matters.
---

# Loss function selection

The loss is what the model actually optimises, and a mismatch between it
and the objective is why a model with excellent loss can be useless. The
loss encodes what errors you consider serious.

## Method

1. **Match the loss to the output type.** Cross entropy for
   classification over a distribution, squared or absolute error for
   regression, with the choice following the task rather than habit.
2. **Know what each penalises.** Squared error punishes outliers
   heavily; absolute error treats them linearly and is robust to noisy
   labels.
3. **Handle class imbalance in the loss.** Weighting or focal variants
   stop a rare positive class being ignored, since accuracy on an
   imbalanced set is trivially high (see class-imbalance).
4. **Align the loss with the deployment metric.** When they differ,
   either choose a closer surrogate or select checkpoints on the real
   metric rather than on loss.
5. **Combine losses with care.** Multi-term losses need weights that are
   themselves hyperparameters, and one term usually dominates unless
   scaled deliberately.
6. **Use numerically stable implementations.** Combined operations such
   as log-sum-exp exist to avoid overflow, and hand-composed equivalents
   produce not-a-number under load (see floating-point-behavior).
7. **Inspect per-example loss.** The worst examples show what the model
   finds hard and frequently reveal label errors (see data-cleaning).

## Boundaries

The loss shapes optimisation and cannot encode every real objective,
particularly fairness and cost asymmetries that need explicit handling.
Custom losses need gradient verification (see backpropagation). A loss
matching the metric does not guarantee the metric matches the business
outcome.
