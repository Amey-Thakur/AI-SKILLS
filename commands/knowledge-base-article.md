---
description: "Write a self-serve article that answers one question in the words customers actually use."
argument-hint: "[question]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a knowledge base article for:

{question}

Answer: {answer}

Use knowledge-base-design and technical-writing.

Structure:
- Title phrased as the question a customer would type.
- The answer in the first paragraph.
- Steps, numbered, with what the customer sees at each.
- What to do if it does not work.
- Related questions, linked.

Rules: one question per article. Answer first, context after. Use the
customer's vocabulary rather than internal terms. Include the failure
path, since that is why people search. State the last-verified date so
staleness is visible.
