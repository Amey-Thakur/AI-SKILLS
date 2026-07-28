---
name: failure-mode-analysis
description: Enumerate how a system can fail and what each failure does, before building the mitigations. Use when designing a critical system or reviewing one that has surprised you.
---

# Failure mode analysis

Systems fail in ways that are obvious in hindsight and unexamined
beforehand. Enumerating failure modes systematically finds the ones
intuition skips, particularly partial and dependency failures.

## Method

1. **Enumerate per component and per dependency.** What happens if this
   is slow, returns errors, returns wrong data, or disappears, asked
   mechanically rather than by intuition.
2. **Include partial and slow failures.** Clean crashes are the easy
   case; degraded and inconsistent behaviour causes the confusing
   incidents (see integration-resilience).
3. **Trace the effect through the system.** A failure matters by what it
   causes downstream, and the cascade is where the real risk is (see
   agent-dependency-manager).
4. **Identify single points of failure honestly.** Including people,
   credentials, and third parties, which are usually missing from the
   diagram (see technical-diagrams).
5. **Rate by likelihood and impact.** Not everything deserves
   mitigation, and saying so explicitly is part of the analysis (see
   project-risk-management).
6. **Design detection alongside mitigation.** A handled failure you
   cannot see is a silent degradation (see observability).
7. **Verify the mitigations by testing them.** An untested mitigation is
   an assumption (see chaos-engineering).

## Boundaries

Analysis finds anticipated failures and not novel ones, which is why
observability and response capability matter regardless. Exhaustive
analysis of complex systems is impractical, so it is prioritised. The
analysis goes stale as the system changes.
