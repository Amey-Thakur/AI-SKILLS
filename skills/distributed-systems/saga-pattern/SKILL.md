---
name: saga-pattern
description: Coordinate multi-service transactions as a sequence of local steps with compensations, timeouts, and an observable state machine. Use when a business flow spans services and two-phase commit is not on the table.
---

# Saga pattern

A saga replaces the impossible distributed transaction with a sequence
of local transactions, each paired with a compensation that semantically
undoes it. The saga's job is to end in a consistent state: all steps
done, or all done-steps compensated.

## Method

1. **Write the flow as steps and compensations first.**
   `reserve_inventory / release_inventory`, `charge_card / refund_card`,
   `create_shipment / cancel_shipment`. A step without a workable
   compensation (an email cannot be unsent) must move to the end of the
   sequence, become reversible by design, or downgrade the whole flow's
   guarantee: decide before building.
2. **Choose orchestration for flows with real logic.** An orchestrator
   (explicit state machine: a saga row plus a driver, or a workflow
   engine) commands each service and records progress; the flow is
   readable and debuggable in one place. Choreography (each service
   reacts to the previous event) suits 2-3 step linear flows; beyond
   that, nobody can answer "where is order 123 stuck".
3. **Persist the saga state transactionally.** The saga instance
   (id, current step, status, per-step results) is durable, updated in
   the same transaction as each command dispatch (see
   transactional-outbox). Crash recovery = reload unfinished sagas and
   resume; a saga living in process memory dies with the process.
4. **Every step is idempotent and keyed by the saga.** Steps and
   compensations carry the saga id as idempotency key (see
   idempotency-keys), because timeouts force re-sends and a step may
   have executed before the ack was lost. Compensations too: refunds
   retried must not double-refund.
5. **Time-box every step; on failure, run compensations in reverse.**
   No reply within the step's deadline = failure (pessimistic), then
   compensate completed steps in reverse order, retrying compensations
   until they succeed (they must be designed to always eventually
   succeed). A compensation that can permanently fail parks the saga in
   a dead-letter state with an alert and a human runbook.
6. **Expose saga status.** A queryable status endpoint per flow
   instance and metrics on stuck/aged sagas. Pending states are user
   visible ("payment processing"): design the UX for in-flight and
   compensated outcomes, since the flow is not atomic and users will
   see the middle.

## Boundaries

- Sagas give atomicity-eventually, not isolation: other requests
  observe intermediate states (inventory reserved, order not yet
  confirmed). Where interleaving harms, add semantic locks
  (status = pending) rather than pretending isolation exists.
- If all steps live in one database, use one transaction; a saga there
  is ceremony.
- Long-lived human-in-the-loop flows (days, approvals) fit workflow
  engines with timers and signals; hand-rolling those on cron is how
  sagas rot.
