---
name: compilers-and-toolchains
description: Understand what happens between source and running program, so build errors, linking failures, and optimisation surprises become tractable. Use when builds fail obscurely or behaviour differs between debug and release.
---

# Compilers and toolchains

Source becomes a running program through several stages, each with its
own failure modes. Most confusing build problems are a stage boundary:
a preprocessor definition, a missing symbol at link time, or an
optimisation that changed behaviour the code relied on.

## Method

1. **Locate the failing stage first.** Preprocessing, compilation,
   linking, and loading fail differently, and the error message names
   the stage if you know how to read it.
2. **Understand linking as symbol resolution.** Undefined symbol errors
   mean a declaration without a definition; duplicate symbols mean two
   definitions. Both are about what the linker can see.
3. **Know what optimisation is permitted to do.** Reordering,
   inlining, and eliminating code that has no observable effect, which
   is why undefined behaviour produces different results between builds.
4. **Keep debug information even in release builds.** Symbols make
   production stack traces readable and cost only disk (see
   stack-trace-reading).
5. **Understand static versus dynamic linking.** Static builds are
   self-contained and larger; dynamic builds share libraries and can
   fail at load time on a different machine.
6. **Make builds reproducible.** Pinned toolchain versions and no
   embedded timestamps mean the same source produces the same binary,
   which matters for both debugging and supply chain (see
   supply-chain-security).
7. **Read the intermediate output when stuck.** Preprocessed source,
   assembly, and the symbol table answer questions that guessing about
   the compiler cannot.

## Boundaries

Details differ enormously between languages and toolchains. Interpreted
and just-in-time compiled languages have different stages with
analogous problems. Aggressive optimisation exposes undefined behaviour
rather than causing it, so the fix is the code (see c-memory-safety).
