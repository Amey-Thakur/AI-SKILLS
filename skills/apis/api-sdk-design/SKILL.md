---
name: api-sdk-design
description: Design SDKs that feel idiomatic per language, handle auth and resilience, and version cleanly. Use when building an official client library for your API.
---

# API SDK design

An SDK is the experience most developers have of your API; a good one
makes integration a pleasure and a bad one sends them to a competitor.
It must feel native in each target language, handle the hard parts
(auth, retries, pagination) invisibly, and evolve without breaking the
apps built on it.

## Method

1. **Feel idiomatic in each language.** An SDK should read
   like code written for that language: Pythonic in Python,
   idiomatic Go in Go (see kotlin-idioms, go-project-layout
   for what "idiomatic" means per language), naming and
   patterns matching the ecosystem's conventions. A
   thin transliteration of one language's SDK into another
   (Java-style getters in Python) reads as foreign and
   fights the user's instincts.
2. **Handle auth and resilience so users do not.** Token
   management and refresh (see oauth-flows), retries with
   backoff, timeouts, connection pooling, and rate-limit
   respect built in with sensible defaults (see api-client-
   design: the SDK is the definitive client): the user
   configures credentials and gets a robust integration.
   Making users implement resilience themselves guarantees
   most integrations do it badly.
3. **Make the common case one obvious line, the rare case
   possible.** The 90% use case (create a resource, list
   with pagination) is trivial and discoverable
   (auto-complete-friendly, see api-surface-minimalism);
   advanced control (custom retries, raw response access,
   timeouts per call) is available without cluttering the
   simple path. Progressive disclosure: simple by default,
   powerful when needed.
4. **Design types and errors for the language's tools.**
   Typed models (so IDEs autocomplete and type-checkers
   catch mistakes: see type-safety), typed errors matching
   the language's error idiom (exceptions in Python/Java,
   Result/error returns in Go/Rust: see rust-error-handling,
   api-error-responses), and null/optional handling that
   fits the language (see null-handling). The SDK's types
   are a large part of its usability.
5. **Version the SDK with clear compatibility.** Semantic
   versioning (see release-tagging), backward-compatible
   evolution (additive: see api-change-management), and a
   clear policy for breaking changes with migration guides
   (see api-deprecation): apps depend on your SDK, so a
   careless breaking change breaks them all. Decouple SDK
   version from API version thoughtfully (an SDK may
   support multiple API versions).
6. **Choose generated, hand-written, or hybrid
   deliberately.** Generated SDKs (from OpenAPI/proto: see
   openapi-contracts) scale to many languages and stay in
   sync with the API but can feel mechanical; hand-written
   feel better but cost per language; hybrid (generated
   core, hand-written ergonomic layer) is common. Match the
   choice to how many languages you support and how much
   polish the audience expects.

## Boundaries

- SDK quality directly affects adoption (developer
  marketing: see developer-marketing); it is worth real
  investment for a public API, less for an internal one
  with a captive audience. Match effort to reach.
- The SDK is documentation's most-used form (developers
  read the SDK's methods and types more than the prose
  docs); good naming and types are documentation (see
  api-reference-docs, naming-things).
- Maintaining SDKs across many languages is a real ongoing
  cost (each needs updates per API change, testing,
  releases); generation reduces but does not eliminate it.
  Budget for the languages you commit to.
