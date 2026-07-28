---
name: regularization-techniques
description: Reduce overfitting with weight decay, dropout, augmentation, and early stopping, choosing by why the model is overfitting. Use when validation performance diverges from training performance.
---

# Regularization techniques

Regularisation constrains a model so it generalises rather than
memorising. Which technique helps depends on the cause: too little data,
too much capacity, or too long a training run all present as overfitting
and need different responses.

## Method

1. **Confirm overfitting before treating it.** A widening gap between
   training and validation loss, rather than a plateau, which is
   underfitting or a data problem (see overfitting-diagnosis).
2. **Add data or augmentation first.** More or more varied data is the
   most effective regulariser, and augmentation must preserve the label
   to help.
3. **Use weight decay as the default constraint.** It penalises large
   weights and is cheap, and it should be decoupled from the gradient
   with adaptive optimisers (see optimizer-selection).
4. **Apply dropout where capacity is excessive.** It prevents
   co-adaptation and interacts with normalisation layers, so placement
   matters more than rate.
5. **Use early stopping with a held-out set.** Stopping when validation
   stops improving is simple and effective and requires the set to be
   genuinely held out (see cross-validation).
6. **Consider reducing capacity.** A smaller model that fits the data is
   preferable to a large one heavily constrained, and it is faster too.
7. **Change one technique at a time.** Stacking regularisers makes
   attribution impossible and often produces underfitting.

## Boundaries

Regularisation trades training fit for generalisation, and too much
underfits. It cannot compensate for a validation set that does not
represent deployment. Some apparent overfitting is distribution shift
rather than memorisation (see drift-monitoring).
