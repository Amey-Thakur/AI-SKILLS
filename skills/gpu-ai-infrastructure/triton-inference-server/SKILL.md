---
name: triton-inference-server
description: Deploy models on NVIDIA Triton with a valid model repository, ensemble pipelines, and concurrent execution tuned to keep the GPU saturated. Use when serving one or more models through Triton and configuring layout, dynamic batching, instance groups, or a preprocess-plus-inference pipeline.
---

# Triton Inference Server

Triton serves models from many frameworks behind one API, and it is unforgiving:
a repository with the wrong directory shape or a mismatched config simply fails
to load, with a terse message. Get the layout and `config.pbtxt` right and you
earn dynamic batching, several model instances per GPU, and ensembles that stitch
preprocessing to inference on the server. This skill is that configuration work,
not the training of the models it hosts.

## Method

1. **Build the repository in the exact shape Triton reads.** Each model is a
   directory with `config.pbtxt` and numbered version folders (`1/`, `2/`) that
   hold the artifact: `model.plan` for TensorRT, `model.onnx` for ONNX, `model.pt`
   for TorchScript. A wrong filename or a missing version folder means the model
   never loads and barely says why.
2. **Declare the tensor contract in `config.pbtxt`.** Name every input and output
   with its data type and dims, using -1 for dynamic axes, and set the backend
   (`tensorrt`, `onnxruntime`, `python`, `pytorch`). Triton checks each request
   against this contract, so it must match the engine exactly.
3. **Switch on dynamic batching to fill the GPU.** Add a `dynamic_batching` block
   with `preferred_batch_size` and a `max_queue_delay_microseconds` around 100 to
   1000. Triton then merges concurrent single requests into one batch, trading a
   little queue delay for throughput on batch-friendly models.
4. **Raise concurrency with instance groups.** Set `instance_group` count above 1
   so multiple copies of a model run on one GPU and a second request executes
   while the first waits on memory. Add instances until VRAM or compute saturates;
   size it to the card, not to a hopeful default.
5. **Put host-side preprocessing in a Python backend model.** Implement
   tokenization or image resize in a `python` backend with a `model.py` that
   defines `execute`. Clients then send raw inputs, host work moves into the
   server, and the stage becomes reusable inside an ensemble.
6. **Chain stages with an ensemble, not client glue.** Define an `ensemble` model
   whose `ensemble_scheduling` wires one stage's output tensor to the next
   stage's input. Preprocess, infer, and postprocess run as a single server call,
   cutting round trips and keeping intermediate tensors on the device.
7. **Load-test with perf_analyzer and read utilization beside latency.** Run
   `perf_analyzer -m <model> --concurrency-range 1:16` and watch throughput, p99
   latency, and GPU utilization together. The numbers tell you whether to add
   instances, widen batching, or stop because the card is already full.

## Signals

- Does `curl localhost:8000/v2/health/ready` report ready with every model up?
- Does each `config.pbtxt` tensor spec match the engine's real inputs and outputs?
- Under perf_analyzer load, does GPU utilization climb toward saturation?
- Does the ensemble return the final output in one request, no client stitching?

## Boundaries

This governs Triton deployment and its config surface. Producing the engine
Triton loads is tensorrt-optimization; LLM-specific continuous batching and KV
scheduling are better handled by vllm-serving or inference-serving-optimization.
Kubernetes autoscaling and ingress in front of Triton are a platform concern.
