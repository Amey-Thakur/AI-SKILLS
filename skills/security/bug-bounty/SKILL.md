---
name: bug-bounty
description: Hunt vulnerabilities in bug bounty programs effectively and within the rules: scope, methodology, safe proof, and reports that get accepted. Use when participating in a bug bounty or coordinated disclosure program.
---

# Bug bounty

A bug bounty is authorized security testing under a program's rules, for a
reward. The rules are the whole game: staying in scope keeps it legal and
paid, and a clear report is what turns a finding into a bounty. Skill is
hunting efficiently where the value is, then reporting it so a triager can
confirm it in minutes.

## Method

1. **Read the scope and rules before touching anything.** The program's
   policy defines in-scope assets, explicitly out-of-scope targets,
   permitted testing, and the safe-harbor terms that make your testing
   legal. Testing outside scope is unauthorized access, not research, with
   real legal consequences (see penetration-test-prep's authorization
   ethic). Know the rules cold first.
2. **Recon and map within scope.** Enumerate the in-scope surface
   (subdomains, endpoints, APIs, parameters, roles, features), understand
   the application's logic and trust boundaries (see threat-modeling), and
   prioritize where bugs and value concentrate: authentication, access
   control, input handling, and business logic.
3. **Hunt by vulnerability class and by what the program pays for.** Work
   systematically through the high-value classes: broken access control and
   IDOR, injection (SQL, command, SSRF: see the defense skills for what to
   probe), authentication and session flaws, and business-logic abuse
   (often the highest-impact and least-duplicated). Chain low-severity bugs
   into higher-impact findings where possible.
4. **Prove it with a minimal, safe PoC.** Demonstrate the vulnerability with
   the least intrusive proof: enough to confirm impact, never more. Do not
   exfiltrate real user data beyond a redacted proof, do not pivot deeper,
   do not degrade or destroy anything, and stop the moment impact is proven.
   Over-exploiting turns a valid finding into a rules violation.
5. **Check for duplicates and inflated severity.** Rate impact honestly
   against the real attacker gain and the program's scale (see
   vulnerability-triage's severity thinking); inflated reports lose
   credibility. Search your own history and the program's disclosed reports
   to avoid known duplicates, and report distinct issues separately.
6. **Report so a triager can reproduce it fast.** A clear title, honest
   severity, the exact affected asset, numbered reproduction steps, a PoC,
   the concrete impact, and a remediation suggestion (see the
   bug-bounty-report prompt). The report's quality determines whether a real
   bug is accepted, deduped, or closed as unclear. Then follow the program's
   coordinated-disclosure timeline; do not go public early.

## Boundaries

- This is authorized testing under a specific program's scope only; it is
  not a license to attack systems you are not invited to test. Out-of-scope
  or no-program testing is illegal regardless of intent (see the
  authorization requirement in penetration-test-prep).
- Never cause harm: no destructive testing, no accessing or exfiltrating
  real user data beyond minimal proof, no denial of service unless the
  program explicitly permits it. Stop at proof of impact.
- Responsible disclosure is binding: follow the program's timeline and
  channel, do not disclose publicly before coordination, and do not use a
  finding for anything but the report (see security-incident-response for
  the defender's side).
