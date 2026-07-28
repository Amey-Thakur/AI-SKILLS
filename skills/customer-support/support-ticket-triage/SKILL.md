---
name: support-ticket-triage
description: Sort incoming tickets by urgency and type so the ones that matter are answered first and nothing sits unread. Use when volume exceeds what can be handled in arrival order.
---

# Support ticket triage

First-in-first-out is the wrong order for support. A payment failure and
a feature question are not equally urgent, and treating them the same
means the urgent one waits behind the trivial one. Triage is the routing
decision made before anyone starts typing.

## Method

1. **Separate urgency from importance.** Urgency is how fast it must be
   answered; importance is how much it matters. A blocked customer is
   urgent; a thoughtful feature request is important and can wait.
2. **Classify by what the customer cannot do.** Cannot pay, cannot log
   in, cannot use the core feature, and cosmetic, roughly in that order.
   This ordering survives disagreement better than a severity matrix.
3. **Route by required knowledge, not by queue length.** A ticket needing
   a specialist wastes time bouncing through generalists first.
4. **Detect the signals that change priority.** Multiple reports of the
   same thing means an incident rather than a ticket, and it should
   leave the queue entirely (see agent-incident-response-team).
5. **Set and publish response targets per class.** Internal targets that
   nobody sees produce inconsistency; published ones create
   accountability both ways.
6. **Acknowledge everything quickly, even without an answer.** A holding
   reply with a realistic timeframe prevents the follow-up ticket that
   doubles the work.
7. **Review the classification weekly.** Mistriaged tickets show where
   the categories do not match reality.

## Boundaries

Triage orders work; it does not create capacity, and a permanently
overloaded queue needs staffing or deflection rather than better
sorting. Automated classification is imperfect and needs an easy
override. Some tickets are misfiled by customers and reclassification
must be routine rather than exceptional.
