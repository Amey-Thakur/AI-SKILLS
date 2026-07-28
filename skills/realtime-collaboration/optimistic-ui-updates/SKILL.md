---
name: optimistic-ui-updates
description: Apply changes locally before the server confirms, then reconcile or roll back honestly when it does not. Use when latency makes a correct-but-slow interface feel broken.
---

# Optimistic UI updates

Waiting for a round trip makes an interface feel dead. Applying the
change immediately makes it feel instant, at the cost of occasionally
being wrong, and the entire discipline is in how you handle being wrong.

## Method

1. **Apply optimistically only where failure is unlikely and reversible.**
   Toggling a setting yes; charging a card no. The rule is whether an
   incorrect display would mislead the user into a consequential
   decision.
2. **Keep the pending state distinguishable internally.** The renderer
   may show it as done while the model knows it is unconfirmed, which is
   what makes rollback possible.
3. **Reconcile with the server's response, do not just accept it.** The
   authoritative result may differ in ways beyond success, such as a
   normalised value or a server-assigned id.
4. **Roll back visibly and explain.** A silent revert makes users
   believe they imagined the action; say what failed and offer a retry
   (see error-boundaries-ui).
5. **Preserve user input on failure.** Whatever they typed must survive
   the rollback, since retyping is the most infuriating possible
   outcome.
6. **Handle ordering of concurrent optimistic updates.** Two rapid
   changes to the same field can resolve out of order, so the last
   intent must win rather than the last response.
7. **Set a timeout for the unconfirmed state.** An update pending
   forever is a silent failure, and after a bounded wait it becomes an
   error the user can act on.

## Boundaries

- Optimistic updates hide latency; they do not make the system faster
  and they add reconciliation complexity.
- They are wrong for anything with financial, legal, or irreversible
  consequence (see payment-integration).
- Multi-user contexts complicate rollback, since others may have seen
  and acted on the optimistic state (see collaborative-editing-models).
