---
name: sdk-selection
description: Decide between a provider's SDK and direct HTTP calls, weighing convenience against dependency weight and control. Use when starting an integration.
---

# SDK selection

An official SDK saves real work and adds a dependency with its own
release cycle, transitive packages, and opinions. Direct HTTP is more
work up front and leaves you in control of every detail.

## Method

1. **Prefer the official SDK for complex protocols.** Signed requests,
   multipart uploads, and streaming are where hand-rolling produces
   subtle bugs (see payment-integration).
2. **Use direct HTTP for simple, stable endpoints.** A handful of REST
   calls does not justify a dependency tree.
3. **Inspect the dependency weight before adopting.** Some SDKs pull in
   dozens of packages, expanding your supply chain surface (see
   supply-chain-security).
4. **Check the SDK's own behaviour.** Its default retry, timeout, and
   error handling may conflict with your resilience strategy and is
   often undocumented (see integration-resilience).
5. **Wrap it regardless.** Even an SDK belongs behind your own
   interface, so a change of SDK or provider is contained (see
   third-party-integration).
6. **Verify maintenance status.** An abandoned SDK becomes your
   maintenance burden with none of the control (see
   forking-and-vendoring).
7. **Check language and version support.** Official does not mean
   equally maintained across languages, and secondary SDKs lag.

## Boundaries

SDKs abstract the API and hide behaviour you may need to control.
Direct HTTP means implementing authentication and pagination yourself.
Either way the provider's semantics govern, and the SDK is a convenience
rather than a contract.
