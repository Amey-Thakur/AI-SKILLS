---
description: "Diagnose a performance problem from measurements rather than intuition, and propose the fix with the largest expected return."
argument-hint: "[problem]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
