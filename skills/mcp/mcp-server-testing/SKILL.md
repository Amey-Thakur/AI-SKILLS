---
name: mcp-server-testing
description: Test an MCP server for protocol conformance, tool selection accuracy, and behaviour under real model calls rather than only unit tests. Use before shipping a server others will connect agents to.
---

# MCP server testing

A server can be correct and still unusable, because the property that
matters is whether a model picks the right tool and calls it correctly.
That is not covered by unit tests of the handlers.

## Method

1. **Test the protocol surface first.** Initialisation, capability
   declaration, listing, and error shapes, since a conformance failure
   breaks every client regardless of tool quality.
2. **Measure selection accuracy with real prompts.** Give a model the
   tool list and a set of realistic requests, then score which tool it
   chose. This is the primary quality metric (see mcp-tool-design).
3. **Check parameter construction, not just choice.** Selecting the
   right tool with wrong arguments is a distinct failure, usually caused
   by an underspecified schema.
4. **Test with production-sized data.** Response size problems appear
   only at scale and are the most common late discovery (see
   mcp-context-budgeting).
5. **Exercise the failure paths.** Invalid parameters, missing
   permissions, upstream timeouts, and rate limits, verifying the error
   is actionable (see mcp-error-handling).
6. **Fuzz the parameters.** Models produce unexpected values, so
   handlers must not assume well-formed input (see
   property-based-testing).
7. **Regression-test selection after any description change.** Wording
   changes shift selection behaviour, and that is invisible without a
   fixed evaluation set (see agent-eval-design).

## Boundaries

Testing shows a server works with the models tested; another model may
select differently. Selection accuracy is probabilistic and needs a
threshold rather than a pass or fail. Conformance tests do not measure
usefulness, which needs real tasks.
