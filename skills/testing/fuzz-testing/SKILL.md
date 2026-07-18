---
name: fuzz-testing
description: Feed a parser or protocol handler mutated inputs from a coverage-guided fuzzer, then triage crashes to unique root causes. Use when code parses untrusted or complex input and hand-written cases cannot cover the input space.
---

# Fuzz testing

A parser trusts its input more than it should. The cases you wrote cover the
shapes you imagined, and the crash is always in the byte sequence you did not:
the truncated header, the length field that lies, the structure nested ten
levels deep. A coverage-guided fuzzer mutates inputs and follows the branches
they open, reaching states no hand-written test would ever construct.

## Method

1. **Write a harness that maps a byte buffer to one entry point.** The target
   takes raw bytes and feeds them straight to the parser: `LLVMFuzzerTestOneInput`,
   Go's `f.Fuzz(func(t, b []byte))`, or Atheris's `TestOneInput`. Keep it
   deterministic and global-state-free so any crash reproduces from input alone.
2. **Build with sanitizers so silent corruption becomes a crash.** Compile with
   `-fsanitize=address,undefined`; without AddressSanitizer a heap overflow can
   pass unnoticed. In memory-safe languages, assert invariants and round-trips
   so logic faults surface instead of returning quietly wrong output.
3. **Seed the corpus with real, valid inputs.** Drop genuine files or packets
   into the corpus directory. The fuzzer mutates from these, reaching deep code
   in minutes instead of days, and a `-dict=` of keywords and magic bytes helps
   it past format gates it would never guess.
4. **Add a structure-aware or round-trip oracle.** Assert that
   `parse(serialize(parse(x)))` is stable, or derive `Arbitrary` or a grammar so
   mutations stay near-valid and exercise the semantics rather than tripping the
   length check at the top of the function.
5. **Triage each crash to a unique root cause.** One bug produces many crashing
   inputs. Minimize with `-minimize_crash`, then group by the top sanitizer
   frame or a stack hash. Fix per distinct defect, not per crashing file.
6. **Commit the minimized reproducer as a regression seed.** Save the reduced
   bytes into the corpus and a unit test so they run on every build. Run the
   corpus as a fast non-mutating pass in CI, and reserve long mutation runs for
   nightly or OSS-Fuzz.

## Checks

- Does a fresh crash reproduce from the saved input alone, with no fuzzer running?
- Is the corpus minimized so each entry adds coverage, not a duplicate path?
- Are sanitizers on in the fuzz build, so an out-of-bounds read fails instead
  of returning garbage?

## Boundaries

Fuzzing targets code that parses untrusted or complex input: decoders,
protocol handlers, deserializers. It is wasteful on business logic with a
small typed input space, where property-based-testing fits better. Long
campaigns belong in a nightly or OSS-Fuzz stage, not the per-commit suite.
