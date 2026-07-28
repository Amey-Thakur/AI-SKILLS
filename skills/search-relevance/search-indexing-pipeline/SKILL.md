---
name: search-indexing-pipeline
description: Get data into a search index reliably and keep it current, with reindexing, partial updates, and a defined staleness budget. Use when search results lag reality or a schema change requires a full rebuild.
---

# Search indexing pipeline

The index is a derived copy, which means it can and will drift from the
source. A pipeline is judged by how quickly it reflects a change, how it
recovers from being wrong, and whether a full rebuild is a routine
operation or a crisis.

## Method

1. **State the staleness budget.** Seconds for a chat search, minutes
   for a catalog, hours for an archive. It decides whether you stream
   changes or batch them (see batch-vs-streaming).
2. **Drive updates from change events, not polling.** Capturing writes
   as they happen keeps the index close to the source without scanning
   everything repeatedly (see change-data-capture).
3. **Make indexing idempotent and ordered per document.** Retries are
   normal, and an out-of-order update that resurrects an old version is
   a bug users see as ghost results (see idempotency).
4. **Support full rebuild as a routine path.** Analyzer and mapping
   changes require reindexing, so build into a new index and swap an
   alias rather than mutating in place.
5. **Handle deletes explicitly.** A deleted record that lingers in the
   index is worse than a stale one, especially where permissions are
   involved.
6. **Denormalise at index time.** Joins do not exist at query time, so
   whatever the result must display or filter on belongs in the document.
7. **Monitor lag and document counts.** Divergence between source and
   index counts is the earliest signal that the pipeline is quietly
   broken.

## Boundaries

- The index is a copy; it is never the system of record and should be
  rebuildable from source at any time.
- Reindexing large corpora costs real time and capacity, so plan the
  window rather than discovering it.
- Access control that changes frequently is awkward to denormalise and
  may need filtering at query time instead.
