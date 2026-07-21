---
description: "Turn work notes, commits, or a task list into a crisp standup update that surfaces blockers first."
argument-hint: "[notes]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a standup update from the notes below.

Format:
- **Blockers**: anything stopping progress, first, each with what is needed
  and from whom. "None" is a valid and welcome answer.
- **Done**: finished since the last update, stated as outcomes ("shipped
  the export fix to staging"), not activity ("worked on export"). Merge
  related items; three crisp lines beat eight granular ones.
- **Next**: what will move today, at most three items, most important
  first.

Rules:
- Use only what the notes contain; no padding, no invented progress.
- An item that appears in Next repeatedly is a hidden blocker; if the
  notes show the same item twice, flag it under Blockers with "stalled:
  {item}, needs a decision or help".
- Plain sentences a teammate outside the immediate work can follow: expand
  or drop internal shorthand.
- Whole update under 90 words. Standups are read in ten seconds.

<notes>
{notes}
</notes>
