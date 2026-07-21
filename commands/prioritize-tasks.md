---
description: "Prioritize a task list by importance and urgency (Eisenhower matrix) and turn it into a clear order of action."
argument-hint: "[tasks]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Prioritize these tasks:

{tasks}

What matters to me right now: {goals}

Sort each task into the Eisenhower quadrants:
- Important AND urgent: do first (crises, hard deadlines).
- Important, NOT urgent: schedule and protect (the high-value work that has no
  deadline and gets neglected: this is where the real returns are).
- Urgent, NOT important: minimize, delegate, or do fast (the loud but
  low-value tasks that feel productive).
- Neither: drop or defer (be honest about what does not deserve your time).

Judge "important" against my actual goals, not by how loud or anxiety-inducing
the task is: urgency masquerades as importance constantly.

Output: the four quadrants with tasks sorted, then a clear recommended order of
action (what to do now, schedule, delegate, drop). Rules: the value is
distinguishing important from urgent, so push back where I have miscategorized
(a task that feels urgent but does not serve my goals belongs in "minimize").
Be decisive: prioritization means some things lose. If everything is marked
important-and-urgent, that is a sign to help me choose, not to agree.
