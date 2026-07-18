---
name: test-flakiness-budget
description: Cap flaky tests with a measured budget, quarantine them off the merge gate, and burn them down under named owners and deadlines. Use when re-runs are how the team gets green and no one owns the flakes.
---

# Test flakiness budget

A flaky test that everyone re-runs until it passes has quietly stopped gating
anything, and each new one erodes trust in the whole suite until real
failures get re-run away too. The fix is not heroics on each flake but a
system: measure the rate, quarantine on sight, and hold every quarantined
test to an owner and a deadline. Treat the flake count as a debt with a
ceiling.

## Method

1. **Measure the flake rate and set a budget.** A test that passes and fails on
   the same commit is flaky. Track flips per run and set a ceiling, for example
   under 0.1 percent of test runs flaky. That number is the line that triggers
   action.
2. **Quarantine the moment a test flakes.** Auto-tag it (`@flaky`, a skip-list,
   a JUnit category) so it drops out of the merge gate but keeps running and
   reporting. Data accrues while it stops blocking honest merges.
3. **Attach an owner and a deadline to every quarantine.** No test enters
   quarantine without a ticket, a named owner (usually the last author or the
   code owner), and an expiry, commonly two weeks. An anonymous quarantine is
   permanent by default.
4. **Cap the quarantine size and stop the line when it fills.** Set a hard
   limit, say 10 tests. Cross it and no new features merge until the count
   comes down. This turns flakiness into a shared cost, not a slow private
   leak.
5. **Burn down by fixing or deleting, never by ignoring.** Route each
   quarantined test through flaky-test-diagnosis to make it deterministic, or
   delete it if it guards nothing worth the noise. A test that cannot be made
   reliable and cannot be justified is dead weight.
6. **Auto-expire past the deadline.** A quarantined test that blows its expiry
   gets deleted by a scheduled job, not silently renewed. Deletion is honest:
   the coverage was already zero while the test sat skipped.

## Signals

- Can you name the owner and deadline for every currently quarantined test?
- Is the flake rate a tracked, published number rather than a shared feeling?
- Does the quarantine list shrink week over week, or has it become a graveyard?

## Boundaries

This is the process around flakes, not the diagnosis of any one: making a
specific test deterministic belongs to flaky-test-diagnosis, and fixing races
in the code under test to race-conditions. The exact budget and quarantine
limits are a team decision; adopt whatever the project already tracks rather
than imposing new counters.
