---
name: security-development-lifecycle
description: Apply Microsoft's Security Development Lifecycle so threat modeling, tooling, and sign-off are built into each phase instead of bolted on before ship. Use when building or shipping software that takes untrusted input or handles sensitive data and you need a repeatable security process, not a one-time audit.
---

# Security development lifecycle

Microsoft's SDL exists because security defects found at release are the ones
that were never designed against. The framework spreads specific obligations
across the phases, from requirements to response, so each gate catches a class
of flaw at the point where fixing it is cheap. Run it as a checklist at the end
and it becomes paperwork; run it as gates and it changes what ships.

## Method

1. **Set the bug bar and security requirements up front.** Before design, define
   the SDL bug bar: the severity thresholds that block release, and which
   vulnerability classes are never acceptable. Add security and privacy
   requirements to the backlog as tracked, owned work, not aspirations.
2. **Threat model every design.** Draw the data flow diagram, mark trust
   boundaries, and walk STRIDE (spoofing, tampering, repudiation, information
   disclosure, denial of service, elevation of privilege) against each element.
   Use the Microsoft Threat Modeling Tool or equivalent, record a mitigation per
   threat, and make the threat model a gate no design review passes without.
3. **Constrain the toolchain in implementation.** Pin approved compiler and
   linker versions with hardening flags on (/GS, /DYNAMICBASE, control flow
   guard). Ban unsafe APIs (strcpy, sprintf, gets) with a checked banned-function
   list, and scan dependencies for known CVEs before they enter the build.
4. **Gate merges on static analysis.** Run SAST on every pull request and fail
   the build on bug-bar findings rather than posting a warning someone can
   ignore. Route open-source components through software composition analysis
   with a license and vulnerability policy.
5. **Fuzz and dynamic-test at verification.** Point a fuzzer at every parser and
   network-facing input, run DAST against the running service, and do an attack
   surface review: confirm what shipped matches the threat model and that no
   debug endpoint or default credential leaked in.
6. **Pass the Final Security Review before release.** A security advisor outside
   the team confirms every bug-bar issue is closed, the threat model matches the
   build, and an incident response plan with named contacts exists. Record the
   FSR outcome (passed, passed with exceptions, or escalate) and archive the
   evidence.
7. **Keep the response loop open after release.** Maintain the security contact
   and a triage path for externally reported vulnerabilities. A CVE against a
   shipped version reopens the lifecycle for that component.

## Checks

- Does every design in this release carry a threat model with a mitigation
  recorded for each STRIDE threat?
- Would the build actually fail on a bug-bar SAST finding, or only warn?
- Can you produce the FSR sign-off and archived scans for the last release
  without reconstructing them after the fact?

## Boundaries

SDL is Microsoft's framework and its phase names and bug bar are conventions:
map them onto your own SDLC and compliance regime (SOC 2, ISO 27001) rather than
importing the vocabulary wholesale. It sets process, not the fixes themselves,
so the actual vulnerability review belongs to a security-review skill, and a
novel design risk still needs a security engineer's judgment.
