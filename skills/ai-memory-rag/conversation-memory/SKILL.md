---
name: conversation-memory
description: Keep a long conversation coherent within a finite window through rolling summaries, pinned facts, and selective recall. Use when sessions run long enough that early context falls out.
---

# Conversation memory

Every long conversation eventually exceeds the window, and the naive
answer of dropping the oldest turns loses exactly what was established
first: names, decisions, and constraints. Memory is choosing what
survives.

## Method

1. **Separate durable facts from conversational flow.** Decisions,
   preferences, and constraints are pinned; small talk and superseded
   attempts are not.
2. **Summarise rolling history rather than truncating.** A running
   summary of older turns preserves the thread at a fraction of the
   tokens, and truncation loses it entirely.
3. **Keep the recent turns verbatim.** Recency matters for coherence, so
   the last several exchanges stay unsummarised while older ones
   compress.
4. **Re-summarise incrementally.** Summarising the summary each round
   compounds distortion, so summarise from the source turns where
   possible.
5. **Extract facts explicitly as they are established.** A structured
   note when the user states a constraint is more reliable than hoping a
   summary preserves it (see long-term-user-memory).
6. **Handle contradiction by recency with acknowledgement.** When the
   user changes their mind, the new statement wins and the change should
   be visible rather than silent.
7. **Show what is remembered.** Users are unsettled by a system that
   remembers invisibly, and a visible memory is also a correctable one.

## Boundaries

Summarisation loses detail by design, and the lost detail is sometimes
what mattered. Compression costs a model call per cycle. Conversation
content is user data with retention and deletion obligations (see
right-to-erasure).
