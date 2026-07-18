---
name: tensorrt-optimization
description: Compile a trained model into a fast, GPU-specific TensorRT engine by controlling precision, defining dynamic shape profiles, and proving the fused engine kept its accuracy. Use when a PyTorch or ONNX model must reach a hardware latency floor that eager execution cannot.
---

# TensorRT optimization

TensorRT lowers a framework graph into a hardware-specific engine: it fuses
layers, benchmarks kernels on your exact GPU, and runs reduced precision on the
Tensor Cores. The gain is real, often 2x to 5x over eager PyTorch, but the engine
is opaque and can quietly drop accuracy or reject an input shape you never
tested. The method is to fix precision and shapes on purpose, then verify the
engine still returns the right numbers.

## Method

1. **Export to ONNX and inspect the operators first.** Convert at a fixed opset
   (17 or newer), then run `onnx.checker` and a shape-inference pass. An operator
   TensorRT cannot map falls back to a slow plugin or fails the build, and you
   want that surfaced now, not after a 20-minute engine build.
2. **Get a baseline from `trtexec` before writing builder code.**
   `trtexec --onnx=model.onnx --saveEngine=model.plan` produces a working engine
   and a latency number in one command. Treat it as the bar any custom Python
   builder has to match or beat before it earns its extra complexity.
3. **Set precision against a stated accuracy budget.** FP16 is the safe default
   and rarely moves accuracy. INT8 is smaller and faster but needs a calibration
   set of 100 to 1000 representative samples to fit per-tensor scales. FP8 on
   Hopper sits between them: measure the drop, do not assume it.
4. **Give every dynamic axis an optimization profile.** Specify min, opt, and max
   for each variable dimension, for example batch min=1, opt=8, max=32. TensorRT
   tunes kernels for the opt shape, so set opt to your common case, not the range
   midpoint. A runtime shape outside min-max is rejected outright.
5. **Grant workspace so the tactic search can breathe.** Pass a generous
   `--memPoolSize=workspace:4096` so the builder can try more kernel tactics. Too
   little workspace silently narrows the search and leaves a faster fused kernel
   undiscovered, which costs latency you never see itemized.
6. **Confirm fusion and precision in the engine inspector.** Dump the engine
   layers and check that the fusions you expected fired and that INT8 layers did
   not revert to FP32. A fusion that did not happen is build time you spent for a
   speedup you did not receive.
7. **Diff engine outputs against the framework on real inputs.** Run the same
   batch through PyTorch and the engine, compare within a tolerance (atol near
   1e-2 for FP16, looser for INT8), and check the task metric. Numeric closeness
   is necessary; a held-out accuracy number is the gate that actually matters.

## Litmus tests

- Does the engine meet the latency floor on the target GPU, not a proxy card?
- Do the profile min and max shapes cover every batch size production sends?
- For INT8, was calibration data representative and accuracy measured, not hoped?
- Did the inspector confirm the intended fusions and precision truly applied?

## Boundaries

This builds and validates one engine for one GPU family, and engines do not port
across architectures, so rebuild per target. Serving the engine, fanning
requests, and version routing belong to triton-inference-server. Continuous
batching and KV-cache scheduling for LLMs live in inference-serving-optimization.
