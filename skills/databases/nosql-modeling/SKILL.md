---
name: nosql-modeling
description: Model NoSQL data from access patterns first, with single-table and denormalization discipline. Use when designing for a document or key-value store, or when a relational mindset is fighting a NoSQL database.
---

# NoSQL modeling

Relational modeling starts from the data and normalizes; NoSQL modeling
starts from the queries and shapes data to serve them. Bringing
relational habits (normalize everything, join at read time) to a NoSQL
store produces slow, expensive designs; the discipline is inverting the
process.

## Method

1. **List the access patterns before designing anything.**
   Every query the application will make: get-user-by-id,
   list-orders-for-user, find-active-sessions. In NoSQL the
   data model is designed *for* these patterns, so they must
   be known first (unlike relational, where you can query
   any shape later: see the OLTP flexibility of schema-
   design). An access pattern discovered after launch may
   require a data-model change, not just a new query.
2. **Denormalize deliberately, own the consequences.**
   Duplicate data so a query reads from one place instead of
   joining (embed the order items in the order document,
   store the author name with the post): reads get fast and
   cheap, but updates must now maintain every copy (see the
   update-anomaly cost in database-normalization). The trade
   is read-simplicity for write-complexity: chosen, not
   accidental.
3. **Design keys for the query.** Partition/hash key spreads
   data and is queried by equality; sort/range key enables
   ranges and ordering within a partition (see data-
   partitioning's key selection). Composite keys and
   secondary indexes serve additional patterns. The key
   design *is* the query capability; get it wrong and the
   query you need becomes a full scan.
4. **Consider single-table design where the store rewards
   it.** In some stores (DynamoDB-class), putting multiple
   entity types in one table with a shared key scheme lets
   one query fetch related items together (a user and their
   orders in one request): powerful and dense, but a real
   learning curve. Use it where the access patterns and the
   store call for it, not by default.
5. **Model relationships by embedding or referencing, per
   access.** Embed when the related data is always fetched
   together and bounded in size (order items in an order);
   reference (store an ID, fetch separately) when the
   related data is large, shared, or independently queried.
   The one-to-many and many-to-many patterns each have
   embed-vs-reference tradeoffs decided by how they are
   read.
6. **Accept eventual consistency where the store gives it.**
   Many NoSQL stores default to eventual consistency for
   scale (see consistency-models); design so reads tolerate
   slight staleness, use strongly-consistent reads only
   where correctness demands (and pay the cost), and handle
   the lack of multi-item transactions (or use the store's
   limited transaction support deliberately: see delivery-
   guarantees, idempotency-keys).

## Boundaries

- NoSQL is not "better than SQL"; it trades query
  flexibility and relational integrity for scale and
  access-pattern-optimized performance. If you need
  flexible ad-hoc queries and strong relational integrity,
  a relational database is the right tool (see schema-
  design, transactions-isolation).
- "NoSQL" spans very different stores (document, key-value,
  wide-column, graph): the access-pattern-first principle
  is common, the modeling specifics differ hugely per
  store. Model to your actual database, not to "NoSQL".
- Denormalization and single-table designs are powerful and
  unforgiving of wrong access-pattern predictions; they
  reward deep upfront analysis and punish "we'll figure out
  queries later".
