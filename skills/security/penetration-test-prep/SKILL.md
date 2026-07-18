---
name: penetration-test-prep
description: Prepare for a penetration test by fixing scope, rules, and access up front, then turn its findings into tracked, verified remediation. Use when commissioning an external pentest or acting on the report one delivered.
---

# Penetration test prep

A pentest is only worth its price if the scope is honest, the rules keep it
safe, and the findings actually get fixed and re-tested. The common failures
bracket the engagement: a vague scope that wastes days on the wrong assets, a
missing rules-of-engagement doc that turns a test into an outage, and a
report that lands in a drawer while the same holes stay open.

## Method

1. **Define scope as concrete assets, not adjectives.** List exact domains,
   IP ranges, API base URLs, mobile builds, and account tiers in and out of
   scope. "Our platform" invites the tester to guess; an explicit inventory
   plus named exclusions (third-party SaaS you cannot authorize) keeps the
   effort where it pays.
2. **Write rules of engagement before anyone connects.** Agree on the test
   window, permitted intensity, whether social engineering and denial-of-
   service are allowed, a data-handling clause for anything sensitive found,
   and an emergency stop contact. Get written authorization from the asset
   owner: testing without it is a crime, not a test.
3. **Choose the access model deliberately.** Decide black-box, gray-box, or
   white-box, and provision test accounts at each privilege level, staging
   credentials, and source or API docs accordingly. A gray-box test with real
   accounts finds authorization flaws a pure black-box run never reaches.
4. **Test against staging that mirrors production, or plan for production
   care.** Point testers at an environment with production-like config and
   seeded data, not live customer records. If production is in scope, agree on
   rate limits and a rollback plan so a payload does not corrupt real data.
5. **Triage findings by real risk, not the report's raw severity.** Re-rate
   each issue against your exposure and data sensitivity, deduplicate, and
   assign an owner and a due date proportional to severity. A "medium" on an
   internet-facing auth endpoint outranks a "high" behind a VPN.
6. **Remediate, then demand a retest of each fix.** Patch, and have the tester
   or your team verify the specific finding is closed, since a fix that
   addresses the symptom often leaves the class open. Track every item to
   closed in the same tracker as normal work.

## Litmus tests

- Could the tester list exactly which hosts and accounts are in scope from
  your brief alone?
- Is there signed authorization and a named emergency-stop contact before the
  window opens?
- Does each finding have an owner, a due date, and a retest, not just a
  severity label?
- Are the fixes verified closed rather than marked done on assertion?

## Boundaries

This covers commissioning and consuming a pentest, not performing one, and
not the continuous scanning and dependency work that should run between tests
(see dependency-auditing). A pentest is a point-in-time sample, not proof of
security: findings are a floor on your problems, never a ceiling.
