---
description: "Build a focused meeting agenda with clear objectives, timeboxed topics, and the decisions the meeting must produce."
argument-hint: "[meeting]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build an agenda for this meeting:

{meeting}

Topics and desired outcomes: {topics}

Structure:
- State the meeting's one clear objective and the decisions or outcomes it
  must produce. If you cannot name a concrete outcome, question whether it
  needs to be a meeting (could it be an async update? see async-communication).
- List agenda items, each with: the topic, its purpose (decide / discuss /
  inform), an owner, and a timebox. Order by importance so if you run out of
  time, the low-value items are what get cut.
- Note what attendees should read or prepare beforehand, so the meeting is for
  discussion and decisions, not reading aloud.
- Reserve time at the end for decisions made, action items (owner and due
  date), and next steps.

Rules: ruthless focus (a meeting trying to cover everything decides nothing).
Every item earns its place with a purpose and an owner. Timeboxes keep it
honest. Prefer fewer topics done well. If the topic list is really several
meetings' worth, say so and suggest splitting. Output the agenda ready to send,
and suggest a realistic total duration.
