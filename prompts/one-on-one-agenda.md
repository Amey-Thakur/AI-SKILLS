---
name: one-on-one-agenda
description: Prepare a one-to-one that belongs to the report, with space for what they need rather than a status update.
variables:
  - "{context}: the person, their current work, and anything outstanding"
  - "{cadence}: how often you meet and what has changed since last time"
settings: "Temperature 0.4."
---

Prepare a one-to-one for:

{context}

Since last time: {cadence}

Use one-on-one-meetings, giving-feedback, and mentoring-engineers.

Produce:
- Open question that hands them the agenda.
- Follow-ups from last time, so nothing is dropped.
- Feedback you owe them, specific and about the work.
- Questions about blockers and what they need from you.
- Development conversation, when appropriate.
- What you will do before next time.

Rules: this is their meeting, so their topics come first. Status belongs
elsewhere. Feedback must be specific and about work rather than
character. Follow up on what you committed to, since not doing so ends
the value of these meetings.
