---
description: "Turn a diff or commit list into user-facing changelog entries that describe outcomes, not code."
argument-hint: "[changes]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write changelog entries for {audience} from the changes below.

Rules:
- Describe what the reader can now do or stop worrying about: never the
  implementation. "Search no longer misses results after a rename", not
  "Refactored index invalidation".
- Group under: **Added**, **Changed**, **Fixed**. Omit empty groups.
- One entry per user-visible change; merge commits that belong to one
  change; drop internal-only work (refactors, CI, tests) unless {audience}
  is developers.
- Start each entry with the noun or verb that matters, keep it under two
  sentences, and keep concrete details (limits, formats, defaults) exact.
- If a change's user impact is unclear from the input, list it under
  **Unclear** with the question a maintainer must answer, instead of
  guessing.

<changes>
{changes}
</changes>
