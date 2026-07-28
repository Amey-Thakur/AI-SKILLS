---
name: platform-abstractions
description: Choose the level of abstraction a platform exposes so it hides complexity without hiding what teams need to control. Use when designing platform interfaces or when teams keep bypassing them.
---

# Platform abstractions

Every abstraction hides something, and platform abstractions fail in two
directions: leaking the complexity they were meant to hide, or hiding
detail that teams genuinely need. Both drive teams to bypass the
platform.

## Method

1. **Abstract the decision, not the technology.** Teams should request
   an outcome such as a queue with these guarantees rather than
   configuring a specific broker.
2. **Expose what teams must control.** Anything affecting their
   latency, cost, or failure behaviour needs to be visible and
   adjustable, or the abstraction is a trap.
3. **Keep the escape hatch documented, not hidden.** Teams with genuine
   needs must access the underlying system without leaving the platform
   entirely.
4. **Do not abstract over an unstable foundation.** Wrapping something
   you are still changing produces an abstraction that breaks with every
   change underneath.
5. **Name concepts in the users' language.** Platform vocabulary that
   maps to infrastructure rather than to what teams are doing forces
   translation on every use.
6. **Make failures legible through the abstraction.** An error surfacing
   as an internal platform code with no path to the real cause is worse
   than no abstraction (see mcp-error-handling).
7. **Version abstractions as public contracts.** Teams depend on them,
   so breaking changes need deprecation cycles (see api-deprecation).

## Boundaries

Abstractions trade control for convenience, and the right point differs
by team maturity. Leaky abstractions cost more than none, because
users must learn both layers. Premature abstraction over few use cases
usually fits none of them well.
