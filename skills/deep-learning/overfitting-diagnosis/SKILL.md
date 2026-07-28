---
name: overfitting-diagnosis
description: Distinguish overfitting from underfitting, data leakage, and distribution shift, since all four present as poor validation performance. Use when validation performance is worse than expected.
---

# Overfitting diagnosis

Poor validation performance has several causes that look identical from
a single number. Treating leakage as overfitting, or shift as capacity,
wastes weeks. Diagnosis is comparing the right curves before choosing a
treatment.

## Method

1. **Compare training and validation curves together.** A widening gap
   is overfitting; both high and flat is underfitting; validation
   improving then worsening is the classic overfit turning point.
2. **Check for leakage first.** Validation performance that is
   suspiciously good, or better than training, usually means information
   from validation reached training (see train-test-discipline).
3. **Verify the split is honest.** Random splits leak across time,
   groups, and duplicates, and the split must respect the structure of
   the data (see cross-validation).
4. **Test whether the model can overfit at all.** If it cannot drive
   training loss down on a small subset, the problem is capacity, bugs,
   or the learning rate rather than generalisation.
5. **Compare validation with deployment distribution.** A gap that
   appears only in production is shift rather than overfitting (see
   drift-monitoring).
6. **Inspect the worst validation examples.** They usually show a
   pattern, and often the pattern is label noise rather than model
   failure.
7. **Treat the diagnosed cause.** More data and regularisation for
   overfitting, more capacity or training for underfitting, and a fixed
   pipeline for leakage (see regularization-techniques).

## Boundaries

Diagnosis requires a validation set that represents deployment, and if
it does not, every conclusion is unreliable. Small validation sets give
noisy estimates that look like real differences. Repeatedly tuning
against one validation set overfits it (see agent-eval-design).
