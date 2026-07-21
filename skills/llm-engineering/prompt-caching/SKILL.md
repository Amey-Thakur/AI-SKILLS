---
name: prompt-caching
description: Cut LLM cost and latency by caching stable prompt prefixes, structuring prompts so the cache actually hits. Use when the same system prompt, tools, or examples repeat across calls and cost or time-to-first-token matters.
---

# Prompt caching

Providers can cache a stable prefix of the prompt and skip recomputing it,
cutting input cost sharply and shrinking time-to-first-token. The win is
real but conditional: it only applies to the exact repeated prefix, so
prompts must be structured to keep that prefix stable.

## Method

1. **Put the stable content first, the variable content last.** System
   prompt, tool definitions, and few-shot examples at the top (they
   rarely change); the user's turn and per-request data at the bottom.
   The cache matches from the start, so a single early change (a
   timestamp, a shuffled example) invalidates everything after it (see
   context-engineering's stable-prefix rule).
2. **Freeze the prefix byte-for-byte.** Caching keys on exact content:
   avoid injecting the current time, request IDs, randomized example
   order, or reformatted whitespace into the cached region. What varies
   per call belongs after the cache boundary, not woven through it.
3. **Know your provider's mechanism and thresholds.** Providers differ on
   whether caching is automatic or explicitly marked, the minimum
   cacheable size, the cache lifetime (often minutes), and the discount.
   Read the current contract for your platform rather than assuming (see
   claude-api-adjacent docs for the specifics).
4. **Design multi-turn and agent loops to reuse the prefix.** In a
   conversation or an agent loop (see agentic-loops), the growing history
   after the fixed prefix still lets the prefix hit; keep the system
   layer stable across turns so every call reuses it. Frequent system-
   prompt edits forfeit the cache on every turn.
5. **Verify hit rates, do not assume them.** Instrument cached-token
   counts in telemetry (see llm-observability); a prompt you believe is
   cached but is not (a stray variable in the prefix) pays full price
   silently. Measure before and after structuring for caching.
6. **Fold caching into the cost model.** Cached input is much cheaper than
   fresh input but not free, and output tokens are unaffected: caching
   attacks the input and latency side, and combines with model tiering,
   prompt diet, and batching (see llm-cost-latency for the full toolkit).

## Boundaries

- Caching reduces cost and latency; it changes nothing about output
  quality or correctness, and must never be a reason to bloat the stable
  prefix with content the task does not need (see context-engineering).
- Cache lifetimes are short: bursty repeated traffic benefits most;
  widely-spaced calls may never hit, so do not over-engineer for it.
- Semantic caching (returning a stored answer for a similar question) is
  a different technique with its own freshness and correctness risks; do
  not conflate it with prefix caching (see llm-cost-latency).
