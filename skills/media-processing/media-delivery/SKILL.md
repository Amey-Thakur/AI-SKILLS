---
name: media-delivery
description: Serve media efficiently with caching, range requests, and access control, so playback starts fast and private files stay private. Use when media is slow to load or must be restricted to authorised users.
---

# Media delivery

Media delivery is mostly caching and mostly solved, until access control
enters and the usual approach of long-lived public URLs stops being
acceptable. The tension between cacheability and authorisation is the
real design problem.

## Method

1. **Serve from a CDN with long cache lifetimes.** Media is large and
   usually immutable, which is the ideal caching case (see
   cdn-strategy).
2. **Make URLs content-addressed or versioned.** Immutable URLs mean a
   change is a new URL, so caches never serve stale media (see
   http-caching).
3. **Support range requests.** Seeking in audio and video depends on
   them, and without range support a player must download everything
   before playing.
4. **Use signed, expiring URLs for private media.** They keep the CDN in
   the path while limiting access in time, which is the usual
   compromise between cacheability and control (see
   realtime-permissions).
5. **Never rely on unguessable URLs as access control.** Links leak
   through referrers, screenshots, and sharing, and an unguessable URL
   is public with extra steps.
6. **Preload deliberately.** The first visible image and the first video
   segment benefit; preloading everything competes with what the user
   actually needs now.
7. **Measure start time, not just throughput.** Time to first frame is
   what users perceive, and it depends on segment size and connection
   setup as much as bandwidth.

## Boundaries

Delivery optimisation cannot fix oversized source media, which is an
encoding problem (see image-optimization). Signed URLs still permit
sharing within their validity window. Regional performance varies, and
edge coverage is a property of the provider rather than the
configuration.
