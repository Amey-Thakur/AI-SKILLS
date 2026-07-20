---
name: mobile-observability
description: Instrument mobile apps for crash-free rate, ANR and hang detection, and release health you can gate rollouts on. Use when setting up mobile monitoring or deciding whether a release is healthy enough to expand.
---

# Mobile observability

You cannot attach a debugger to a customer's phone. Observability is the
replacement: every question you will ask during an incident must be
answered by data the app already ships home.

## Method

1. **Anchor on crash-free sessions.** Crash-free sessions (not users) is
   the rollout gate metric; set a floor (99.5% is a common bar) and halt
   expansion below it. Track it per release version, since blends hide a
   bad build behind a good installed base.
2. **Symbolicate everything, automatically.** Upload dSYMs / mapping files
   in CI for every build, including bitcode-stripped and R8-minified ones.
   An unsymbolicated stack trace is a support ticket, not a diagnosis.
3. **Watch responsiveness, not just crashes.** Android ANRs and iOS hangs
   (main thread blocked > ~250ms) hurt more users than crashes and are
   store-ranking inputs. Instrument startup time (cold and warm), frame
   drops on the key scrolling surfaces, and the p95 of your three
   business-critical flows.
4. **Ship breadcrumbs, scrub PII.** Navigation events, network failures,
   and flag states attached to each crash report reconstruct the path into
   the failure. Strip tokens, emails, and free-text user content at the
   SDK layer; observability must not become a data-leak vector.
5. **Segment before you debug.** Every metric sliced by app version, OS
   version, device class, and network type; most "mystery" regressions are
   one OS release or one low-memory device tier. An on-demand log-level
   bump via remote flag turns a reproducing user into a trace without a
   new build.
6. **Alert on releases, not noise.** Page on: new crash signature trending
   in the latest version, crash-free rate crossing the floor, ANR rate
   above the store's bad-behavior threshold. Everything else is a
   dashboard reviewed at rollout checkpoints.

## Boundaries

- Session replay and screen recording carry consent and privacy weight;
  involve legal review before enabling them, and never in auth or payment
  flows.
- Offline and low-end devices delay telemetry; judge a rollout on 24h of
  data, not the first hour.
- Observability tells you what broke, not why users leave; product
  analytics is a separate discipline with separate consent.
