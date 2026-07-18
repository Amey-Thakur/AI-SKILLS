---
name: mixed-precision-deployment
description: Ship FP16, BF16, or FP8 training and inference that holds accuracy while capturing the speedup, using loss scaling and numeric validation. Use when moving a model off FP32 to run faster or fit in less memory and the result must stay correct.
---

# Mixed-precision deployment

Half precision roughly doubles throughput and halves memory, but it narrows the
range a value can represent, so gradients underflow to zero and running sums
shed digits. Teams that flip on FP16 and skip the numerics work get a model that
trains to NaN or drifts silently at inference. The method is to pick the right
half format, protect the operations that need range, and validate against the
FP32 baseline before trusting the speedup.

## Method

1. **Prefer BF16 over FP16 when the hardware offers it.** BF16 keeps FP32's
   8-bit exponent, so it shares the same dynamic range and rarely overflows or
   underflows; it simply carries fewer mantissa bits. On Ampere, Hopper, and
   TPUs this removes the need for loss scaling. Reserve FP16 for Volta and Turing
   or when its extra mantissa precision measurably helps.
2. **Use dynamic loss scaling with FP16 training.** Small gradients underflow
   FP16's range to zero. Multiply the loss by a scale before backward so
   gradients land in representable range, then unscale before the optimizer step.
   `torch.cuda.amp.GradScaler` raises the scale until it overflows, backs off,
   and skips that step automatically.
3. **Keep master weights and reductions in FP32.** Run the forward and backward
   math under autocast, but store the optimizer's weights in FP32 and accumulate
   wide sums (softmax denominators, layernorm statistics, the loss) in FP32. That
   split is what "mixed" names: compute in half, accumulate and update in full.
4. **Treat FP8 as a scaled format, not a drop-in.** On Hopper, FP8 (E4M3 for
   weights and activations, E5M2 for gradients) needs per-tensor scale factors
   tracked over recent history, as in Transformer Engine's delayed scaling. Do
   not hand-roll it; use the library that manages the scales and keeps sensitive
   layers in higher precision.
5. **Validate numerics against the FP32 baseline.** For inference, compare
   outputs on a held-out set and require the metric (accuracy, perplexity, mAP)
   to stay within a stated tolerance, for example 0.1 percent. For training,
   check that the loss curve tracks the FP32 run and the scaler is not skipping
   most steps, which signals persistent overflow.
6. **Confirm the speedup is real and layer-appropriate.** Measure end-to-end
   throughput, not just kernel time; cast overhead can eat the win on small
   tensors. Keep numerically delicate ops (final softmax, some norms) in higher
   precision when they cost little time but a lot of stability.

## Signals

- Does the half-precision model stay within the stated tolerance of the FP32
  baseline on a held-out set?
- With FP16, is dynamic loss scaling settling at a stable scale rather than
  skipping many steps?
- Are weights, optimizer state, and wide reductions in FP32 while the bulk of
  matmuls run in half?
- Did end-to-end throughput rise by a factor consistent with the format's peak?

## Boundaries

This is numerical correctness and speedup when moving to floating-point half
formats. Integer quantization (INT8, INT4) with calibration is a separate
discipline: quantization-deployment. Getting the half-precision matmul onto the
tensor cores in the first place is tensor-core-utilization. Layer-level accuracy
trade-offs that change model behavior are the model owner's decision.
