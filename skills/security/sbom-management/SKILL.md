---
name: sbom-management
description: Produce signed software bills of materials from real artifacts and consume them to answer "are we affected" fast. Use when setting up build output, responding to a new advisory, or fielding a customer SBOM request.
---

# SBOM management

A software bill of materials (SBOM) is the ingredient list for what you
shipped. Without one, the day a critical advisory lands you are grepping
lockfiles across repos and guessing what is actually deployed. Generated
right and kept current, an SBOM turns that scramble into a query.

## Method

1. **Generate from the built artifact, not the source tree.** Run `syft`
   against the final container image or binary: `syft my-image:1.4 -o
   cyclonedx-json`. Scanning source misses vendored code, build-time
   injections, and base-image packages, so the SBOM must describe what
   actually left the build.
2. **Pick one format and hold it.** CycloneDX and SPDX are both machine
   readable; CycloneDX carries dependency graph and VEX in one document,
   SPDX is common for license and compliance work. Convert on demand with
   `cyclonedx-cli convert` rather than maintaining two source formats.
3. **Include the NTIA minimum elements.** Every component needs supplier,
   name, version, a unique identifier (a PURL like
   `pkg:npm/lodash@4.17.21` or a CPE), dependency relationships, plus
   author and timestamp. An SBOM with no PURLs cannot be matched to an
   advisory feed and is decoration.
4. **Sign the SBOM and bind it to the artifact digest.** Attach it as an
   attestation with `cosign attest --predicate sbom.json --type cyclonedx`
   so a consumer can confirm the SBOM belongs to that exact image and was
   not swapped. An unsigned SBOM is a claim, not evidence.
5. **Consume continuously, not once.** Feed stored SBOMs to `grype
   sbom:./sbom.json` or load them into Dependency-Track, which re-evaluates
   every stored SBOM as new CVEs arrive. The point is that a fresh advisory
   flags an old release without anyone rebuilding it.
6. **Emit VEX to kill the false positives.** Publish an OpenVEX or
   CycloneDX VEX statement marking unreachable findings `not_affected` with
   a justification like `vulnerable_code_not_in_execute_path`, so consumers
   and your own dashboard stop paging on a CVE you already triaged.
7. **Track coverage and freshness.** Require an SBOM for every deployed
   artifact and regenerate it each release. A stale SBOM from three
   releases back answers "are we affected" confidently and wrongly.

## Checks

- Can you list every running service that contains `log4j-core 2.14` from
  stored SBOMs in minutes, without rebuilding anything?
- Does each release ship a signed SBOM whose component set matches what the
  image actually contains?
- When a new CVE publishes, does something re-scan existing SBOMs
  automatically, or only the next build?

## Boundaries

This skill covers producing and consuming the inventory. Hardening the
pipeline that builds and signs artifacts belongs to supply-chain-defense,
and gating or removing an individual risky package belongs to
dependency-auditing. Format mandates from a specific regulator defer to
that program's own requirements.
