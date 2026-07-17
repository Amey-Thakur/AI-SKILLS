---
name: dependency-management
description: Choose, add, upgrade, and remove dependencies with the long-term cost in view. Use when adding a library, resolving version conflicts, or auditing a dependency tree.
---

# Dependency management

Every dependency is a hire: it works for you, you pay maintenance forever,
and firing it later is expensive. Hire deliberately.

## Method

1. **Before adding, try not to.** If the need is under an hour of code and
   well within the team's competence (a date format, a retry loop, a tiny
   parser), write it. A dependency earns its place when it encodes real
   expertise (crypto, parsing hostile input, protocol correctness) or
   substantial surface you would otherwise maintain.
2. **Vet like a hire:** maintained (recent releases, responsive issues),
   adopted enough that problems are found by others first, license
   compatible with the project, transitive tree reasonable (one import
   dragging eighty packages is eighty new suppliers), and API shaped so
   you could wrap and replace it.
3. **Add at the narrowest sensible scope.** Runtime versus dev dependency
   matters; so does wrapping third-party APIs at one boundary module when
   the dependency is likely to churn, so a future swap touches one file.
4. **Pin by lockfile, upgrade on purpose.** The lockfile is the truth CI
   builds from; commit it always. Upgrade regularly in small batches
   rather than annually in one heroic, unreviewable leap: patch and minor
   versions on a cadence, majors one at a time with the changelog read
   and the breaking notes checked against actual usage.
5. **Treat security advisories as interrupts,** but fix by the smallest
   safe step: the patched version in the same major first, structural
   upgrades second. Verify the vulnerable path is actually reachable
   before declaring emergency; verify the fix landed by re-running the
   audit after.
6. **Remove what stopped pulling weight.** A quarterly look at what is
   imported once, replaced by the standard library since, or abandoned
   upstream. Every removal is a permanent maintenance refund.

## Rules

- Never mix an upgrade with a feature in one change; when behavior shifts,
  you need to know which change did it.
- Version conflicts resolve by understanding who requires what and why,
  not by force flags that override the resolver and defer the breakage.
- The project's package manager conventions (workspaces, resolutions,
  vendoring) win over general practice.
