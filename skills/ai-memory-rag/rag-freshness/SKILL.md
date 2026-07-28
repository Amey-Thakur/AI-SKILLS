---
name: rag-freshness
description: Keep a retrieval corpus current as source documents change, with incremental updates, deletion propagation, and a stated staleness budget. Use when retrieved answers cite content that has since changed or been removed.
---

# RAG freshness

A retrieval index is a snapshot that starts drifting immediately. The
failure is quiet and serious: an answer confidently cites a policy that
was superseded last month, with a citation that makes it look verified.

## Method

1. **State the staleness budget per source.** Minutes for operational
   data, days for documentation. It determines the whole update
   strategy (see search-indexing-pipeline).
2. **Update incrementally on change events.** Reindexing everything on a
   schedule is expensive and still leaves a window; capturing changes as
   they happen is both cheaper and fresher.
3. **Propagate deletions immediately.** A removed document that stays
   retrievable is worse than a stale one, especially where the removal
   was for accuracy or permission reasons.
4. **Re-chunk and re-embed on substantive change.** A minor edit may not
   warrant it; a rewrite does, and treating all edits alike either
   wastes work or leaves stale vectors (see chunking-strategies).
5. **Carry the source timestamp into the chunk.** The model can then
   qualify its answer, and users can judge for themselves (see
   citation-grounding).
6. **Detect drift by sampling.** Periodically compare indexed content
   against the source to catch pipeline failures that produce silent
   staleness.
7. **Alert on indexing lag.** A stalled pipeline looks identical to a
   working one from the answer side until someone notices a wrong
   answer.

## Boundaries

Freshness costs indexing work proportional to change rate. Some sources
provide no change notification and require polling. An index can be
perfectly fresh and still retrieve poorly, which is a separate problem
(see rag-evaluation).
