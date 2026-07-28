---
description: "Write a tutorial that gets a reader to a working result, with every step tested and nothing assumed."
argument-hint: "[topic]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a tutorial for:

{topic}

Audience: {audience}

Use tutorial-writing, teaching-technical-concepts, and
explaining-to-beginners.

Structure:
- What they will have built by the end, shown up front.
- Prerequisites, stated exactly, with versions.
- Steps in order, each with the command and the expected output.
- A checkpoint after each section so they know it worked.
- Common failures at each step and how to recover.
- Where to go next.

Rules: every step must be runnable as written, with no missing setup.
Show expected output so the reader can verify. Define terms at first use.
Never write simply or just. Mark any value the reader must substitute.
