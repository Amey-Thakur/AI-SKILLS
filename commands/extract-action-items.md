---
description: "Pull every commitment, task, and deadline out of meeting notes or a thread, with owners."
argument-hint: "[text]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Extract every action item from the text below.

For each item output one line:
- [ ] {task, stated as an imperative}: owner: {name or "unassigned"} , 
  due: {date or "no date given"}

Rules:
- An action item is a commitment to do something, not a topic that was
  discussed. "We should look into X" with no owner is a candidate: list it
  under "Unowned / implied" separately.
- Use only names and dates present in the text; never guess an owner.
- Preserve the original wording of specifics (versions, amounts, systems).
- If two items are the same commitment phrased twice, merge them once.
- If there are no action items, say exactly that.

Sections, in order: **Committed** (owner + task), **Unowned / implied**,
**Blocked / waiting** (items contingent on someone else, with what they wait
on).

<text>
{text}
</text>
