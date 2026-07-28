---
name: code-reading
description: Understand unfamiliar code quickly by tracing real execution paths rather than reading files in order. Use when joining a codebase, reviewing an unfamiliar area, or debugging something you did not write.
---

# Code reading

Developers spend far more time reading code than writing it, and most
read badly: opening files alphabetically, skimming everything, and
retaining nothing. Effective reading is targeted, follows execution, and
starts from a question.

## Method

1. **Start with a question, not with the codebase.** How does a request
   become a response, or where does this value come from. Reading
   without a question produces recognition rather than understanding.
2. **Find the entry points first.** Routes, handlers, command
   definitions, and scheduled jobs are where behaviour begins, and they
   orient everything else (see repository-structure).
3. **Trace one path end to end.** Follow a single realistic operation
   through every layer, since one complete path teaches more than
   surveying every module (see mental-model-building).
4. **Read the tests to learn the contract.** Tests state intended
   behaviour and edge cases more honestly than comments, and they show
   how the code is meant to be called (see test-design).
5. **Use the debugger and the call graph over guessing.** Stepping
   through a real execution answers in minutes what reading answers in
   hours, particularly with dynamic dispatch (see debugging).
6. **Read history when the code is puzzling.** The commit that
   introduced a strange condition usually explains it, and the message
   may name the incident behind it (see git-history-hygiene).
7. **Take notes as you go and leave them behind.** A short map of what
   you learned saves the next person the same excavation (see
   knowledge-transfer).

## Boundaries

Reading builds understanding of what the code does, not whether it is
correct or why it was designed that way, which needs decision records
(see architecture-decision-records). Large codebases cannot be
understood exhaustively, and trying to is how onboarding stalls.
Generated and vendored code is usually not worth reading at all.
