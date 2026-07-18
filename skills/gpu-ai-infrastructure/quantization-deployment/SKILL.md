---
name: quantization-deployment
description: Quantize a trained model to INT8 or INT4 for inference, calibrate the ranges, and gate the release on a measured quality regression. Use when you need lower latency and memory for serving and are willing to spend effort keeping accuracy inside a defined budget.
---

# Quantization deployment

Quantization maps floating-point weights and activations to low-bit integers,
cutting memory by 2x to 4x and letting integer tensor cores do the math faster.
The catch is that it is lossy: pick the wrong ranges or the wrong scheme and
accuracy falls off a cliff, often on exactly the inputs you did not test. The
discipline is to calibrate ranges on real data, choose the scheme per tensor,
and refuse to ship until a quality gate passes.

## Method

1. **Start with post-training quantization, reach for QAT only if it fails.**
   Post-training quantization (PTQ) needs no retraining: convert an existing
   FP model and calibrate. If PTQ misses the accuracy budget, quantization-aware
   training (QAT) simulates the rounding during fine-tuning and usually recovers
   most of the gap, at the cost of a training run. Do the cheap thing first.
2. **Calibrate activation ranges on representative data.** Weights have fixed
   values, but activation ranges depend on inputs. Run a few hundred
   representative samples through the model to record activation
   min/max or histograms, then choose clipping thresholds. Entropy or
   percentile calibration (clipping the top 0.01 percent of outliers) usually
   beats plain min/max, which one outlier can ruin.
3. **Match the scheme to the tensor.** Use per-channel (per-output-channel)
   scales for weights and per-tensor scales for activations; per-channel weight
   quantization alone recovers much of the lost accuracy. Prefer symmetric
   quantization for weights and asymmetric for activations with a nonzero
   zero-point (like post-ReLU outputs that are never negative).
4. **Choose bit width against the model's tolerance.** INT8 is the safe
   default and often loses under 1 percent accuracy. INT4 doubles the saving
   again but needs care: group-wise scales (for example groups of 128 weights),
   and schemes like GPTQ or AWQ that protect the salient weights, are what make
   4-bit LLM inference usable. Do not jump to INT4 before INT8 is validated.
5. **Keep sensitive layers in higher precision.** The first and last layers,
   and layers with wide activation ranges, often dominate the error. Run a
   sensitivity sweep that quantizes one layer at a time and measures the drop,
   then leave the worst offenders in INT8 or FP16. Mixed-precision quantization
   trades a little speed for a lot of accuracy.
6. **Gate the release on a measured regression.** Define the budget before
   quantizing (for example, top-1 accuracy within 1 percent, or perplexity
   increase under 2 percent) and evaluate the quantized model on a held-out set,
   not the calibration set. Block the deploy if the gate fails, and record the
   before/after numbers and the scheme in the release notes.

## Checks

- Does the quantized model meet the pre-stated accuracy budget on a held-out set separate from calibration data?
- Were activation ranges calibrated on representative inputs with outlier clipping, not raw min/max?
- Are weights per-channel and activations per-tensor, with symmetric/asymmetric chosen to fit each?
- Did a per-layer sensitivity sweep justify which layers stay in higher precision?

## Boundaries

This targets integer quantization for inference serving. Floating-point half
formats (FP16, BF16, FP8) and their loss scaling are mixed-precision-deployment.
Making the resulting INT8 matmuls actually hit the integer tensor cores is
tensor-core-utilization. The accuracy budget itself is a product decision:
quantization tells you the cost, the owner decides if it is acceptable.
