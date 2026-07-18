---
name: mixed-precision-deployment
description: Ship FP16, BF16, or FP8 training and inference that keeps accuracy while capturing the speedup, using loss scaling and numeric validation. Use when moving a model off FP32 to run faster or fit in less memory and you need the result to still be correct.
---

# Mixed-precision deployment

Half precision roughly doubles throughput and halves memory, but it narrows the
range of numbers a value can hold, so gradients underflow to zero and sums lose
digits. Teams that flip on FP16 and skip the numerics work get a model that
trains to NaN or drifts silently in inference. The method is to pick the right
half format, protect the operations that need range, and validate against the
FP32 baseline before trusting the speedup.

## Method

1. **Pick BF16 over FP16 when the hardware has it.** BF16 keeps FP32's
   8-bit exponent, so it has the same dynamic range and rarely overflows or
   underflows; it just carries fewer mantissa bits. On Ampere, Hopper, and
   TPUs this removes the need for loss scaling entirely. Reserve FP16 for older
   cards (Volta, Turing) or when its extra mantissa precision measurably helps.
2. **Use loss scaling with FP16 training.** Small gradients underflow FP16's
   limited range to zero. Multiply the loss by a scale factor before backward
   so gradients land in representable range, then unscale before the optimizer
   step. Use dynamic loss scaling (`torch.cuda.amp.GradScaler`), which raises
   the scale until it overflows, backs off, and skips that step.
3. **Keep a master copy of weights and reductions in FP32.** Use autocast for
   the forward and backward math, but store the optimizer's weights in FP32 and
   accumulate large sums (softmax denominators, layernorm statistics, loss)
   in FP32. This mixed pattern is why it is called mixed precision: compute in
   half, accumulate and update in full.
4. **Treat FP8 as a per-tensor scaled format, not a drop-in.** On Hopper,
   FP8 (E4M3 for weights and activations, E5M2 for gradients) needs per-tensor
   scaling factors tracked over recent history (delayed scaling), as in
   Transformer Engine. Do not hand-roll FP8; use the library that manages the
   scale updates and keeps sensitive layers in higher precision.
5. **Validate numerics against the FP32 baseline.** For inference, compare
   outputs on a held-out set and require the metric (accuracy, perplexity, mAP)
   to stay within a stated tolerance, for example within 0.1 percent. For
   training, watch that the loss curve tracks the FP32 run and that the gradient
   scaler is not skipping most steps, which signals persistent overflow.
6. **Confirm the speedup is real and layer-appropriate.** Measure end-to-end
   throughput, not just kernel time; overhead from casts can eat the win on
   small tensors. Keep numerically delicate ops (final softmax, some norms) in
   higher precision if they cost little time but a lot of stability.

## Signals

- Does the half-precision model stay within the stated accuracy tolerance of the FP32 baseline on a held-out set?
- With FP16, is dynamic loss scaling settling at a stable scale rather than skipping many steps?
- Are weights, optimizer state, and large reductions kept in FP32 while the bulk of matmuls run in half?
- Did end-to-end throughput actually improve, and by a factor consistent with the format's peak?

## Boundaries

This is about numerical correctness and speedup when moving to floating-point
half formats. Integer quantization (INT8, INT4) with calibration is a different
discipline: quantization-deployment. Getting the half-precision matmul onto the
tensor cores in the first place is tensor-core-utilization. Layer-level accuracy
trade-offs that change model behavior are a decision for the model owner.
