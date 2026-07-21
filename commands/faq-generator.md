---
description: "Generate an FAQ from a product, doc, or topic, answering the questions people actually ask, concisely."
argument-hint: "[source]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Generate an FAQ for:

{source}

Audience: {audience}

Rules:
- Write the questions people ACTUALLY ask, in their words (how they phrase it
  when confused or deciding), not the questions that make the product look
  good. Cover: what it is / who it is for, how to get started, pricing and
  limits, the common confusions and objections, troubleshooting the frequent
  problems, and the "can it do X" questions.
- Answers are concise and direct: answer the question in the first sentence,
  then add only the necessary detail. No marketing padding.
- Honest: if the answer is "no" or "not yet", say so plainly and point to the
  alternative. Dodged FAQ answers erode trust more than the limitation does.
- Order by how commonly the question comes up (most frequent first) or group
  by theme with headings if there are many.

Output as question-and-answer pairs, ready to publish. If the source suggests
FAQ-schema structured data would help discoverability, note that (see SEO).
Flag any question you cannot answer from the source as needing input.
