---
name: tensor-core-utilization
description: Get matrix multiplies onto the tensor cores by fixing shapes, precision, and alignment, then measure that the cores actually fired. Use when a GEMM or attention kernel runs far below the card's advertised throughput and you suspect it fell back to the CUDA cores.
---

# Tensor core utilization

Tensor cores perform a small matrix multiply-accumulate per instruction and
supply most of a modern GPU's FLOPs, but only when shapes, dtype, and alignment
let the library dispatch to them. A GEMM that looks healthy can quietly run on
the slower FP32 CUDA cores at a fraction of peak because one dimension is odd or
the inputs are the wrong precision. The job is to satisfy the dispatch
conditions and then confirm the cores lit up.

## Method

1. **Feed the shapes the MMA units want.** The units work on fixed tiles, so keep
   M, N, and K multiples of 8 for FP16 and BF16, and multiples of 16 for INT8.
   On A100 and newer, cuBLAS is happiest when all three are multiples of 16. Pad
   a dimension like 4095 up rather than leaving it odd.
2. **Use a precision the cores accept.** Tensor cores run FP16, BF16, TF32,
   INT8, and FP8 on Hopper, not plain FP32. On Ampere and later, enable TF32
   (`torch.backends.cuda.matmul.allow_tf32 = True`) so existing FP32 matmuls
   dispatch to tensor cores with minimal accuracy loss. Prefer BF16 for training
   because of its wider exponent range.
3. **Align pointers and leading dimensions.** Best throughput needs inputs
   aligned to 16 bytes, and cuBLASLt prefers leading dimensions that are
   multiples of 8 elements. Misaligned or non-contiguous tensors force a slower
   path or extra copies; avoid slicing that produces unaligned views into the
   matmul.
4. **Let the library choose the kernel, then pin it.** cuBLAS and CUTLASS ship
   tuned tensor-core kernels. Enable autotuning
   (`torch.backends.cudnn.benchmark = True` for fixed shapes) so it picks the
   best tile, and cache that choice for stable shapes instead of re-searching
   every step.
5. **Measure that tensor cores actually ran.** Do not assume. In Nsight Compute
   read `sm__pipe_tensor_op_hmma.avg.pct_of_peak_sustained_active`; near zero
   means the work fell to CUDA cores. Across a cluster, watch the DCGM field
   `DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`. A profiler trace showing kernels named
   `s16816gemm` or `cutlass...tensorop` also confirms the path.
6. **Raise arithmetic intensity so the cores stay fed.** Tensor cores are fast
   enough that many GEMMs turn memory-bound. Fuse the epilogue (bias,
   activation) into the GEMM, batch small matmuls together, and increase tile
   reuse so HBM bandwidth is not the ceiling that hides the compute you unlocked.

## Checks

- Does the tensor-pipe utilization metric sit well above zero for the target
  kernel?
- Are M, N, and K all multiples of 8 (16 for INT8), with any odd dimension
  padded?
- Are the inputs a tensor-core dtype (FP16, BF16, TF32, INT8, FP8), not FP32?
- Does measured TFLOP/s approach a real fraction of the card's tensor-core peak,
  not its FP32 peak?

## Boundaries

This covers making matmul-shaped work reach the tensor cores and confirming it.
The numerical safety of running in FP16 or BF16 (loss scaling, overflow) is
mixed-precision-deployment; INT8 calibration and accuracy gates are
quantization-deployment. Shapes fixed by model architecture may resist padding,
which is a modeling trade-off, not a kernel fix.
