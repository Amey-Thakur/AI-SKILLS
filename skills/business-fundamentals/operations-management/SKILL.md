---
name: operations-management
description: Run repeatable delivery reliably by finding the constraint, reducing variability, and measuring flow rather than utilisation. Use when delivery is inconsistent or slower than the work itself requires.
---

# Operations management

Operations is the discipline of making a process reliably produce an
outcome. The counterintuitive core is that keeping everyone busy makes
throughput worse, because full utilisation guarantees queues.

## Method

1. **Find the constraint.** One step limits the throughput of the whole
   system, and improvement anywhere else changes nothing (see
   agent-workload-balancing).
2. **Protect and exploit the constraint.** It should never be idle or
   doing work that something else could do, which is where capacity
   comes from without spending.
3. **Measure flow time, not utilisation.** How long work takes end to
   end is what customers experience; high utilisation with long queues
   is a system performing badly.
4. **Reduce variability before adding capacity.** Inconsistent arrival
   or processing time creates queues even below full capacity, and
   smoothing is usually cheaper than expanding.
5. **Limit work in progress deliberately.** Less started simultaneously
   means faster completion, which contradicts intuition and is
   consistently true.
6. **Standardise the routine, escalate the exception.** Repeatable work
   follows a defined process; genuinely novel work is routed to
   judgement rather than forced through it.
7. **Make the process visible.** A queue nobody can see is a queue
   nobody manages, and visibility alone improves most processes.

## Boundaries

Operational efficiency serves delivery; optimising a process nobody
values is waste at higher speed. Standardisation reduces variability and
adaptability together, which is the wrong trade for creative work.
People are not machines, and utilisation targets applied to humans
damage both quality and retention.
