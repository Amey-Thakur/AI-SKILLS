---
name: sales-outreach-sequence
description: Draft a multi-step outreach sequence grounded in research about the recipient, for a human to review and send.
variables:
  - "{prospect}: the company and person, and what you know about their situation"
  - "{offer}: what you are offering and why it fits them"
settings: "Temperature 0.4."
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
