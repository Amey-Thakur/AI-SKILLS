---
name: backpropagation
description: Understand how gradients flow backward through a network so vanishing gradients, dead units, and exploding losses become diagnosable. Use when training does not converge or a network learns nothing.
---

# Backpropagation

Backpropagation is the chain rule applied over a computation graph.
Understanding it matters less for implementing it, which frameworks do,
than for diagnosing training: almost every failure to learn is a
gradient that vanished, exploded, or never reached a parameter.

## Method

1. **Think of the network as a graph of operations.** The forward pass
   computes values and records the graph; the backward pass walks it in
   reverse multiplying local derivatives.
2. **Look for vanishing gradients in depth.** Repeated multiplication by
   small derivatives shrinks the signal toward the input layers, which
   is why early layers stop learning in deep networks.
3. **Watch for exploding gradients in recurrence.** The same
   multiplication with values above one diverges, and gradient clipping
   is the standard mitigation.
4. **Check for dead units.** Activations saturated in a flat region have
   near-zero derivative and never recover, so a large fraction of dead
   units means learning has stopped locally.
5. **Verify gradients when implementing anything custom.** Comparing
   against numerical estimates catches sign and indexing errors that
   otherwise present as mysteriously poor training.
6. **Remember what stops gradients.** Detached tensors, non-
   differentiable operations, and no-gradient contexts silently cut the
   path, and a parameter that never updates usually has one upstream.
7. **Inspect gradient norms during training.** Per-layer norms show
   where signal is lost far more directly than the loss curve does (see
   training-loop-design).

## Boundaries

Understanding backpropagation explains training dynamics; it does not
determine whether an architecture suits a problem. Frameworks handle the
mechanics correctly, so hand-derivation is rarely needed. Numerical
precision affects gradients materially at low precision (see
gpu-precision-modes).
