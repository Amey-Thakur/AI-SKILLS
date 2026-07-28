---
name: golden-path-templates
description: Provide starting templates that encode the organisation's defaults so new services are consistent without anyone reading a standards document. Use when new services vary widely in structure and quality.
---

# Golden path templates

Standards documents are read once and ignored; templates are used every
time. A generated starting point is how consistency actually happens,
because it makes the correct setup the path of least effort.

## Method

1. **Generate a service that works end to end.** Builds, tests,
   deploys, and reports health from the first commit, since a template
   requiring assembly is not a template.
2. **Encode the defaults rather than documenting them.** Logging,
   metrics, health checks, and security configuration built in, so
   teams inherit them without deciding (see observability).
3. **Keep templates few.** One per genuine service type, because a
   catalogue of twenty means nobody knows which to choose.
4. **Make generated code owned by the team.** They must be free to
   modify it, and a template that cannot be edited becomes a constraint
   rather than a head start.
5. **Provide a path to updates.** Templates improve, and existing
   services need a way to adopt changes without a manual diff (see
   dependency-management).
6. **Test the templates in CI.** A broken template is discovered by
   whoever tries to start a service, at the worst moment.
7. **Evolve them from real usage.** What teams add or delete after
   generating tells you what the template should include.

## Boundaries

Templates set a starting point and cannot enforce ongoing conformance,
which needs different mechanisms (see paved-road-adoption). They
encode current best practice and go stale. Over-templating produces
services carrying features they never needed.
