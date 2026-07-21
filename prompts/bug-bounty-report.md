---
name: bug-bounty-report
description: Write a clear bug bounty vulnerability report a triager can reproduce and rate fast, with steps, impact, and a fix.
variables:
  - "{vulnerability}: what you found, where, and how you triggered it"
  - "{program}: the program, the affected asset/scope, and any required report format"
settings: "Temperature 0.2-0.4 for precision."
---

Write a bug bounty report for:

{vulnerability}

Program and scope: {program}

Structure the report so a triager can confirm it quickly:
- Title: the vulnerability type, the affected location, and the impact, in one
  line ("IDOR in /api/orders lets any user read others' invoices").
- Severity: an honest rating (CVSS or the program's scale) with the vector,
  justified by the real impact, not inflated.
- Affected asset: the exact in-scope endpoint, URL, parameter, or component.
- Summary: what the vulnerability is and why it matters, in a few sentences.
- Steps to reproduce: numbered, exact, complete: the precise requests,
  inputs, accounts, and preconditions needed to trigger it from a clean
  state. A triager should reproduce it by following these alone.
- Proof of concept: the minimal evidence that proves impact (request/response,
  screenshot, payload), with any real user data redacted.
- Impact: what an attacker gains and the business consequence, concretely.
- Remediation: a specific suggested fix.

Rules: precise and reproducible above all (an unclear report gets a valid bug
closed). Honest severity and impact: do not inflate, and do not claim more than
the PoC demonstrates. Professional and factual tone. Show only the minimal
proof; never include gratuitously exfiltrated data. Match the program's
required format if given. Mark any detail you have not provided (a real
request, an account) as a placeholder to fill before submitting.
