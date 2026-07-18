---
name: tensorrt-optimization
description: Compile a trained model into a fast TensorRT engine by choosing precision, defining dynamic shape profiles, and validating that fused kernels preserved accuracy. Use when a PyTorch or ONNX model must hit a hardware-specific latency floor and eager execution is too slow.
---

# TensorRT optimization

TensorRT turns a framework graph into a hardware-specific engine: it fuses
layers, picks kernels by benchmarking on your exact GPU, and runs reduced
precision on Tensor Cores. The speedup is real, often 2x to 5x over eager
PyTorch, but the engine is a black box that can silently lose accuracy or refuse
your input shapes. The method is to control precision and shapes deliberately,
then prove the engine still computes the right answer.

## Method

1. **Export to ONNX first and check the operators.** Convert with a fixed
   opset (17 or later) and run `onnx.checker` plus a shape inference pass. An op
   TensorRT cannot handle falls back to slow plugin code or fails the build, so
   catch it here, not after a 20-minute engine build.
2. **Build with `trtexec` before writing any builder code.** `trtexec
   --onnx=model.onnx --saveEngine=model.plan` gives you a working engine and a
   latency number in one command. Use it as the baseline that any custom Python
   builder must beat or match.
3. **Choose precision against your accuracy budget.** FP16 is the safe default
   on most GPUs and rarely moves accuracy. INT8 is faster and smaller but needs
   a calibration set of 100 to 1000 representative samples to fit per-tensor
   scales. FP8 on Hopper and later sits between them: measure, do not assume.
4. **Define an optimization profile for every dynamic dimension.** Give each
   variable axis a min, opt, and max shape (for example batch min=1, opt=8,
   max=32). TensorRT tunes kernels for the opt shape, so set opt to your common
   case, not the midpoint. Inputs outside min-max are rejected at runtime.
5. **Set the workspace and let the builder tactic-search.** Grant a generous
   `--memPoolSize=workspace:4096` so the builder can try more kernel tactics.
   More workspace can find a faster fused kernel; too little quietly narrows the
   search and leaves speed unclaimed.
6. **Verify layer fusion and precision in the engine inspector.** Dump the
   engine layers and confirm the fusions you expected happened and that INT8
   layers did not silently revert to FP32. A fusion that did not fire is latency
   you paid the build for and did not get.
7. **Diff engine outputs against the framework on real inputs.** Run the same
   batch through PyTorch and the engine, compare with a tolerance (for example
   atol 1e-2 for FP16, looser for INT8), and eyeball task metrics. Numeric
   closeness is necessary; a held-out accuracy check is the real gate.

## Litmus tests

- Does the engine meet the latency floor on the target GPU, not a proxy card?
- Do your profile min and max shapes cover every batch size production sends?
- For INT8, was calibration data representative and accuracy checked, not assumed?
- Did the inspector confirm the intended fusions and precision actually applied?

## Boundaries

This produces and validates one engine for one GPU family; engines are not
portable across architectures, so rebuild per target. Serving the engine, fanning
requests, and version routing belong to triton-inference-server. Continuous
batching and KV-cache scheduling for LLMs live in inference-serving-optimization.
