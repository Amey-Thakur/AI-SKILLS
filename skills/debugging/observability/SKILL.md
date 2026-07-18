---
name: observability
description: Instrument software so production questions get answered from signals, not guesses. Use when adding logging, metrics, tracing, or alerts, or when a system is hard to debug in production.
---

# Observability

The test of instrumentation is a question: when this misbehaves at 3 a.m.,
can the person on call find out what and why without adding new code? Build
toward answering that, not toward volume.

## Method

1. **Log events, with context, structured.** Each log line is a fact with
   the fields needed to act on it: timestamp, level, event name, the ids
   that connect it to a request, user, or job, and the specifics ("import
   failed", file, page, cause). Structured key-value beats prose because
   the reader at 3 a.m. is a query, not a person scrolling.
2. **Choose levels by the reader's need:** ERROR means someone should act;
   WARN means worth noticing on a bad day; INFO narrates state changes
   worth a timeline (started, migrated, deployed); DEBUG is for
   development and off by default. An ERROR nobody acts on gets demoted,
   because alarm fatigue is how real errors get missed.
3. **Propagate one correlation id** from the edge through every hop, into
   every log line and outbound call. The single most valuable observability
   feature is being able to pull one request's whole story with one query.
4. **Measure the four that matter per service:** traffic, error rate,
   latency as percentiles (p50, p95, p99, because averages hide the pain),
   and saturation (queue depth, pool usage, memory). Add per-feature
   counters only where a business question needs them.
5. **Alert on symptoms, with a runbook.** Page on what users feel (error
   rate, latency budget burn), not on causes like CPU, which belong on
   dashboards. Every alert states what to check first and what usually
   fixes it; an alert without a next action is noise with a pager.
6. **Never log secrets or personal data.** Tokens, passwords, keys, and
   raw personal content stay out of logs structurally (redaction at the
   logger), not by hoping call sites remember.

## Litmus tests

- Given one failing request id, can you reconstruct its path and failure
  cause from signals alone?
- Does every page in the last month correspond to something a human did?
- Can you tell the difference between "slow for everyone" and "slow for
  one huge tenant" from the dashboards?

## Boundaries

Instrumentation follows the codebase's existing framework and conventions;
a second logging system is a bug, not an improvement. Cost is real: sample
high-volume traces, cap cardinality on metric labels, and expire what
nobody queries.
