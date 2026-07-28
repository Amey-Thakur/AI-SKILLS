---
name: realtime-testing
description: Test collaborative features against concurrency, reconnection, and ordering rather than only the single-user path. Use when a realtime feature works in development and breaks with real users.
---

# Realtime testing

Single-client tests pass on collaborative systems that are deeply
broken, because the bugs live in interleaving, reconnection, and
ordering. Testing has to create those conditions deliberately, since
they rarely occur on a developer's fast local network.

## Method

1. **Drive multiple clients in one test.** Two or more simulated
   participants acting on the same document is the minimum bar for a
   meaningful collaborative test.
2. **Force concurrent edits at the same position.** Simultaneous
   insertion at one anchor is the canonical hard case and should be a
   standing test rather than a manual check.
3. **Simulate the network honestly.** Latency, jitter, packet loss, and
   full disconnection, because a local test on localhost exercises none
   of the failure paths (see offline-sync).
4. **Assert convergence, not equality of steps.** All clients must end
   in the same state; the order they got there is not the property under
   test.
5. **Test reconnection with queued work.** Disconnect mid-edit, keep
   editing, reconnect, and verify nothing is lost or duplicated.
6. **Include server restart in the suite.** Deploys happen during active
   sessions, and room migration is where state is most often lost (see
   realtime-scaling).
7. **Run a randomised soak.** Generating random concurrent operations
   over many iterations finds interleavings no hand-written case
   anticipates (see property-based-testing).

## Boundaries

- Tests demonstrate convergence for the cases exercised; they cannot
  prove an algorithm correct.
- Simulated networks approximate real ones and miss mobile-specific
  behaviour such as radio state transitions.
- Realistic multi-client tests are slow and flaky-prone, so they need
  care to stay trustworthy (see flaky-test-management).
