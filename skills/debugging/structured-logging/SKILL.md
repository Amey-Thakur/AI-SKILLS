---
name: structured-logging
description: Emit machine-readable key-value events instead of prose sentences, with a stable schema and controlled field cardinality. Use when logs need to be queried and aggregated, not just read one line at a time by a person.
---

# Structured logging

`log.info("user " + id + " failed to pay $" + amt)` reads fine to a human and
tells a machine nothing. You cannot filter it, group it, or count it without a
regex that shatters the next time the sentence changes. Structured logging
emits events as fields so a query engine can answer questions the author never
thought to ask.

## Method

1. **Emit an event with fields, not an interpolated string.** Write
   `log.info("payment_failed", user_id=id, amount=amt, currency="usd")` and let
   the logger render JSON. Now `amount>100 and currency="usd"` is a query, not
   a grep: the message becomes a stable name and the variables become
   searchable fields.
2. **Keep the event name constant and move nouns to fields.** The first argument
   is a fixed token like `order_placed` or `db_timeout`, identical on every
   emit. Everything that varies, ids, counts, durations, lands in fields.
   Constant names let you count occurrences without matching free text.
3. **Pin a schema and reuse names across services.** Agree that the user is
   always `user_id`, latency is always `duration_ms`, the request key is always
   `request_id`. When every service spells them alike, one query joins them all;
   `uid`, `userId`, and `user` fragment the same data into three.
4. **Control cardinality: bounded values are fields, unbounded ones get
   sampled.** A `status` with a dozen values is a fine group-by. A raw SQL
   string or full stack trace as a field explodes index size and cost. Keep
   high-cardinality blobs in an unindexed message field, or sample them.
5. **Bind context once at the entry point.** Attach `request_id` and `user_id`
   with `logger.bind(request_id=rid)` so every line in that request carries them
   without repeating arguments. Correlation turns automatic instead of a field
   you forget on the one line that mattered.
6. **Log durations and counts as numbers.** Emit `duration_ms=214` as an
   integer, never `"took 214ms"`. Numeric fields let the backend compute
   averages, percentiles, and thresholds; a number wrapped in a sentence has to
   be parsed back out before it is usable.

## Checks

- Can you answer a new question with a field filter, touching no logging code?
- Do the same concepts carry the same field name in every service?
- Is any field's value unbounded, and if so is it unindexed or sampled?

## Boundaries

Structure fixes the shape of a line, not its urgency: which level it fires at is
log-levels. Chasing the id across services once it is logged is
distributed-tracing. Match the field names the project already uses over a
tidier scheme of your own, because a shared schema is the entire point.
