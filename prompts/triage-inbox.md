---
name: triage-inbox
description: Sort a backlog of incoming items by what actually needs action, with everything else disposed of.
variables:
  - "{items}: the messages, tickets, or requests to triage"
  - "{context}: your current priorities and what you are accountable for"
settings: "Temperature 0.3."
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
