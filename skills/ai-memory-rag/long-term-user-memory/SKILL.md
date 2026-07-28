---
name: long-term-user-memory
description: Persist facts about a user across sessions with provenance, correction, and expiry, so an assistant improves rather than accumulating stale assumptions. Use when an assistant should remember a user between conversations.
---

# Long-term user memory

Memory across sessions makes an assistant feel personal and makes its
errors persistent. A wrong fact learned once is repeated for months,
which is why writing memory needs more discipline than reading it.

## Method

1. **Store one fact per record with its source.** What was learned, when,
   and from which conversation, because a fact you cannot trace cannot
   be assessed later.
2. **Write sparingly and deliberately.** Stable, reusable facts only.
   Recording every passing detail produces a memory that is mostly noise
   (see data-minimization).
3. **Distinguish stated from inferred.** A preference the user
   articulated is far stronger than one deduced from behaviour, and they
   should not be treated alike.
4. **Retrieve by relevance to the current task.** Injecting the entire
   memory into every prompt wastes context and dilutes attention (see
   context-compression).
5. **Let users see, edit, and delete.** Memory the user cannot inspect
   is both a trust problem and a compliance one (see
   subject-access-requests).
6. **Expire what goes stale.** Project details, current employer, and
   circumstances change, so records need review dates rather than
   permanence (see memory-forgetting-policy).
7. **Resolve contradictions on write.** New information that conflicts
   with a stored fact should update rather than coexist, or retrieval
   returns both and the model picks arbitrarily.

## Boundaries

Memory is personal data with consent, retention, and erasure
obligations (see pii-handling). Inferred facts can be wrong and
sensitive, and inferring protected characteristics is a serious harm
even when accurate. Memory improves relevance; it cannot substitute for
asking when something matters.
