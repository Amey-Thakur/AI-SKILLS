---
name: memory-consolidation
description: Periodically merge, deduplicate, and abstract accumulated memories so recall stays fast and coherent as volume grows. Use when a memory store has grown large and retrieval returns redundant or conflicting entries.
---

# Memory consolidation

Memory written incrementally accumulates duplicates, near-duplicates,
and superseded facts. Consolidation is the background pass that turns a
log of observations into a coherent store, which is what keeps retrieval
useful at scale.

## Method

1. **Deduplicate on meaning, not on text.** Two differently worded
   records of the same fact are one fact, and near-duplicate detection
   is the bulk of the work.
2. **Merge with the strongest provenance.** When combining, keep the
   earliest establishment and the most recent confirmation, since both
   carry information.
3. **Abstract repeated specifics into a general fact.** Several
   observations of the same pattern become one statement, with the
   instances discardable.
4. **Resolve contradictions explicitly.** Prefer recent and
   user-stated over old and inferred, and record that a change happened
   rather than silently replacing (see long-term-user-memory).
5. **Run it as background work, not inline.** Consolidation is
   expensive and must not sit in the request path (see
   media-processing-queue for the analogous pattern).
6. **Keep the raw records until consolidation is verified.** A bad merge
   is unrecoverable otherwise, and consolidation logic changes.
7. **Measure retrieval quality before and after.** Consolidation that
   shrinks the store while degrading recall has traded the wrong way
   (see rag-evaluation).

## Boundaries

Consolidation loses detail deliberately, and the lost detail occasionally
mattered. Automated merging can combine facts about two different
entities, which is a serious and quiet error. Consolidated memories
inherit the privacy obligations of their sources.
