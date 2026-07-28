---
name: media-storage-tiering
description: Match storage class to access pattern so rarely read media costs less without becoming unavailable. Use when media storage cost grows faster than usage.
---

# Media storage tiering

Media accumulates and is read on a sharply decaying curve: most files
are accessed heavily for days and almost never afterwards. Paying hot
storage prices for cold data forever is the default and is usually the
largest avoidable cost in a media product.

## Method

1. **Measure the access curve before designing tiers.** How access
   decays with age determines the transition points, and guessing
   produces either retrieval fees or no savings.
2. **Transition by age and access, automatically.** Lifecycle rules that
   move objects without application involvement, since manual tiering
   does not happen.
3. **Understand the retrieval cost and latency of each tier.** Archive
   tiers are dramatically cheaper to store and expensive and slow to
   read, which is fine for backups and wrong for anything a user might
   open.
4. **Keep derived assets hot even when originals are cold.** Thumbnails
   and streaming renditions are what get served, so they stay
   accessible while the source archives (see thumbnail-generation).
5. **Check minimum duration charges.** Cold tiers bill a minimum
   retention, so moving short-lived objects there costs more than
   leaving them.
6. **Delete rather than archive where policy allows.** The cheapest
   storage is none, and retention policy should be set deliberately (see
   right-to-erasure).
7. **Monitor cost per tier and per feature.** Aggregate storage cost
   hides which feature is responsible for the growth.

## Boundaries

Tiering optimises cost against access latency; it cannot make cold data
fast. Retrieval charges can exceed the storage savings if the access
pattern was misjudged. Legal retention requirements may dictate storage
class and duration regardless of cost (see data-classification).
