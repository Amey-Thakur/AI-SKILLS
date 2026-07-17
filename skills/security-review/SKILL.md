---
name: security-review
description: Review code for the vulnerabilities that actually get exploited, ranked by real risk with concrete attack scenarios. Use when reviewing changes that touch input handling, auth, secrets, files, queries, or network calls.
---

# Security review

Audit the paths an attacker would walk, not a checklist. Every finding needs
a concrete attack scenario; if you cannot describe the attack, it is a
hardening suggestion, not a vulnerability.

## Method

1. **Map the trust boundaries first.** Where does data enter from outside
   (requests, files, env, third-party APIs, user uploads)? Where does the
   code do something privileged (queries, shell, filesystem, network,
   crypto, money)? Vulnerabilities live on paths from the first list to the
   second.
2. **Walk each path hunting the classics, in payoff order:**
   - Injection: user input reaching SQL, shell, path, template, or eval
     without parameterization or strict validation. String concatenation
     into any interpreter is guilty until proven safe.
   - Broken auth and authz: endpoints missing permission checks, ids taken
     from the client without ownership verification (IDOR), tokens that
     never expire, secrets compared with string equality.
   - Secrets in the wrong place: keys in code, tokens in logs, credentials
     in error messages or URLs.
   - Unsafe deserialization and parsing of untrusted data.
   - SSRF: user-influenced URLs fetched by the server without a host
     allowlist; redirects and DNS tricks bypass naive checks.
   - Path traversal: filenames from users joined into paths without
     canonicalization checks.
   - Missing limits: unbounded sizes, counts, depths, and rates, each a
     denial of service on a timer.
3. **Verify each candidate.** Construct the input and the resulting damage:
   "a filename of ../../etc/cron.d/x writes outside the upload dir". If the
   framework already neutralizes it, say so and move on; false alarms
   erode trust in real ones.
4. **Rank by exploitability times damage.** Remote unauthenticated beats
   authenticated; data theft and code execution beat information leaks.
   Report the worst first, with the fix that closes the class, not just
   the instance: parameterize everywhere, not just this query.

## Rules

- Never write working exploit payloads into the report beyond the minimum
  needed to demonstrate the flaw to the maintainer.
- Dependency risk counts: flag known-vulnerable versions when visible, but
  do not speculate about CVEs from memory without checking.
- Absence of findings is a real result. Say "no injection paths found in
  the reviewed surface" and name what you did not review.
