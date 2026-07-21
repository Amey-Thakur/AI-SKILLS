---
name: prioritize-tasks
description: Prioritize a task list by importance and urgency (Eisenhower matrix) and turn it into a clear order of action.
variables:
  - "{tasks}: the tasks to prioritize"
  - "{goals}: what actually matters to you right now, so importance can be judged"
settings: "Temperature 0.3-0.5."
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
