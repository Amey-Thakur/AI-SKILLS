---
name: polling-vs-webhooks
description: Choose between pulling changes on a schedule and receiving pushed events, based on latency needs, reliability, and control. Use when deciding how to learn about changes in an external system.
---

# Polling versus webhooks

Push is efficient and unreliable; pull is wasteful and dependable. Most
robust integrations use both: webhooks for latency and polling for
reconciliation, because either alone has a failure mode you cannot
accept.

## Method

1. **Choose by latency requirement.** If minutes are acceptable, polling
   is simpler and needs no public endpoint. If seconds matter, webhooks
   are the only option.
2. **Recognise what polling costs.** Frequent polling wastes quota and
   scales badly with the number of watched resources (see
   rate-limit-handling).
3. **Recognise what webhooks cost.** A public endpoint to secure,
   verify, deduplicate, and monitor, which is real work (see
   webhook-consumption).
4. **Use both where correctness matters.** Webhooks for timeliness and a
   periodic poll to catch what was missed, which is the standard pattern
   for anything financial.
5. **Poll incrementally.** Use cursors or modified-since filters rather
   than fetching everything, since full polls do not scale.
6. **Back off when nothing changes.** Adaptive intervals reduce cost
   substantially on quiet resources.
7. **Handle the provider having neither.** Some APIs offer only a
   list endpoint, which forces polling and shapes what latency you can
   promise.

## Boundaries

Webhooks depend on your endpoint being reachable and are lost during
your downtime, which is exactly when you cannot afford it. Polling has a
latency floor set by the interval. Provider capability constrains the
choice more than preference does.
