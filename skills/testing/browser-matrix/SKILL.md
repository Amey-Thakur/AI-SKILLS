---
name: browser-matrix
description: Choose which browsers, versions, and devices to test from real usage data instead of habit or a vendor's full grid. Use when cross-browser testing time or budget is finite and the matrix needs to reflect who actually visits.
---

# Browser matrix

A browser matrix is the set of browser, version, and device combinations you
commit to testing. Test everything and each run costs hours and a device-cloud
bill; test only your own laptop and a Safari-only bug reaches a third of your
traffic. The matrix should be derived from who actually loads the product,
reviewed on a schedule, not copied from a template that still lists IE11.

## Method

1. **Pull real shares from your own analytics.** Export browser, version, OS,
   and device from your analytics (GA4, Plausible, server logs) for the last
   90 days, weighted by sessions and by conversions if you have them. Decide
   against your traffic, not global StatCounter numbers that do not match your
   audience.
2. **Set an explicit coverage threshold.** Pick a cumulative share you will
   support, commonly every combination down to the long tail that sums to
   95-98% of sessions. Everything below the line is best-effort, not a release
   blocker, and you write that down so it is a decision, not an accident.
3. **Test engines first, then the versions that differ.** Cover the three
   engines (Blink, WebKit, Gecko) at minimum, since most rendering bugs are
   engine-level. Add specific versions only where behavior actually splits: the
   current and previous release, plus any version with an outsized share.
4. **Treat mobile Safari and low-end Android as first-class.** Real iOS Safari
   on a device catches touch, viewport, and input bugs a desktop WebKit
   emulation misses. Include at least one throttled low-end Android profile,
   since a fast dev phone hides jank a mid-tier device shows.
5. **Split the tiers by cost.** Run the top few high-share combinations on every
   pull request; run the full supported matrix nightly or pre-release on
   BrowserStack, Sauce Labs, or a Playwright device grid. Pre-merge speed and
   full coverage are different jobs.
6. **Re-derive the matrix on a schedule and on signal.** Revisit shares
   quarterly and whenever an engine ships a major version or your audience
   shifts (a new region, a mobile campaign). Drop combinations that fell below
   the threshold so the grid shrinks as well as grows.

## Signals

- Can you name the traffic share each row in your matrix defends?
- Does the matrix include a real mobile device, not only a resized desktop
  window?
- Is there a written line below which a browser is explicitly out of scope?

## Boundaries

This picks the targets; writing the cross-browser tests themselves is
e2e-testing's domain. Accessibility and assistive-technology coverage follow
their own matrix of screen readers and are not replaced by this one. Legal or
contractual support requirements override usage data when they exist.
