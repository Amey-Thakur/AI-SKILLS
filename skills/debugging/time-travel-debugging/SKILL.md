---
name: time-travel-debugging
description: Record an execution once and replay it deterministically so you can step backward to the moment a value went wrong. Use when a bug is hard to reproduce or the failure surfaces long after its cause, and rerunning changes the outcome.
---

# Time-travel debugging

The hardest bugs are the ones where the crash is far downstream of the cause:
a field is corrupted at step three and blows up at step three hundred. A live
debugger can only step forward, so you rerun and hope to catch it. Recording
the run once and replaying it lets you set a breakpoint on the corruption and
run the clock backward to who wrote it.

## Method

1. **Record the failing run so replay is bit-for-bit identical.** `rr record
   ./app` captures every non-deterministic input, thread schedule, syscall
   result, signal, so `rr replay` reproduces the exact same execution every
   time. The intermittent bug becomes a fixed recording you can study without
   fear of it not happening again.
2. **Set a watchpoint on the corrupted value, then reverse.** Once replay
   stops at the symptom, `watch -l corrupted_field` and `reverse-continue`
   runs backward until the last write to that address. This is the move a
   forward debugger cannot make: you jump straight to the writer instead of
   guessing which of three hundred steps did it.
3. **Bisect the timeline, not the code.** A deterministic recording has
   stable event numbers. When you know the value is good at one point and bad
   at another, `reverse-continue` and `continue` between them narrow the write
   to a single instruction the way `git bisect` narrows a commit.
4. **For front-end state, replay through the action log.** Redux DevTools
   records every dispatched action and lets you step through them, jump to any
   past state, and see the diff each action produced. The corrupted store is
   traced to the exact action and reducer, and "time-travel" replays the
   sequence without clicking through the UI again.
5. **Pin down non-determinism the recorder cannot capture.** `rr` serializes
   threads, but true external sources, wall-clock time, random seeds, network
   responses, still vary unless you stub them. Seed the RNG, inject a fixed
   clock, and record with those pinned so the replay is genuinely
   reproducible and not merely usually so.
6. **Confirm the cause by editing and re-recording, not by editing replay.** A
   replay is read-only history: you cannot fix it in place. Change the source,
   record a fresh run, and verify the write no longer corrupts the value.
   Reasoning that never leaves the old recording proves nothing about the fix.

## Litmus tests

- Does replay reproduce the failure on every run, not just sometimes?
- Did reverse execution land you on the instruction that wrote the bad value?
- Is every non-deterministic input either captured by the recorder or stubbed?

## Boundaries

Recording adds overhead and, for `rr`, needs specific hardware performance
counters, so it does not run everywhere or under heavy production load. It
shines on single-machine, CPU-bound bugs; a fault that only appears across
distributed services belongs to tracing, which follows one request across
hosts rather than replaying one process.
