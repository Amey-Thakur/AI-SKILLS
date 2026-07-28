---
name: feature-spec
description: Specify a feature with the problem, the behaviour, the edge cases, and what is out of scope.
variables:
  - "{feature}: what is being built and the user problem behind it"
  - "{context}: existing product, constraints, and who it is for"
settings: "Temperature 0.3."
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
