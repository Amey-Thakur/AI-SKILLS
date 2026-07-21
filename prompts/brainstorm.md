---
name: brainstorm
description: Generate a range of ideas for anything quickly, from safe to bold, without self-censoring. A quick /brainstorm command.
variables:
  - "{topic}: what you want ideas for"
  - "{constraints}: any goals, limits, or must-haves, if you have them"
settings: "Temperature 0.8-1.0 for range."
---

Brainstorm ideas for: {topic}

Constraints: {constraints}

Rules:
- Go for range and quantity: give a spread from the safe and obvious to the
  bold and unexpected. Do not stop at the first three predictable ones.
- Defer judgment while generating: include the risky and unusual ideas;
  filtering comes after.
- Make each idea concrete and distinct, not restatements of the same one. A
  one-line explanation where it is not self-evident.
- Cover different angles or categories so the list is not all variations on a
  theme.

Give 10-15 ideas, grouped or ordered if that helps, then flag the 2-3 most
promising and why. If the topic is too vague for useful ideas, ask one
question to focus it. For a structured divergent-then-converge technique, see
brainstorm-divergent.
