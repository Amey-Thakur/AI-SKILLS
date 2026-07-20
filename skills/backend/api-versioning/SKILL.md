---
name: api-versioning
description: Version APIs so existing clients keep working while the contract evolves, with a real sunset process. Use when choosing a versioning scheme or planning a breaking API change.
---

# API versioning

The best version strategy is needing versions rarely: evolve additively,
and when you must break, break loudly, once, with a long runway.

## Method

1. **Exhaust additive evolution first.** New optional fields, new
   endpoints, new enum values (documented as open sets) are not breaking.
   Removing, renaming, retyping, tightening validation, changing defaults
   or error codes are. Keep the taxonomy written down where reviewers see
   it (see api-change-management).
2. **Pick URL-path versioning unless you have a reason.** `/v1/orders`
   is visible in logs, testable in a browser, cacheable, and impossible
   to send by accident. Header/date-based versioning (Stripe-style
   pinning) is strictly better ergonomics at much higher implementation
   cost; choose it deliberately, not aspirationally.
3. **Version the whole surface, not per endpoint.** `/v1/orders` with
   `/v2/refunds` forces every client to carry a compatibility matrix.
   One version number, moved rarely.
4. **Keep old versions thin, not forked.** Implement vN-1 as a translation
   layer over the vN core (request/response adapters), or the old version
   stops getting bug fixes and becomes a second product.
5. **Run sunsets as a program.** Announce with dates; emit
   `Deprecation` and `Sunset` headers; instrument per-client version
   usage; contact the top consumers directly; brown-out (planned short
   outages) before the final cut. A version you cannot measure usage of
   is a version you can never remove.
6. **Give every response a version fingerprint.** Echo the resolved
   version in a header so support tickets and logs are unambiguous about
   what contract the client saw.

## Boundaries

- Internal APIs with deployable consumers usually need coordinated
  releases, not versions; versioning is for clients you do not control.
- Do not use versions as a feature-flag system; flags gate features
  inside a contract, versions change the contract.
- Event and webhook payloads version separately from the request API and
  are easier to break by accident; apply the same additive-only rule
  there (see webhooks-design).
