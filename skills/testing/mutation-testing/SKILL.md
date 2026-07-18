---
name: mutation-testing
description: Measure how strong a test suite is by mutating the code and checking the tests notice, exposing assertions that never actually fail. Use when coverage is high but you doubt the tests would catch a real regression.
---

# Mutation testing

Line coverage tells you a line ran, not that a test would fail if the line
were wrong. Mutation testing closes that gap: a tool makes small changes to
the code, flips a `<` to `<=`, replaces a return with a constant, deletes a
call, then reruns the suite. A mutant the tests kill proves they guard that
behavior. A mutant that survives is a hole coverage could not see, a line
executed but never truly asserted.

## Method

1. **Run a mutation tool for your stack.** Stryker for JavaScript and C#, PIT
   for the JVM, mutmut or cosmic-ray for Python, cargo-mutants for Rust. Point
   it at the module whose tests you distrust, not the whole repo on the first
   pass.
2. **Read the mutation score as a diagnostic, not a target.** The score is
   killed mutants over total. Chasing 100% burns effort on equivalent
   mutants, changes that cannot alter behavior. Treat survivors as a reading
   list, not a number to maximize.
3. **Kill survivors by strengthening assertions.** A survivor usually means a
   test ran the line but asserted nothing about its effect. Add the assertion
   that pins the boundary the mutant moved, for instance `<=` versus `<` at a
   threshold.
4. **Recognize equivalent mutants and move on.** Some mutants leave behavior
   identical: reordering commutative operations, a timeout the tests cannot
   observe. Mark them ignored with a reason rather than contorting a test to
   kill something untestable.
5. **Scope runs to survive the cost.** Mutation testing reruns the suite once
   per mutant and is slow. Restrict it to changed files in CI with a
   `--since` diff mode, or run a full sweep on a schedule against critical
   modules.
6. **Gate only the code that matters.** For a payment or auth core, fail the
   build when new survivors appear. Elsewhere, run it periodically to find
   rotted tests instead of blocking every commit.

## Signals

- Do surviving mutants cluster on branches the team assumed were tested?
- After you kill a survivor, does the new assertion fail if you reintroduce
  the original bug by hand?
- Is the runtime scoped so mutation testing informs work rather than blocking
  it?

## Boundaries

Mutation testing grades an existing suite, it does not write tests or choose
what to cover: pair it with unit-test-design to fill the holes it finds.
Equivalent mutants and runtime cost make it a periodic audit for critical
code, not a gate on every file.
