---
name: pact-verification
description: Verify a provider against its consumers' recorded pacts in CI so a breaking API change fails before it ships. Use when independently deployed services share an HTTP contract and you want to catch breaks without end-to-end staging.
---

# Pact verification

Consumer-driven contract testing records what each consumer actually needs
from a provider as a pact: a set of request and response expectations. The
value lands only when the provider replays those expectations against its real
code in CI. Skip that step and the pact is a stale document; run it on every
provider build and a removed field fails the pipeline instead of a customer.

## Method

1. **Publish consumer pacts to a broker, tagged by branch.** Have each consumer
   generate its pact in its own suite and push it to a Pact Broker or PactFlow
   with the consumer version and branch tag. The provider pulls pacts from the
   broker rather than a file copied between repos that goes stale.
2. **Run provider verification as a real CI job.** Add a step that replays every
   pact against a booted provider: `pact_verifier`, the JVM
   `PactVerificationTest`, or `@pact.verifier`. It sends each recorded request
   to your actual handlers and checks the response matches the contract.
3. **Wire provider states to real setup hooks.** A pact request like "given user
   42 exists" maps to a provider-state handler that seeds that row before the
   request runs. Implement each state to put the provider in exactly the
   precondition the consumer assumed, or verification passes against fiction.
4. **Publish verification results back to the broker.** Report pass or fail per
   pact with the provider version so the broker knows which consumer versions
   this provider satisfies. Those results are what `can-i-deploy` reads.
5. **Gate deploys with can-i-deploy.** Before releasing either side, run
   `pact-broker can-i-deploy --to-environment production`. It refuses the deploy
   unless a verified compatible pact exists between the versions heading to that
   environment, so a provider never ships ahead of a consumer it would break.
6. **Use pending pacts for new consumers.** Mark a brand-new consumer's pact
   pending so its unverified expectations do not redden the provider build
   while still surfacing what is coming. Promote it once the provider verifies
   it green.

## Checks

- Does deleting a response field the consumer reads turn the provider's
  verification job red, not just a downstream test hours later?
- Is every provider state in the pacts backed by a real setup hook, with no
  silent no-ops?
- Does can-i-deploy actually block a mismatched pair in CI, not just print a
  warning?

## Boundaries

Pacts cover the shape and semantics of a request and response contract, not
performance, authentication policy, or business correctness behind the
endpoint, which still need their own tests. This assumes HTTP or message pacts
between services you both control; a third-party API you cannot run
verification against needs a different check.
