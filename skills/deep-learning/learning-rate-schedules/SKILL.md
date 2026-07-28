---
name: learning-rate-schedules
description: Set and vary the learning rate over training, since it is the hyperparameter that most determines whether a run converges. Use when loss diverges, plateaus early, or oscillates.
---

# Learning rate schedules

Too high and the loss diverges or oscillates; too low and training
crawls into a poor solution. Varying it over training, high early and low
late, is standard because early and late training need different step
sizes.

## Method

1. **Find the range empirically.** A short run sweeping the rate shows
   where loss falls fastest and where it diverges, which beats guessing
   from a paper.
2. **Warm up from a small value.** Starting at full rate destabilises
   early training, particularly with adaptive optimisers and large
   batches.
3. **Decay over the run.** Cosine and step decay both work; the
   principle is large steps while far from a solution and small steps
   while refining.
4. **Scale with batch size.** Larger batches give less noisy gradients
   and tolerate proportionally larger rates, which is why batch size and
   rate must be tuned together (see batch-size-effects).
5. **Read the loss curve for the symptom.** Divergence means too high,
   a plateau from the start means too low, and oscillation around a
   value means too high for the current phase.
6. **Lower the rate when fine-tuning.** A pretrained model needs far
   smaller steps than one trained from scratch, or it forgets what it
   knew.
7. **Log the rate alongside the loss.** Interpreting a curve without
   knowing the schedule is guesswork (see training-loop-design).

## Boundaries

Schedules interact with optimiser, batch size, and regularisation, so
transferred settings usually need retuning. Automated schedulers reacting
to plateaus can trigger on noise. No schedule rescues an unsuitable
architecture or bad data.
