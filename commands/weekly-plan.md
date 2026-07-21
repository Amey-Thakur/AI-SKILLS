---
description: "Turn a pile of tasks and goals into a realistic weekly plan focused on what actually matters."
argument-hint: "[tasks]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Plan my week from this:

{tasks}

Constraints: {constraints}

Build the plan:
1. Separate the important from the merely urgent: what actually moves your
   goals versus what is just loud. The important-but-not-urgent work (the stuff
   that never has a deadline) is what gets crowded out: protect time for it.
2. Pick the 1-3 outcomes that would make this a successful week. Everything
   else is secondary. A week trying to do everything achieves nothing well.
3. Map tasks to time realistically: account for meetings, context-switching
   cost, and that everything takes longer than you think. Do not plan for a
   fantasy 40 hours of deep work.
4. Sequence deliberately: hard/important work in your best hours, batch the
   shallow work, and leave buffer for the unexpected (it always comes).
5. Name what you will NOT do this week: explicit not-doing prevents guilt and
   overcommitment.

Output: the top outcomes for the week, then a realistic day-by-day or
priority-ordered plan, then the "not this week" list. Rules: realistic over
ambitious (an overpacked plan you abandon by Tuesday is worse than an honest
one). Protect the important work from the urgent. If the load genuinely exceeds
the time, say so and help me cut, do not pretend it fits.
