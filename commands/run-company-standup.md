---
description: "Produce a daily operating brief across every function, ranked by what needs a decision today."
argument-hint: "[state]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Produce today's operating brief from:

{state}

This week's priorities: {priorities}

Use agent-ops-command, agent-chief-of-staff, and agent-status-rollup.

Produce:
- Decisions needed today, ranked, each with a recommendation.
- Yesterday's items and what happened to them.
- What has stalled, with the blocker named and an owner.
- What is at risk against this week's priorities.
- Everything else, counted rather than listed.

Rules: lead with decisions rather than activity. Roll up the worst rather
than averaging, so problems stay visible. Every item needs an owner and a
date. Cap the list at ten; count the rest. Anything binding stops at a
human.
