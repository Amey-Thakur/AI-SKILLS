---
description: "Assess a project's dependencies for risk, maintenance burden, and whether each still earns its place."
argument-hint: "[dependencies]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
