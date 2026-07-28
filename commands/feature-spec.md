---
description: "Specify a feature with the problem, the behaviour, the edge cases, and what is out of scope."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a spec for:

{feature}

Context: {context}

Use user-story-writing, mvp-scoping, and error-boundaries-ui for failure
states.

Cover:
- The problem and the evidence it exists.
- The user and what they are trying to do.
- Behaviour: the main path, step by step.
- Edge cases: empty, error, permission denied, slow, offline.
- What is explicitly out of scope for this version.
- How success will be measured after release.
- Open questions that must be answered before build.

Rules: specify behaviour rather than implementation. Cover the failure
states, since they are where specs are usually silent. Name what is
deferred rather than leaving it ambiguous. Mark open questions rather
than resolving them by assumption.
