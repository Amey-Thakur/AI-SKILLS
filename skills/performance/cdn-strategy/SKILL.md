---
name: cdn-strategy
description: Push work to the edge so requests never touch your origin, using cache headers, invalidation, and origin shielding. Use when origin load is high, global latency is uneven, or a CDN sits in front of your app but barely caches.
---

# CDN strategy

A CDN only helps for the responses it actually stores. Most origins ship
headers that quietly force every request back to the source, so the edge
becomes an expensive proxy that adds a hop and caches nothing. The work is
making assets and safe responses cacheable, then keeping them fresh.

## Method

1. **Read your cache hit ratio before touching config.** Pull the edge hit
   ratio from your provider (Fastly `Fastly-Debug`, Cloudflare `cf-cache-status`,
   CloudFront `X-Cache`). Below 80% on static assets means headers, not
   capacity, are the problem. Fix the misses you can name first.
2. **Separate immutable from mutable at the URL.** Fingerprint static assets
   (`app.4f1a.js`) and serve them `Cache-Control: public, max-age=31536000,
   immutable`. HTML and API responses get short or zero TTLs. One caching
   policy per content class, keyed off the path, not per route guesswork.
3. **Split browser TTL from edge TTL.** Use `s-maxage` for the CDN and
   `max-age` for the browser so you can hold a response at the edge for an
   hour while telling clients to revalidate in a minute. `stale-while-revalidate`
   lets the edge serve stale bytes while it refetches in the background.
4. **Invalidate by tag, not by guessing.** Attach surrogate keys (Fastly
   `Surrogate-Key`, Cloudflare Cache-Tag) to responses so publishing an
   article purges `article:912` everywhere in one call. Path purges miss
   query-string and locale variants; tag purges do not.
5. **Turn on origin shielding.** Designate one shield POP so the other edge
   nodes fetch from it instead of stampeding your origin on a cold cache.
   This collapses a global miss from hundreds of origin requests to one.
6. **Control the cache key deliberately.** Strip tracking query params and
   irrelevant cookies from the key, and set `Vary` only on headers that
   truly change the body (`Accept-Encoding`, sometimes `Accept-Language`).
   A `Vary: Cookie` on a public page fragments the cache into uselessness.

## Litmus tests

- Does `curl -I` on a static asset show a year-long `max-age` and `immutable`?
- After a publish, does the changed page update within one purge call, with
  no stale variants left behind?
- Does a cold-cache spike hit the origin once per shield, not once per POP?
- Is `cf-cache-status` (or equivalent) HIT on the paths you expect to cache?

## Boundaries

This covers edge caching of HTTP responses. Header semantics themselves
belong to the http-caching skill; personalized or auth-gated responses that
cannot be shared across users are a compute-at-edge or origin concern, not a
caching one. Defer purge-on-deploy wiring to the project's release pipeline.
