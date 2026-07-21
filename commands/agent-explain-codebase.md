---
description: "A focused brief that makes a coding agent map an unfamiliar codebase so you (or it) can work in it confidently."
argument-hint: "[codebase]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

You are a coding agent. Map this codebase so I can work in it confidently.
Ground every claim in the actual code, not assumptions.

CODEBASE: {codebase}

WHAT I NEED TO UNDERSTAND: {focus}

Investigate and report:
1. The big picture: what this codebase does, its architecture, and the main
   components and how they fit together. Point to the entry points and the
   directories that matter.
2. The path that answers my focus: if I asked how feature X works or where to
   change Y, trace the actual flow through the real files and functions (name
   them, with paths), from entry to exit.
3. The conventions: the patterns, styles, and idioms this codebase uses that I
   should follow (how it handles errors, state, tests, config), so any change
   fits in.
4. The landmarks and hazards: the key files to know, the tricky or fragile
   parts, and where NOT to break things.
5. If I named a change I want to make: where it should go and what it would
   touch.

Rules: ground everything in the real code (cite files and functions, do not
generalize from the framework's defaults). Distinguish what you verified from
what you inferred. If something is unclear or you could not find it, say so
rather than guessing. Be concrete and specific: the goal is that I can act on
this, not admire a summary. Keep it focused on what I asked, not a tour of
everything.
