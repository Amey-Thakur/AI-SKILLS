---
name: open-source-review-board
description: Run an open source review board that gates incoming dependencies on license compatibility, sets the policy for contributing back, and requires a security review before adoption. Use when an organization needs consistent control over which OSS it pulls in and what it publishes.
---

# Open source review board

An OSS review board is how a company keeps open source from becoming a legal and
security liability it discovers too late. It fails when it is either a bottleneck
everyone routes around or a rubber stamp that approves by default: dependencies
arrive with incompatible licenses, employees push code to public repos with no
policy, and a known-vulnerable package sits in the build because no one checked.
The board's job is to make the safe path the easy path.

## Method

1. **Gate every new dependency on license compatibility first.** Maintain an
   allow list and a deny list by license: permissive licenses like MIT, BSD, and
   Apache 2.0 usually clear; strong copyleft like GPL and AGPL needs review against
   how you distribute; anything unlicensed or with a custom license stops for a
   human. Automate the check in CI so the gate runs on every pull request, not on
   memory.
2. **Watch for license traps beyond the headline.** Attribution requirements,
   patent clauses, the AGPL network-use trigger, and the difference between linking
   and bundling. A permissive-looking package with a transitive GPL dependency is
   still a problem. The board reads the actual terms, not the badge on the README.
3. **Require a security review scaled to the dependency's reach.** Scan with
   something like an SCA tool or dependency scanner for known CVEs, then judge the
   project's health: maintenance activity, how fast it patches, single-maintainer
   risk, and how much of your attack surface it touches. A parser handling
   untrusted input earns a harder look than a build-time formatter.
4. **Set an explicit policy for contributing back.** Decide when employees may
   submit patches upstream, who signs the contributor license agreement, and what
   must be cleared before company code goes public. A clear yes-with-guardrails
   beats a vague no that engineers quietly ignore.
5. **Govern what you publish as its own decision.** Releasing an internal project
   as open source needs a license choice, a security scrub for secrets and
   internal references, a trademark check, and an owner for maintenance. Publishing
   is a commitment, not a giveaway; unowned public repos rot into liabilities.
6. **Keep an inventory and re-scan continuously.** Maintain a software bill of
   materials so you know what you depend on, and re-run scans as new CVEs land. A
   dependency that was clean at adoption can become the next incident; approval is
   a moment, exposure is ongoing.

## Signals

- Does license checking run automatically in CI, or rely on someone remembering?
- Is the security review proportional to what the dependency can touch?
- Can you produce a current inventory of every OSS package you ship?

## Boundaries

This governs adoption, contribution, and publication policy; it does not write the
code or decide the architecture that needed the dependency. License interpretation
at the edges is a legal judgment: escalate genuinely ambiguous or high-stakes terms
to counsel rather than settling them at the board.
