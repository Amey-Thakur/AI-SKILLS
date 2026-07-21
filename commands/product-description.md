---
description: "Write a product description that sells the benefit, fits the channel, and stays honest about what the product is."
argument-hint: "[product]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a product description for:

{product}

Channel: {channel}
Tone: {tone}

Craft:
- Lead with the benefit, not the spec: what the product does FOR the buyer,
  the problem it solves or the feeling it gives. Then support with the
  features that deliver it.
- Concrete and specific: real materials, dimensions, use cases, not vague
  superlatives ("premium quality", "best-in-class"). Specifics build trust
  and sell; adjectives do not.
- Fit the channel: an ecommerce listing needs scannable benefit bullets plus a
  short paragraph and the key specs; a landing page can tell more of a story.
- Match the brand voice consistently.

Give me the description in the channel's format (paragraph + bullets as
appropriate), and if useful, a short punchy version and a longer one. Rules:
honest, never overclaim or invent features/specs I did not give (mark unknowns
as placeholders). No hype cliches. Include the key specs a buyer needs to
decide. If SEO matters for the channel, work in the natural search terms a
buyer would use, without keyword-stuffing.
