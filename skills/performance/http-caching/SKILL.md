---
name: http-caching
description: Use HTTP caching correctly with etags, max-age, and stale-while-revalidate so clients and proxies reuse responses without serving stale data. Use when responses lack cache headers, a bad deploy served stale content, or revalidation traffic is heavy.
---

# HTTP caching

HTTP already has a caching protocol; most bugs come from using half of it.
An endpoint with no `Cache-Control` gets cached by heuristic in ways you did
not choose, and an endpoint with `no-cache` everywhere throws away free
reuse. The job is to state freshness and validation explicitly so every
layer between server and user agrees on when a response is still good.

## Method

1. **Classify each response by who may store it.** Public and shareable gets
   `Cache-Control: public`; per-user gets `private`; secrets and one-shot
   tokens get `no-store`. Do not confuse `no-cache` (store, but revalidate
   before use) with `no-store` (never write it down). The wrong one leaks or
   wastes.
2. **Set `max-age` to the real tolerance for staleness.** Ask how many
   seconds a wrong answer is acceptable, and use that number. Fingerprinted
   assets take a year; a pricing feed takes 30 seconds. Add `s-maxage` when
   shared caches should hold it longer than browsers.
3. **Attach a validator so revalidation is cheap.** Emit a strong `ETag`
   (content hash) or `Last-Modified`. When the client sends
   `If-None-Match`, compare and return `304 Not Modified` with no body. A
   304 costs headers, not payload, and skips regeneration.
4. **Serve stale on purpose with `stale-while-revalidate`.** Pair it with
   `max-age` so the cache returns the slightly-old copy instantly and
   refetches in the background: `max-age=60, stale-while-revalidate=300`.
   Add `stale-if-error` to keep serving during an origin outage.
5. **Make ETags cheap and correct.** Hash the rendered body or a version
   plus key, not the wall clock. Never gzip after computing the ETag on the
   uncompressed body without marking `Vary: Accept-Encoding`, or two encodings
   collide on one tag.
6. **Verify with the actual request cycle.** `curl -sI` the endpoint, then
   replay with `-H 'If-None-Match: "<tag>"'` and confirm a 304. Check that a
   deploy which changes content also changes the ETag or the fingerprint.

## Checks

- Does every endpoint declare `Cache-Control` intentionally, with no route
  falling back to server defaults?
- Does a repeat request with `If-None-Match` return 304 and an empty body?
- Are `private`/`no-store` set on every authenticated or secret-bearing
  response, verified with a logged-in `curl -I`?
- Does changing the response body change its validator?

## Boundaries

This is response-header semantics for correctness and reuse. Edge topology,
purging, and origin shielding belong to cdn-strategy; application-level
memoization and object caches are performance-optimization territory.
Browser back-forward cache quirks defer to the target browser's documented
behavior.
