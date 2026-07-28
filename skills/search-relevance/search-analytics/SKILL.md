---
name: search-analytics
description: Instrument search so queries, clicks, and abandonment tell you what to fix. Use when improving relevance without evidence, or when nobody can say whether search works.
---

# Search analytics

Search is one of the few features that reports its own failures: the
query log is a list of things people wanted, and the zero-result and
no-click entries are the ones you failed. Instrumenting it turns
relevance from opinion into a queue of work.

## Method

1. **Log the query, the interpretation, and the result set.** What was
   typed, what it was rewritten to, what came back, and in what order.
   Without the middle two, debugging is guesswork (see
   query-understanding).
2. **Track clicks with their position.** Position is what lets you tell
   a good result from a merely visible one, and it is the basis of every
   engagement metric.
3. **Watch zero-result and zero-click queries.** These are the two
   clearest failure signals and the highest-value backlog you will get
   (see zero-results-handling).
4. **Measure reformulation.** A user retyping a variant immediately is
   telling you the first attempt failed, even though they never left.
5. **Segment by query head and tail.** Aggregate metrics are dominated
   by frequent queries and hide systematic failure across the long tail.
6. **Correct for position bias before trusting clicks.** Top results get
   clicked because they are top, so raw click rate overstates their
   quality.
7. **Close the loop on a cadence.** Review the top failing queries
   weekly and turn them into synonyms, curation, or content, or the
   analytics is just dashboards.

## Boundaries

- Query logs contain personal data and intent, so they need retention
  limits and access control (see data-minimization).
- Clicks measure engagement rather than satisfaction; a click on a bad
  result still counts.
- Analytics identifies problems; fixing them is content, ranking, or
  product work.
