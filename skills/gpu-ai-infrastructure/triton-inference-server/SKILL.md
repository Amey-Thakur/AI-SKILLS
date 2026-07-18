---
name: triton-inference-server
description: Deploy models on NVIDIA Triton with a correct model repository, ensemble pipelines, and concurrent execution tuned to keep the GPU busy. Use when serving one or more models through Triton and configuring layout, batching, instance groups, or a preprocessing-plus-inference pipeline.
---

# Triton Inference Server

Triton serves models from many frameworks behind one API, but it is strict: a
model repository with the wrong directory shape or a missing config just fails
to load, with a terse error. The payoff for getting the layout and
`config.pbtxt` right is dynamic batching, multiple model instances per GPU, and
ensembles that stitch preprocessing to inference server-side. This skill is
about that configuration, not about training the models it serves.

## Method

1. **Lay the repository out exactly as Triton expects.** Each model is a
   directory holding `config.pbtxt` and numbered version folders (`1/`, `2/`)
   that contain the artifact: `model.plan` for TensorRT, `model.onnx` for ONNX,
   `model.pt` for TorchScript. A wrong filename or a missing version folder
   means the model silently never loads.
2. **Declare inputs, outputs, and backend in `config.pbtxt`.** Name every tensor
   with its data type and dims, using -1 for dynamic axes, and set the backend
   (`tensorrt`, `onnxruntime`, `python`, `pytorch`). Triton validates requests
   against this contract, so it must match the engine exactly.
3. **Turn on dynamic batching to fill the GPU.** Add a `dynamic_batching` block
   with `preferred_batch_size` and a `max_queue_delay_microseconds` (start near
   100 to 1000). Triton then merges concurrent single requests into a batch,
   trading a little queue latency for throughput on batch-friendly models.
4. **Scale concurrency with instance groups.** Set `instance_group` count above
   1 to run multiple copies of a model on one GPU so a second request executes
   while the first waits on memory. More instances raise throughput until VRAM
   or compute saturates; size it against the card, not by wishful default.
5. **Build preprocessing as a Python backend model.** Put tokenization or image
   resize in a `python` backend model with a `model.py` implementing `execute`.
   This moves host-side work into the server so clients send raw inputs, and it
   becomes a reusable stage in an ensemble.
6. **Chain stages with an ensemble instead of client glue.** Define an
   `ensemble` model whose `ensemble_scheduling` maps one stage's output tensor
   to the next stage's input. Preprocess then infer then postprocess runs as one
   server call, cutting round trips and keeping intermediate tensors on device.
7. **Load-test with perf_analyzer and read the utilization.** Run
   `perf_analyzer -m <model> --concurrency-range 1:16` and watch throughput,
   p99 latency, and GPU utilization together. It tells you whether to add
   instances, widen batching, or stop because the card is full.

## Signals

- Does `curl localhost:8000/v2/health/ready` return ready with every model loaded?
- Does each `config.pbtxt` tensor spec match the engine's real inputs and outputs?
- Under perf_analyzer load, does GPU utilization climb toward saturation, not idle?
- Does the ensemble return the final output in one request with no client-side stitching?

## Boundaries

This governs Triton deployment and its config surface. Producing the engine that
Triton loads is tensorrt-optimization; LLM-specific continuous batching and KV
scheduling are better served by vllm-serving or inference-serving-optimization.
Kubernetes autoscaling and ingress around Triton are a platform concern.
