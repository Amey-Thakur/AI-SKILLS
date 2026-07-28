---
description: "Announce a release so users know what changed, what breaks, and what to do about it."
argument-hint: "[release]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a release announcement for:

{release}

Audience: {audience}

Use changelog-writing and release-management.

Structure:
- The headline change, in one line.
- Breaking changes first, with the migration step for each.
- New capabilities, described by what they let users do.
- Fixes, grouped so they can be scanned.
- Upgrade instructions and any prerequisites.
- Known issues.

Rules: breaking changes lead, always, regardless of how minor they seem.
Describe changes by user impact rather than by commit. Do not bury a
required migration under new features. Say plainly if an upgrade cannot
be rolled back.
