---
description: "Build a regular expression from a plain-language description, with an explanation and test cases."
argument-hint: "[requirement]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build a regular expression for: {requirement}

Flavor: {flavor}

Provide:
1. The regex, in a code block, ready to use.
2. A breakdown: explain each part of the pattern in one line, so it can be
   understood and modified.
3. Test cases: 3-4 strings that SHOULD match and 3-4 that should NOT, so the
   behavior is verifiable. Note any tricky edge case (empty string, unicode,
   anchoring, greedy vs lazy) the pattern handles or deliberately does not.
4. Flavor notes: if the pattern uses features that differ across engines
   (lookbehind, named groups, \d semantics), say so.

Rules: prefer a readable pattern over a clever one; if the requirement is
better served by NOT using regex (parsing structured data, matching nested
structures), say so and suggest the alternative. Warn if the pattern risks
catastrophic backtracking.
