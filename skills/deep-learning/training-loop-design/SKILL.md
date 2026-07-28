---
name: training-loop-design
description: Structure a training loop with correct ordering, evaluation, checkpointing, and logging so runs are debuggable and resumable. Use when writing or reviewing training code.
---

# Training loop design

Most training bugs are loop bugs rather than model bugs: gradients not
zeroed, evaluation running in training mode, or a metric averaged
incorrectly. The loop is short and unforgiving.

## Method

1. **Get the ordering right and keep it.** Zero gradients, forward,
   compute loss, backward, step. A stale gradient from a missed zero
   produces training that appears to work and does not.
2. **Switch modes explicitly for evaluation.** Dropout and normalisation
   behave differently in training and evaluation, and forgetting to
   switch is the most common source of a train and validation gap that
   is not real.
3. **Disable gradient tracking during evaluation.** It saves substantial
   memory and makes the intent explicit.
4. **Log per-step and per-epoch separately.** Loss averaged over an
   epoch hides instability within it, and the within-epoch curve is
   where divergence appears first.
5. **Checkpoint on a schedule and on best validation.** Both, because
   the latest and the best are different needs, and long runs fail (see
   checkpointing-large-training).
6. **Make runs reproducible.** Seeds, data order, and configuration
   recorded with the checkpoint, since an unreproducible good result is
   nearly useless (see experiment-tracking).
7. **Overfit a tiny batch first.** A model that cannot drive loss to
   near zero on ten examples has a bug, and this check takes minutes
   rather than hours.

## Boundaries

A correct loop does not make a model learn a task it cannot represent.
Distributed training adds synchronisation concerns beyond the single
loop (see distributed-training-scaling). Framework abstractions hide the loop
and its bugs equally.
