---
name: tensor-core-utilization
description: Get matrix multiplies onto the tensor cores by fixing shapes, precision, and alignment, then measure that the cores are actually active. Use when a GEMM or attention kernel runs far below the GPU's advertised throughput and you suspect it is falling back to the regular CUDA cores.
---

# Tensor core utilization

Tensor cores do a small matrix multiply-accumulate per instruction and deliver
most of a modern GPU's FLOPs, but only when the shapes, dtype, and memory
alignment let the library dispatch to them. A GEMM that looks fine can quietly
run on the slower FP32 CUDA cores at a fraction of peak because one dimension is
odd or the inputs are the wrong precision. The job is to satisfy the dispatch
conditions and then confirm the cores lit up.

## Method

1. **Feed the shapes tensor cores want.** The MMA units work on fixed tiles,
   so keep M, N, and K multiples of 8 for FP16 and BF16, and multiples of 16
   for INT8. On A100 and newer, cuBLAS is most efficient when all three
   dimensions are multiples of 16 (or 32 for best results). Pad small or odd
   dimensions up rather than leaving a dimension like 4095.
2. **Use a precision the cores accept.** Tensor cores run FP16, BF16, TF32,
   INT8, and (on Hopper) FP8, not plain FP32. On Ampere and later, enable TF32
   for FP32 matmuls (`torch.backends.cuda.matmul.allow_tf32 = True`) so
   existing FP32 code dispatches to tensor cores with minimal accuracy loss.
   For training, prefer BF16 for its wider exponent range.
3. **Align the pointers and leading dimensions.** Best throughput needs
   inputs aligned to 16 bytes, and cuBLASLt prefers leading dimensions that are
   multiples of 8 elements. Misaligned tensors force a slower path or extra
   copies. Allocate with the framework's default allocator and avoid slicing
   that produces non-contiguous, unaligned views into the matmul.
4. **Let the library pick the kernel, then pin it.** cuBLAS and CUTLASS
   already contain tuned tensor-core kernels. Enable autotuning
   (`torch.backends.cudnn.benchmark = True` for fixed shapes) so it selects the
   best tile, and cache that choice for stable shapes rather than re-searching.
5. **Measure that tensor cores actually ran.** Do not assume. In Nsight
   Compute read `sm__pipe_tensor_op_hmma.avg.pct_of_peak_sustained_active`
   (or the `sm__ops_path_tensor` metrics); a value near zero means the work
   fell back to CUDA cores. In PyTorch, a profiler trace showing kernels named
   with `s16816gemm` or `cutlass...tensorop` confirms the tensor-core path.
6. **Raise arithmetic intensity so the cores stay fed.** Tensor cores are so
   fast that many GEMMs become memory-bound. Fuse epilogues (bias, activation)
   into the GEMM, batch small matmuls, and increase tile reuse so HBM
   bandwidth is not the ceiling that hides the compute you just unlocked.

## Checks

- Does the tensor pipe utilization metric in Nsight sit well above zero for the target kernel?
- Are M, N, and K all multiples of 8 (16 for INT8), with any odd dimension padded?
- Are the inputs a tensor-core dtype (FP16, BF16, TF32, INT8, FP8), not FP32?
- Does the measured TFLOP/s approach a meaningful fraction of the card's tensor-core peak, not its FP32 peak?

## Boundaries

This covers making matmul-shaped work reach the tensor cores and measuring it.
The numerical safety of running in FP16 or BF16 (loss scaling, overflow) is
mixed-precision-deployment; INT8 calibration and accuracy gates are
quantization-deployment. Shapes dictated by model architecture may resist
padding, which is a modeling trade-off, not a kernel fix.
