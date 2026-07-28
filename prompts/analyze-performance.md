---
name: analyze-performance
description: Diagnose a performance problem from measurements rather than intuition, and propose the fix with the largest expected return.
variables:
  - "{problem}: what is slow, how slow, and under what conditions"
  - "{measurements}: profiles, traces, query plans, or timings you already have"
settings: "Temperature 0.2."
---

Diagnose this performance problem:

{problem}

Measurements: {measurements}

Follow the performance-optimization method, and query-plan-reading or
profiling-cpu depending on where the time goes.

Produce:
- What the measurements actually show, distinguished from what they
  suggest.
- The likely bottleneck, with the evidence for it.
- What to measure next if the evidence is insufficient.
- Candidate fixes ranked by expected improvement against effort.
- The expected magnitude of each, so it can be checked afterwards.

Rules: do not propose optimisations without evidence they address the
bottleneck. Say plainly when the measurements are inadequate to conclude
anything. Prefer the change with the largest return, not the most
interesting one. Note where an optimisation would trade clarity for speed.
