---
name: fuzz-testing
description: Fuzz a parser or protocol handler with a coverage-guided fuzzer, seed the corpus with real inputs, and triage crashes to unique root causes. Use when code consumes untrusted or complex bytes and hand-written cases cannot reach the states that break it.
---

# Fuzz testing

A parser trusts its input more than it should. Your cases cover the shapes you
imagined; the crash lives in the ones you did not: the length prefix that lies,
the header truncated mid-field, the structure nested past every buffer. A
coverage-guided fuzzer mutates bytes and follows the branches they open,
reaching states no hand-written test would ever assemble. The work is seeding a
good corpus and turning crashes into fixed bugs.

## Method

1. **Write a harness that maps a byte buffer to one entry point.** Expose a
   single target that feeds raw bytes straight to the parser: `fuzz_target!`
   for cargo-fuzz, `f.Fuzz(func(t, b []byte))` in Go, or `TestOneInput` under
   Atheris. Keep it deterministic and free of global state so any crash
   reproduces from the input alone.
2. **Build with sanitizers so silent corruption becomes a crash.** Compile
   with `-fsanitize=address,undefined`; without AddressSanitizer a heap
   overflow can pass unnoticed and return quietly wrong output the fuzzer never
   flags.
3. **Seed the corpus with real, valid samples.** Drop a genuine PNG, a captured
   protocol frame, or a known-good document into the corpus directory. The
   mutator needs valid structure to work from, and a `-dict=` of magic bytes
   carries it past format gates it would never guess.
4. **Add a round-trip or grammar oracle where mutation stalls.** Assert that
   `parse(serialize(parse(x)))` is stable, or generate through a grammar or
   protobuf mutator, so inputs stay near-valid and exercise deep semantics
   instead of tripping the checksum at the top.
5. **Triage each crash to one root cause.** A single bug spawns many crashing
   inputs. Minimize with `-minimize_crash` or `cargo fuzz tmin`, then group by
   the top sanitizer frame, and fix per distinct defect rather than per file.
6. **Commit the minimized reproducer as a regression seed.** Save the reduced
   bytes into the corpus and a unit test so the fixed crash runs on every
   build. Keep long mutation campaigns in a nightly or OSS-Fuzz stage, not the
   per-commit suite.

## Checks

- Does a fresh crash reproduce from the saved input with no fuzzer running?
- Do the corpus seeds parse cleanly, giving the mutator real structure to work?
- Are sanitizers on in the fuzz build, so an out-of-bounds read fails loudly?

## Boundaries

Fuzzing finds crashes, hangs, and memory errors, not logic bugs where the
process survives but the answer is wrong; pair it with property-based-testing
for those. It suits code that eats untrusted or complex input: decoders,
deserializers, protocol handlers. Business logic with a narrow typed input space
rarely repays the harness.
