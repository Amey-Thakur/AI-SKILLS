---
name: contract-testing
description: Verify a service boundary with a consumer-driven contract that records the payload the caller actually reads and that both sides check in CI. Use when two services deploy independently and an unannounced response change would silently break the consumer.
---

# Contract testing

Two services on separate release trains share an agreement that lives only in
each team's memory: the shape of the request and response between them. The
provider renames a field, ships green, and the consumer breaks in production
because no test in either repo covered the seam. A consumer-driven contract
writes that agreement down from the caller's side and forces the provider to
prove it still holds before merging.

## Method

1. **Generate the contract from the consumer's own expectations.** In a Pact
   consumer test, declare each interaction the code depends on, run the real
   client against the Pact mock, and let it emit a pact JSON file naming only
   the fields the consumer reads.
2. **Match on type and structure, not literal values.** Wrap fields in
   `like()`, `eachLike()`, and `regex()` so the contract pins shape while a
   changing timestamp or generated ID does not turn every payload into a false
   failure.
3. **Publish the pact to a broker keyed by version.** Run `pact-broker publish`
   tagged with the consumer's git SHA and branch, so the provider can fetch
   exactly the contracts its live consumers rely on.
4. **Verify on the provider in CI.** The provider replays each recorded request
   against its real endpoints and fails the build if any response no longer
   matches, seeding data through a state handler per interaction.
5. **Gate deploys with can-i-deploy.** Before releasing either side, run
   `pact-broker can-i-deploy --pacticipant X --version <sha>` so you ship only
   when every dependent contract is verified against that exact version.
6. **Evolve additively.** Add response fields freely, since an unread field
   leaves contracts green; a rename or removal waits until no consumer contract
   references the old name, which the broker lets you confirm.

## Signals

- Does the contract name only fields the consumer actually reads?
- Would renaming an unconsumed field leave the provider's verification green?
- Does can-i-deploy block a release when a consumer's pact is unverified?

## Boundaries

Contracts pin message shape and semantics at one hop, not correctness across a
chain of services: use integration-testing or e2e-testing for full flows. They
pay off only when both sides run verification in CI, since an unverified
contract is just documentation. For the detailed provider-side replay setup,
defer to pact-verification. A public API with unknown consumers is better served
by schema and version discipline than by consumer pacts.
