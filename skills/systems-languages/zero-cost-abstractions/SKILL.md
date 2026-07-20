---
name: zero-cost-abstractions
description: Verify that abstractions actually compile away by inspecting generated code and measuring, and know the costs that remain. Use when writing performance-critical Rust/C++ or judging whether an abstraction is free.
---

# Zero-cost abstractions

"Zero-cost" is a claim about the optimizer, and the optimizer is a
program with moods. The discipline is trust-but-verify: know which
abstractions reliably vanish, check the generated code when it
matters, and account for the costs that are real but hiding elsewhere.

## Method

1. **Know the reliably-free list.** Iterators/ranges compiled to the
   same loops, newtypes and single-field wrappers, generic
   monomorphized calls, small inlined closures, `Option<&T>`
   niche-optimized to a pointer, RAII with trivial destructors (see
   cpp-raii): these disappear under optimization essentially always.
   Write them without guilt; rewriting them as manual loops is
   pessimization by superstition.
2. **Know the reliably-not-free list.** Dynamic dispatch
   (`dyn Trait`/virtual: indirect call, blocked inlining), heap-
   backed abstractions (`String`, `Vec`, `Box` in hot loops),
   bounds checks the compiler cannot prove away, `shared_ptr`
   refcount traffic, exceptions' happy-path table cost vs cold-path
   explosion, async state machines' size. Each has its place; the
   cost just belongs in the decision (see rust-ownership,
   cpp-raii pointer selection).
3. **Inspect the generated code at the hot spots.** Compiler
   Explorer or `cargo asm`/`objdump` on the specific function:
   check the loop kernel for vectorization (SIMD registers),
   absence of unexpected calls (memcpy, malloc, panics/bounds
   checks), and inlining of the abstraction layers. Ten minutes of
   reading beats a day of guessing; do it for the top functions
   from the profile only (see systems-profiling).
4. **Measure with benchmarks that resist the optimizer.**
   Microbenchmarks with black-box/DoNotOptimize barriers on inputs
   and outputs, realistic data sizes, and comparison against the
   hand-written "no abstraction" version when the claim matters
   (see benchmark-design). If abstract and manual versions produce
   identical assembly, stop optimizing and keep the abstraction.
5. **Mind the costs that ship elsewhere.** Monomorphization
   multiplies code per instantiated type: binary size, instruction-
   cache pressure, and compile time (see bundle-size instincts,
   natively). Where a generic is instantiated many ways on a cold
   path, `dyn`/type-erasure trades a nanosecond for smaller code:
   the right trade off the hot path. Debug-build performance also
   suffers where release is free; games and simulations care (see
   game-performance).
6. **Preserve optimizer-friendliness in the abstraction's design.**
   Expose slices/contiguous data rather than element-at-a-time
   virtual calls; keep closures small and capture-light; give the
   compiler the invariants (assertions, `assume`-style hints,
   iterator adapters that carry length) that let it delete checks.
   Abstractions are free only when they hand the optimizer the same
   information the manual code would have.

## Boundaries

- Generated-code inspection is per-compiler-version evidence;
  pin down regressions with an assembly-diff or benchmark gate in
  CI for the few kernels that justify it, and re-verify on major
  toolchain upgrades.
- This is a hot-path discipline; on cold paths, clarity wins and
  dynamic dispatch's nanoseconds are irrelevant (see
  performance-calibration instincts in perf-calibration).
- Managed runtimes (JIT) shift the analysis: different tools
  (JITWatch, JFR; see jvm-profiling), same verify-don't-assume
  ethic.
