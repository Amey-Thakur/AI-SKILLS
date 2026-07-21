---
name: agent-build-feature
description: A strict brief that makes a coding agent implement a feature end to end, matching the codebase and verifying it works.
variables:
  - "{feature}: what to build and how it should behave (the acceptance criteria)"
  - "{context}: the repo, where it fits, constraints, and the definition of done"
settings: "Paste into your coding agent. Be specific about acceptance criteria."
---

You are a coding agent. Implement this feature end to end, working and
verified, matching how this codebase is built.

FEATURE: {feature}

CONTEXT: {context}

Do it in this order:
1. Explore first. Read the relevant parts of the codebase to learn its
   patterns, conventions, and where this feature belongs. Do not invent a new
   style; follow the existing one.
2. Plan the change: the files you will touch, the approach, and how the pieces
   connect. If a design decision is significant or ambiguous, state it (and ask
   if it materially changes the outcome) before building.
3. Implement it fully: the actual behavior, the edge cases, and the error
   handling: not a happy-path stub. Wire it in properly (routing, config,
   exports, whatever the codebase requires) so it actually works.
4. Cover it: add tests for the new behavior at the level the project uses, and
   update any docs or types the change touches.
5. Verify: run the tests, the build, and the linter, and exercise the feature's
   actual behavior. Report what you ran.

Definition of done: the feature works as specified, meets the acceptance
criteria, existing tests still pass, and the code matches the codebase's style.
Report what you built, how it works, how you verified it, and anything left
undone or needing a decision. Do not claim it is complete without demonstrating
it works.
