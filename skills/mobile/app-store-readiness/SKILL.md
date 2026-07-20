---
name: app-store-readiness
description: Pass App Store and Play review on the first attempt and recover fast from rejections. Use when preparing a mobile submission, writing store metadata, or responding to a review rejection.
---

# App store readiness

Review is a checklist you can run yourself before Apple or Google does.
Most rejections are self-inflicted: a broken demo login, an undeclared
permission, metadata that oversells.

## Method

1. **Sweep the known landmines.** Sign-in-with-Apple required if you offer
   third-party login (iOS); in-app purchase required for digital goods (no
   external payment links); account deletion must be reachable in-app;
   every permission prompt needs a purpose string that names the feature.
   Each of these alone is a rejection.
2. **Make the reviewer's path frictionless.** A working demo account in
   the review notes, backend up during the review window, and a one-line
   explanation of anything non-obvious (hardware needs, region-locked
   content, background modes). Reviewers reject what they cannot exercise.
3. **Complete the data declarations honestly.** Privacy nutrition labels
   (iOS) and Data safety (Play) must match what your SDKs actually
   collect; crash and analytics SDKs count. A mismatch found later forces
   an emergency resubmission.
4. **Treat metadata as conversion surface within the rules.** Title and
   subtitle carry the keywords; screenshots show the product's real UI
   (mockups that misrepresent get rejected); the first two screenshots
   decide the install. No competitor names, no "best" claims, no platform
   names in titles.
5. **Stage the rollout controls before submitting.** Phased release
   enabled, release notes written for users (not commit logs), and the
   build already tested through TestFlight / internal track by real
   devices, not only simulators.
6. **On rejection, respond surgically.** Read the cited guideline number,
   reply in Resolution Center with facts or fix exactly what is cited, and
   resubmit. Argue only when the reviewer misunderstood the app, and
   attach a screen recording proving it; escalate to App Review Board /
   Play policy support when a human loop is stuck.

## Boundaries

- Review times and enforcement vary; never commit a public launch date to
  a build that has not passed review.
- This does not cover legal compliance (COPPA, GDPR, export); store
  approval is not legal clearance.
- Guidelines change quarterly; before each major submission, re-check the
  current review guidelines rather than trusting this list as complete.
