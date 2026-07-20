---
name: unsafe-code-review
description: Audit unsafe blocks by verifying documented invariants, minimizing surface, and testing under sanitizers and Miri. Use when reviewing unsafe Rust, C/C++ interop shims, or any code that bypasses language safety.
---

# Unsafe code review

An unsafe block is a proof obligation transferred from the compiler to
the author. The review's job is to check the proof: what invariant
justifies this, is it written down, and does the safe wrapper make it
impossible for callers to break.

## Method

1. **Demand the SAFETY comment before reading the code.** Every
   `unsafe` block/fn carries a `// SAFETY:` comment stating the
   invariants relied on (non-null, aligned, initialized, unique
   access, valid for lifetime, in-bounds) and why they hold *here*.
   Missing comment: review stops; the author reconstructs the
   argument or discovers there is none. Vague comment ("this is
   fine"): same.
2. **Shrink the unsafe surface first.** The block should span the
   minimal expressions needing it, wrapped in a safe API whose type
   signature makes misuse unrepresentable (slices carry bounds,
   newtypes carry validity; see api-surface-minimalism). Reject
   unsafe spread through business logic: the module boundary is
   where safety gets re-established, and everything outside it must
   be un-crashable no matter what callers do.
3. **Check the classic holes systematically.** Bounds and alignment
   on raw pointer arithmetic; lifetime laundering (`transmute`,
   pointer-to-reference casts outliving the source); aliasing
   violations (constructing `&mut` while `&` lives; Stacked-Borrows
   territory); uninitialized memory (`MaybeUninit` misuse); panic
   safety (an unwind mid-invariant leaving corrupted state);
   Send/Sync impls asserted without a threading argument (see
   race-conditions).
4. **Verify FFI contracts on both sides.** Signatures match the C
   header exactly (types, ownership, who frees; see ffi-boundaries),
   error codes translated, callbacks' unwind behavior contained
   (panic across FFI is UB: catch at the boundary). The foreign
   library's documented preconditions join the SAFETY comment.
5. **Test with the UB-detecting tools, in CI.** Miri on the unsafe
   modules' test suite (catches UB tests "pass" through), ASan/TSan
   builds where Miri cannot reach (FFI, threads; see c-memory-safety),
   and fuzzing on any unsafe parser surface (see fuzz-testing).
   A sanitizer-clean run is evidence, not proof; the written
   invariant argument remains the primary artifact.
6. **Gate merges on justification, not cleverness.** The PR states
   why safe alternatives fail (measured performance, FFI necessity,
   a primitive the std lacks); "faster, probably" gets a benchmark
   or a rejection (see benchmark-design). Track unsafe blocks in an
   inventory (grep-able, `#[deny(unsafe_op_in_unsafe_fn)]`,
   cargo-geiger-style reports) so the surface trends down, not up.

## Boundaries

- This review assures memory/UB safety, not logical correctness or
  security of the design (see security-code-review for that lens).
- Miri and sanitizers explore executed paths only; invariants
  depending on untested configurations (feature flags, targets)
  need per-configuration runs or stronger static argument.
- Rewriting a hot unsafe module in safe code with 3% cost is usually
  the better review outcome than perfecting the proof; recommend it
  when the numbers allow (see rewrite-vs-refactor).
