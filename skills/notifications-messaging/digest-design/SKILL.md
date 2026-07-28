---
name: digest-design
description: Batch many low-urgency events into one periodic summary that is worth opening, rather than sending each as it happens. Use when individual events are too frequent or too minor to interrupt.
---

# Digest design

A digest converts a stream of interruptions into one scheduled read. It
works when the content is genuinely worth the open and fails when it is
a list of everything that happened, which is a log rather than a digest.

## Method

1. **Summarise, do not enumerate.** The most important few items with
   context, then a count of the rest. A complete list is a database
   dump.
2. **Order by relevance to this person.** Their mentions and their
   items first, general activity after, because personal relevance is
   what gets a digest opened twice.
3. **Pick a cadence matching the content's half-life.** Daily for work
   that moves daily, weekly for slower material. A digest arriving after
   the content is stale is worse than none.
4. **Skip empty and thin digests.** Sending nothing when there is
   nothing to say is a feature, and a digest with one trivial item
   trains people to stop opening.
5. **Make the subject line carry the value.** Most digests are judged
   without opening, so the single most important item belongs in the
   subject.
6. **Deep link every item.** Straight to the thing, not to a home
   screen, since a digest is an index into the product.
7. **Let people choose cadence, including off.** Frequency is the most
   commonly wanted control and the most commonly missing.

## Boundaries

Digests suit low-urgency information; anything needing action within
hours must not be batched (see notification-strategy). Personalised
digests need per-user processing that scales differently from broadcast.
Time zones determine when a digest is useful, so scheduling is
per-user, not per-server (see quiet-hours-and-timing).
