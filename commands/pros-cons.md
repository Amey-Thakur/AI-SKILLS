---
description: "Get a quick, honest pros and cons list for a decision or option to see the tradeoffs at a glance. A quick /pros-cons command."
argument-hint: "[subject]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Give me the pros and cons of: {subject}

What matters to me: {context}

Rules:
- Pros: the genuine benefits and upsides, concrete and specific to my
  situation, not generic.
- Cons: the real drawbacks, costs, and risks, honestly, including the ones
  easy to overlook or that I might be motivated to ignore.
- Weight them: not every point is equal, so flag which pros and cons actually
  matter most given what I care about. Three trivial pros do not outweigh one
  serious con.
- Note any dealbreaker or must-have that decides it regardless of the tally.

End with a brief honest read: which way the balance leans and why, or what it
depends on. Rules: balanced and honest (do not stack the list to justify a
foregone conclusion). Specific to my context, not a textbook list. If a
compared alternative or a key fact is missing, say what would sharpen the call.
For a structured multi-criteria decision see decision-matrix; to compare
several options see compare-options.
