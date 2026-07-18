---
name: reproduction-first
description: Build a reliable, minimal reproduction before you write a fix so you can prove the bug is actually gone. Use when a report is vague, intermittent, or "works on my machine" and you need solid ground under the debugging.
---

# Reproduction first

A fix with no reproduction is a wish. You change a line, the symptom is absent
this run, and you never learn whether you fixed the defect or merely failed to
provoke it. A repro that fails on command turns debugging into a loop with a
red light that you drive to green: build that light before you touch anything.

## Method

1. **Harvest the exact conditions from the report.** Input values, build
   version, OS, locale, environment variables, data state, and the click-by-
   click sequence. Ask for the failing input itself, not a prose summary of it.
2. **Reproduce once in the crudest way that works.** Full app, real data,
   whatever it takes to watch the failure with your own eyes. You cannot
   minimize a failure you have never actually seen happen.
3. **Nail down every source of nondeterminism.** Seed the RNG, freeze the clock
   with a library like `freezegun` or `libfaketime`, fix timezone and locale,
   disable retries. If it fails one run in twenty, wrap it in a loop of 100 and
   confirm a stable failure rate before trusting any change.
4. **Shrink the input by halving.** Delete half the rows, half the config, half
   the steps, and rerun. If it still fails, cut again; if it recovers, the half
   you removed held the trigger, so restore it and cut the other side.
5. **Amputate dependencies until only the fault is left.** Swap the database
   for a literal, the network call for a recorded fixture, the framework for a
   plain function. The target is the smallest script that still fails.
6. **Freeze the repro as a failing test.** Encode the expected output as an
   assertion. The reproduction is now permanent, runs in seconds, and becomes
   the regression guard the instant it flips green.
7. **Confirm it fails for the right reason.** Read the assertion message. A
   test that trips on a typo in its own setup rather than on the bug will lie to
   you the moment you rely on it.

## Checks

- Can you make the failure appear ten times out of ten from a cold start?
- Is the reproduction small enough to paste into a ticket in full?
- Does the failing message name the real defect, not a fixture mistake?

## Boundaries

Some faults need production scale or data you cannot mirror locally. Capture
the tightest repro you can, write down what stays unreproducible, and lean on
heisenbugs tactics for the timing-dependent remainder.
