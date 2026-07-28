---
name: review-dependencies
description: Assess a project's dependencies for risk, maintenance burden, and whether each still earns its place.
variables:
  - "{dependencies}: the dependency list, ideally with versions"
  - "{context}: what the project does and what its distribution and security requirements are"
settings: "Temperature 0.2-0.4."
---

Review these dependencies:

{dependencies}

Project context: {context}

Draw on dependency-management, supply-chain-security, and
open-source-licensing.

For each dependency worth flagging, give:
- What it provides and whether that is still needed.
- Maintenance signals: activity, single-maintainer risk, last release.
- Licence implications for how this project is distributed.
- Weight: what it pulls in transitively.
- Whether the standard library or a smaller alternative would do.

Rules: do not flag every dependency; report the ones that carry real
risk. Licence assessment is informational rather than legal advice. Say
plainly where you cannot assess a package without checking its current
state. Removing a dependency has a cost too, so state it.
