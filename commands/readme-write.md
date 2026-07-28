---
description: "Write a readme that lets a reader decide in a minute whether this is for them, then get it running."
argument-hint: "[project]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a readme for:

{project}

Usage: {usage}

Use documentation-for-adoption and technical-writing.

Structure:
- What it is and who it is for, in two sentences.
- The smallest working example, with its output.
- Installation, tested from a clean environment.
- The handful of things most people need next.
- What it does not do, and known limitations.
- Links to deeper documentation, contributing, and licence.

Rules: lead with what it is rather than badges. Show working code above
the fold. State non-goals honestly, since that builds more trust than
feature lists. Do not claim capabilities that are aspirational.
