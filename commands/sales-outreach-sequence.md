---
description: "Draft a multi-step outreach sequence grounded in research about the recipient, for a human to review and send."
argument-hint: "[prospect]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Draft an outreach sequence for:

{prospect}

Offer: {offer}

Use agent-sales-pipeline and cold-email.

Produce three to four messages:
- First: references something specific and real about them, with one
  clear ask.
- Follow-ups: each adding new value rather than repeating the ask.
- Final: a clean close that makes it easy to say no.

For each: subject line, body under 120 words, and timing.

Rules: every message must reference something real and verifiable about
the recipient. No false urgency, fake familiarity, or invented mutual
connections. Make declining easy and explicit. A human reviews and sends;
never send automatically. Contact rules differ by jurisdiction.
