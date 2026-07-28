---
name: optimizer-selection
description: Choose an optimiser and its hyperparameters based on the problem rather than habit, and know what each actually does. Use when training is unstable, slow to converge, or generalising poorly.
---

# Optimizer selection

Optimisers differ in how they use gradient history to set the step. The
adaptive ones are robust defaults, plain momentum sometimes generalises
better, and the choice interacts strongly with learning rate and
regularisation.

## Method

1. **Start with a well-tested adaptive default.** It works across a wide
   range of problems with little tuning, which is why it is the default
   in nearly every codebase.
2. **Understand momentum as smoothing.** Accumulating past gradients
   damps oscillation across narrow valleys and accelerates along
   consistent directions.
3. **Know what adaptivity does.** Per-parameter step scaling helps when
   gradient magnitudes vary widely across parameters, which is typical
   in deep networks.
4. **Decouple weight decay from the gradient.** Applying decay as part
   of the gradient interacts badly with adaptive scaling, and the
   decoupled variant is the correct default (see
   regularization-techniques).
5. **Tune the learning rate before anything else.** It matters more than
   the optimiser choice by a wide margin (see learning-rate-schedules).
6. **Watch the optimiser's memory cost.** Adaptive methods store
   per-parameter state, adding substantially to memory for large models
   (see gpu-memory-hierarchy).
7. **Change one hyperparameter at a time.** Optimiser settings interact,
   and simultaneous changes make results uninterpretable (see
   experiment-tracking).

## Boundaries

Optimiser choice matters less than data quality and architecture for
most outcomes. Published settings are tuned to their paper's setup and
transfer imperfectly. Second-order methods are rarely practical at
scale despite their theoretical appeal.
