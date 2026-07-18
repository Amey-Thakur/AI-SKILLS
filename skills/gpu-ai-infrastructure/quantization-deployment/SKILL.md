---
name: quantization-deployment
description: Quantize a trained model to INT8 or INT4 for inference, calibrate the ranges, and gate the release on a measured quality regression. Use when serving needs lower latency and memory and you will spend effort keeping accuracy inside a defined budget.
---

# Quantization deployment

Quantization maps floating-point weights and activations to low-bit integers,
cutting memory 2x to 4x and letting integer tensor cores do the math faster. The
catch is that it is lossy: pick the wrong ranges or scheme and accuracy falls off
a cliff, often on exactly the inputs you never tested. The discipline is to
calibrate ranges on real data, choose the scheme per tensor, and refuse to ship
until a quality gate passes.

## Method

1. **Start with post-training quantization, escalate to QAT only on failure.**
   Post-training quantization (PTQ) needs no retraining: convert an existing FP
   model and calibrate. If PTQ misses the budget, quantization-aware training
   (QAT) simulates the rounding during fine-tuning and usually recovers most of
   the gap, at the cost of a training run. Do the cheap thing first.
2. **Calibrate activation ranges on representative data.** Weights have fixed
   values, but activation ranges depend on inputs. Push a few hundred
   representative samples through the model to record per-tensor histograms, then
   set clipping thresholds. Entropy or percentile calibration (clipping the top
   0.01 percent of outliers) beats plain min/max, which a single outlier ruins.
3. **Tame activation outliers before they wreck the scale.** In transformers a
   few channels carry huge activation magnitudes that stretch the range and crush
   everything else. SmoothQuant shifts that difficulty from activations into
   weights so a per-tensor activation scale still fits. Apply it before choosing
   thresholds, not after.
4. **Match the scheme to the tensor.** Use per-channel (per-output-channel)
   scales for weights and per-tensor scales for activations; per-channel weight
   quantization alone recovers much of the loss. Prefer symmetric quantization
   for weights and asymmetric with a nonzero zero-point for one-sided activations
   like post-ReLU outputs.
5. **Choose bit width against the model's tolerance.** INT8 is the safe default
   and often loses under 1 percent accuracy. INT4 doubles the saving again but
   needs group-wise scales (for example groups of 128 weights) and a
   salient-weight scheme like GPTQ or AWQ to stay usable. Do not reach for INT4
   before INT8 is validated.
6. **Keep sensitive layers in higher precision.** The first and last layers, and
   any layer with wide activation ranges, often dominate the error. Run a
   sensitivity sweep that quantizes one layer at a time and measures the drop,
   then leave the worst offenders in INT8 or FP16. Mixed precision trades a little
   speed for a lot of accuracy.
7. **Gate the release on a measured regression.** Fix the budget before you
   quantize (top-1 within 1 percent, or perplexity increase under 2 percent) and
   evaluate on a held-out set separate from calibration data. Block the deploy if
   the gate fails, and record before/after numbers and the scheme in the release
   notes.

## Checks

- Does the quantized model meet the pre-stated budget on a held-out set separate
  from calibration data?
- Were activation ranges calibrated on representative inputs with outlier
  clipping, not raw min/max?
- Are weights per-channel and activations per-tensor, with symmetric or
  asymmetric chosen to fit each?
- Did a per-layer sensitivity sweep justify which layers stay higher precision?

## Boundaries

This targets integer quantization for inference serving. Floating-point half
formats (FP16, BF16, FP8) and their loss scaling are mixed-precision-deployment.
Making the resulting INT8 matmuls actually hit the integer tensor cores is
tensor-core-utilization. The accuracy budget itself is a product decision:
quantization measures the cost, the owner decides if it is acceptable.
