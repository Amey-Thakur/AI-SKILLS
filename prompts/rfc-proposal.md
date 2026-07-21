---
name: rfc-proposal
description: Write a technical RFC (request for comments) that proposes a change and invites the team to challenge it.
variables:
  - "{proposal}: the change or approach you are proposing"
  - "{context}: the current state, the motivation, and any constraints"
settings: "Temperature 0.3-0.5."
---

Write a technical RFC for:

{proposal}

Context: {context}

Structure:
- Summary: the proposal in a few sentences, so a reader knows what they are
  being asked to comment on.
- Motivation: the problem this solves and why it matters now, with evidence.
- Detailed proposal: what changes, how it works, the interfaces and behavior.
  Specific enough to implement and to critique.
- Alternatives and prior art: other approaches considered and why this one,
  plus how others solved the same problem.
- Drawbacks and risks: the costs of this proposal, honestly. What it makes
  worse, who it affects, what could go wrong.
- Migration and rollout: how we get from here to there, and how we back out.
- Unresolved questions: what needs discussion.

Rules: an RFC exists to gather disagreement before committing, so make it easy
to disagree with: state the proposal precisely and surface its weaknesses.
Justify with reasons, not authority. Keep it focused on one decision. If the
motivation is weak, the RFC will not survive review: say so rather than
padding it. Output in markdown, ready to circulate.
