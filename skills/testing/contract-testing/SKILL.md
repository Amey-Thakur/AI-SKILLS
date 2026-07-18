---
name: contract-testing
description: Pin the request and response shape at a service boundary with a consumer-driven contract that both sides verify in CI. Use when two services deploy independently and an unannounced payload change would break the caller.
---

# Contract testing

Two services that release on their own schedules share a payload format that
lives only in each team's head. The provider renames a field, ships green, and
the consumer breaks in production because no test in either repo covered the
boundary between them. A consumer-driven contract turns the consumer's real
expectations into a file the provider must satisfy before it can merge.

## Method

1. **Generate the contract from the consumer's own test.** Run the consumer
   test against a mock provider using Pact (pact-js, pact-python) or Spring
   Cloud Contract. Each interaction the test relies on serializes to a pact
   file listing the request and the exact response fields the consumer reads.
2. **Publish the pact to a broker, tagged by version.** Push it to a Pact
   Broker or PactFlow with the consumer's git SHA and branch. The broker
   becomes the single record of what every consumer version actually needs.
3. **Verify the provider against every active consumer contract.** In the
   provider's pipeline, replay each recorded request against the real provider
   with `pact-verifier` and assert the live response still matches the pact.
4. **Match on types and the values you branch on, not the whole body.** Use
   matchers (`like`, `eachLike`, `term`) so the provider can add fields freely
   while the build still fails on a removed or retyped field a consumer uses.
5. **Gate both deploys with can-i-deploy.** Before releasing either side, run
   `pact-broker can-i-deploy --pacticipant X --version SHA` so the broker
   confirms every consumer and provider pair in that environment is verified.
6. **Declare provider states for data-dependent responses.** Pair
   `given("order 42 exists")` with a provider hook that seeds that row, so the
   request verifies against a known fixture without a shared live database.

## Signals

- Does removing a field a consumer reads turn the provider's build red before
  the change can deploy?
- Can the provider add an optional field without breaking any contract?
- Does can-i-deploy block a release when a consumer has no verified pact in
  the target environment?

## Boundaries

Contracts pin message shape and semantics at one hop, not end-to-end behavior
across a chain of services: use e2e-testing for full flows. They only pay off
when both sides run verification in CI, since a contract nobody verifies is
just documentation. For a public API with unknown consumers, prefer schema and
version discipline over consumer-driven pacts.
