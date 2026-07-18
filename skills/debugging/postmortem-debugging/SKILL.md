---
name: postmortem-debugging
description: Reconstruct what happened from the artifacts a dead incident left behind: logs, metrics, dumps, and a timeline, when there is no live system left to poke. Use when the outage is over, the process is gone, and all you have is what was written down while it burned.
---

# Postmortem debugging

By the time you are called, the fire is out. The bad node was recycled, the
process that hung is gone, and rerunning proves nothing because the conditions
have passed. All that survives is what the system happened to record. The job
is to reconstruct a causal story from cold artifacts, knowing you cannot ask
the system a single new question.

## Method

1. **Build the timeline before forming any theory.** Pull logs, metrics,
   deploy events, and alerts into one time-ordered view, all in a single
   timezone, usually UTC. Fix the moment of first impact from the earliest
   symptom, not the first alert, which often fires minutes late. The sequence
   constrains cause: nothing after the first symptom caused it.
2. **Separate the trigger from the cause.** The deploy at 14:02 may be the
   trigger, but the latent bug it exposed is the cause. Ask what changed just
   before first impact, config, traffic, a dependency, and what condition made
   that change fatal when the same change was harmless yesterday.
3. **Mine the artifacts for the state you cannot query live.** A heap or core
   dump captured during the incident still yields a backtrace and variable
   values under `gdb` or the runtime's dump tool. Metrics show the shape:
   memory climbing to a ceiling, a thread pool pinned at max, error rate
   stepping up at a specific minute. Read them as the frozen state they are.
4. **Correlate across signals to place the failure.** Line up the latency
   spike with the GC log, the error burst with the deploy marker, the
   saturation with the traffic curve. A cause leaves a coincident signature in
   more than one place; a single suspicious line that nothing else corroborates
   is usually a symptom, not the origin.
5. **Distinguish absence of evidence from evidence of absence.** A missing log
   can mean the event did not happen or that the process died before flushing,
   or that sampling dropped it. Note which signals you would expect and did
   not get, and treat a silent gap right before the crash as itself a clue
   rather than a dead end.
6. **Write the reproduction hypothesis the artifacts support, then test it
   offline.** State the specific sequence you believe occurred and the one
   condition that made it fatal. Try to reproduce it in a controlled
   environment; a story that cannot be reproduced from the stated preconditions
   is not yet a root cause, only a plausible narrative.

## Checks

- Does the timeline place first impact before every candidate cause?
- Does the root cause show a coincident signature in at least two signals?
- Could someone reproduce the failure from the preconditions you wrote down?

## Boundaries

Postmortem work is bounded by what was recorded: if the logging level was too
coarse or the dump was never captured, the answer may be permanently out of
reach, and the honest output is a ranked set of hypotheses plus the
instrumentation to add before next time. Live faults you can still touch
belong to interactive debugging, which can ask new questions this one cannot.
