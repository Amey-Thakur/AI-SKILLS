---
name: onnx-export-pipelines
description: Export a trained model to ONNX that runs portably across runtimes, closing operator gaps and proving numeric parity against the source framework. Use when a PyTorch or TensorFlow model must run outside its training stack and the export must be trusted, not just produced.
---

# ONNX export pipelines

Exporting to ONNX looks like a one-line call and behaves like a translation
between two languages that do not share every word. The tracer records one path
through your code, unsupported operators fall back or fail, and dynamic shapes
silently freeze to whatever the example input had. A clean export that computes
different numbers is worse than no export, so the work is conversion plus proof.

## Method

1. **Pin the opset and export with explicit dynamic axes.** Call
   `torch.onnx.export` (or the dynamo exporter) with a fixed `opset_version` of
   17 or later, and name every variable dimension in `dynamic_axes`, typically
   batch and sequence. An unnamed axis bakes the trace-time size in and rejects
   every other shape at inference.
2. **Validate the graph before running it.** Run `onnx.checker.check_model`,
   then `onnx.shape_inference.infer_shapes` to confirm shapes propagate end to
   end. Simplify with `onnxsim` to fold constants and remove dead nodes so the
   graph the runtime sees matches the model you meant to ship.
3. **Hunt the operator gaps early.** List the op set in the graph and diff it
   against the target runtime's supported operators for that opset. Watch for
   `aten::` leftovers, custom CUDA ops, and control flow that traced into a fixed
   branch. A missing op means a plugin, a rewrite, or a decomposition, decided now.
4. **Kill data-dependent shapes and Python control flow.** Anything that
   branches on tensor values, like `.item()`, boolean indexing, or a Python
   `if` on a shape, traces to one path. Replace it with `torch.where`, masking,
   or `torch.onnx` scripting so the exported graph handles the inputs the trace never saw.
5. **Run parity against the source framework on real inputs.** Feed identical
   batches to the framework and to ONNX Runtime, then
   `np.testing.assert_allclose` with rtol 1e-3 and atol 1e-5 for FP32. Loosen for
   FP16, and check task metrics too: close logits still let argmax flip a label.
6. **Test on the execution provider you will deploy, not just CPU.** Parity on
   the CPU provider hides kernel differences in the CUDA and TensorRT providers.
   Run the same parity check under `CUDAExecutionProvider`, since that is the
   numeric path production takes.
7. **Freeze golden inputs and outputs as a regression test.** Save a few input
   tensors and their verified outputs, and re-run parity on every re-export. A
   framework or opset bump can shift a fused kernel, and this test is what turns
   a silent drift into a failed build.

## Checks

- Does the exported model accept every batch and sequence length production sends?
- Did shape inference and `onnx.checker` both pass with no `aten::` ops left?
- Does ONNX Runtime match the framework within tolerance on the deployment provider?
- Do the saved golden outputs still hold after the latest re-export?

## Boundaries

This produces a portable, parity-checked ONNX graph, not a tuned engine.
Compiling that graph for a specific GPU with precision and shape profiles is
tensorrt-optimization; serving it belongs to triton-inference-server. When an
operator has no ONNX equivalent, whether to write a plugin or change the model
is an architecture call this skill only surfaces.
