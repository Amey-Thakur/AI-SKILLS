---
description: "Write user-facing release notes from a changelog or list of changes, grouped and written for the reader."
argument-hint: "[changes]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write release notes from these changes:

{changes}

Audience: {audience}

Rules:
- Write for the reader, not from the commit log: translate "refactored the
  auth module" into what it means for them ("sessions now stay active for 24
  hours"). If a change does not affect the reader, drop it or minimize it.
- Group by type: New, Improved, Fixed, and (prominently) Breaking changes /
  action required. Lead with what matters most to this audience.
- Call out breaking changes loudly, with what the reader must do to migrate:
  this is the most important part, never bury it.
- Concise and scannable: a line per change, benefit-first. Include the version
  and date.

Output in markdown, ready to publish (keep-a-changelog style). Rules: honest
about what shipped, no marketing spin on bug fixes, no vague "various
improvements and bug fixes" that tells the reader nothing. If the changes list
is raw commits, filter the noise (internal refactors, test-only changes) unless
the audience is developers who want it all.
