---
description: "Sort a backlog of incoming items by what actually needs action, with everything else disposed of."
argument-hint: "[items]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Triage:

{items}

My priorities: {context}

Use inbox-management, prioritize-tasks, and support-ticket-triage.

Produce:
- Needs action from me, ranked, with the action and rough effort.
- Needs a reply but not action, with a one-line draft.
- Delegate, with who and what they need.
- Waiting on someone else, with the follow-up date.
- Archive, with no action.

Rules: every item gets a disposition; nothing stays unsorted. Rank by
consequence and deadline rather than arrival. Say plainly where an item
does not serve any stated priority. Draft replies for a human to send.
