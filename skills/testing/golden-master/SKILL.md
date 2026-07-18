---
name: golden-master
description: Capture the current output of untested legacy code as a recorded baseline so a refactor can prove it changed nothing. Use when about to restructure code whose behavior you must preserve but cannot yet specify.
---

# Golden master testing

Legacy code with no tests but load-bearing behavior is the hardest thing to
change safely: you cannot assert what it should do, only what it does today.
A golden master, also called a characterization test, records the current
output across a wide range of inputs and then fails the instant a refactor
shifts any of it. It buys you a safety net before you touch the wiring.

## Method

1. **Find a seam that captures observable output.** Pick the widest boundary
   whose result is deterministic: a function return, a rendered file, a
   serialized response. If output depends on the clock, database, or network,
   pin those first with fixed seeds and fakes.
2. **Generate a broad input corpus.** Replay real production samples, sweep
   parameter ranges, and add seeded random inputs. Aim for coverage of the
   branches you are about to disturb, not a tidy handful. Ten thousand cases
   is normal here, not excessive.
3. **Record the baseline once and commit it.** Run the current code over the
   corpus, write every output to a file, and commit it as the master. This
   snapshot is the specification you did not have, warts included.
4. **Diff every run against the committed master.** The test recomputes
   output over the same corpus and compares byte for byte. A tool like
   TextTest, ApprovalTests, or a plain `diff` in CI reports the first
   mismatch as a failure.
5. **Refactor in small steps and rerun after each.** Extract a method, run
   the master; rename a variable, run the master. A green diff after each
   step means the change was behavior-preserving. A red one localizes the
   mistake to the last edit.
6. **Investigate every diff before re-recording.** A changed output is a
   claim that behavior moved. Confirm the change is intended and correct,
   then regenerate the master deliberately. Blindly re-recording to get green
   throws away the entire safety net.
7. **Retire the master as real tests arrive.** Once you understand a branch
   well enough to write a named behavioral test, write it and shrink the
   corpus. The golden master is scaffolding, not the finished suite.

## Checks

- Does the master fail if you invert a single condition in the code under
  test? If not, the corpus does not exercise that path.
- Is every source of nondeterminism pinned, so two clean runs produce
  identical output?
- Can a reviewer see exactly which inputs changed output when a diff appears?

## Boundaries

Golden masters preserve behavior; they do not judge whether that behavior is
correct. They lock in existing bugs on purpose. Once the code is understood,
defer to unit-test-design and approval-testing for tests a human can read and
reason about.
