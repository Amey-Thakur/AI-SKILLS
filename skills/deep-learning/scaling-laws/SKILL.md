---
name: scaling-laws
description: Reason about how model performance improves with parameters, data, and compute, to allocate a training budget sensibly. Use when planning a training run or evaluating claims about model size.
---

# Scaling laws

Loss improves predictably with scale, following power-law relationships
in parameters, data, and compute. The practical value is allocation:
given a fixed budget, the laws indicate how to split it between model
size and data rather than maximising parameters.

## Method

1. **Treat compute as the budget being allocated.** Parameters and
   tokens both consume it, and the question is the ratio rather than the
   maximum of either.
2. **Avoid undertraining large models.** A large model on insufficient
   data is a common and expensive error, and a smaller model trained
   longer often wins at equal compute.
3. **Account for inference cost separately.** A smaller model trained
   longer is cheaper to serve forever, which usually outweighs training
   efficiency in production.
4. **Expect diminishing returns.** Power laws mean each increment costs
   more for less, so the economic limit arrives before the technical one.
5. **Weight data quality alongside quantity.** Curation and
   deduplication shift the curve in ways raw token counts do not capture
   (see data-cleaning).
6. **Extrapolate cautiously.** Laws fitted in one regime break outside
   it, particularly across architecture and data distribution changes.
7. **Validate on the capability you need.** Loss improving smoothly does
   not mean a specific capability improves smoothly (see
   agent-eval-design).

## Boundaries

Scaling laws describe aggregate loss and predict specific capabilities
poorly. They are empirical fits, not physical laws, and are revised as
methods change. Most practitioners fine-tune rather than pretrain, where
these considerations barely apply (see fine-tuning-vs-prompting).
