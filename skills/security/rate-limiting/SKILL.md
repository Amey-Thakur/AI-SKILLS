---
name: rate-limiting
description: Limit requests by the cost they impose and the identity behind them, using token buckets, deliberate keys, and tiered responses to abuse. Use when protecting an API, a login flow, or any expensive endpoint from brute force, scraping, and accidental overload.
---

# Rate limiting

A flat "100 requests per minute" treats a cache hit and a report export as
equals, throttles a shared office behind one NAT while a distributed
attacker sails through, and returns the same terse error to a confused user
and a credential-stuffing bot. Effective limiting prices requests by what
they actually cost, keys on the right identity, and answers each tier of
abuse differently.

## Method

1. **Use a token bucket for steady rate with burst.** Give each key a bucket
   that refills at the sustained rate and holds a burst allowance, so normal
   spikes pass while sustained floods drain and block. This beats a fixed
   window, which lets double the limit through across a window boundary.
2. **Charge by cost, not by count.** Deduct more tokens for a search, an
   export, or an LLM call than for a cheap read. A single weight-1 limit
   invites attackers to hammer your most expensive endpoint at the same rate
   as your cheapest.
3. **Choose the key to match the threat.** Rate-limit login by account and
   by source together so one account cannot be brute-forced and one IP
   cannot spray many accounts. Prefer an authenticated user or API key over
   raw IP, since IPs are shared behind NAT and cheap for attackers to rotate.
4. **Keep counters in a shared store.** Hold state in Redis with atomic
   increments or a Lua script so the limit holds across every instance. A
   per-process counter effectively multiplies the limit by your replica
   count and protects nothing.
5. **Answer with 429 and a `Retry-After` header.** Return the standard
   status, tell honest clients when to come back, and expose
   `RateLimit-Remaining` so well-behaved integrations self-pace instead of
   retrying into the wall.
6. **Escalate responses by abuse tier.** Throttle a first offender, add a
   CAPTCHA or step-up on a suspicious pattern, and shadow-ban or block a
   confirmed abuser. Match friction to evidence so a fat-fingered user is not
   treated like a botnet.

## Litmus tests

- Does the limit cost more tokens for expensive endpoints than cheap ones?
- Does login limiting key on both account and source, defeating single-
  account brute force and single-IP spraying?
- Do counters survive across instances, or does adding a replica quietly
  raise the effective limit?
- Does a throttled response carry 429 and `Retry-After`, not a bare 500 or a
  silent drop?

## Boundaries

Rate limiting shapes traffic volume; it does not authenticate, authorize, or
distinguish a valid request from a malicious one that stays under the limit.
Volumetric network floods belong to a CDN or DDoS layer upstream, not the
application bucket. Tune thresholds against real traffic, since a limit set
by guesswork either lets abuse through or pages you about legitimate users.
