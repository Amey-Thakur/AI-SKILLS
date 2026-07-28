---
description: "Prepare a one-to-one that belongs to the report, with space for what they need rather than a status update."
argument-hint: "[context]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
