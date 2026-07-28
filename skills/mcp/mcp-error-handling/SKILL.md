---
name: mcp-error-handling
description: Return errors an agent can act on, distinguishing retryable failures from permanent ones and never leaking internals. Use when building MCP tools that will fail in production.
---

# MCP error handling

An agent's recovery is only as good as the error it receives. A generic
failure produces a blind retry loop; a specific, actionable error
produces a corrected call. Error text here is an interface, not a log
line.

## Method

1. **Say what went wrong and what would fix it.** Missing required
   parameter start_date beats invalid input, because the agent can act
   on the first and only guess at the second.
2. **Distinguish retryable from permanent.** Rate limits and timeouts
   invite a retry; validation failures and permission denials never
   should, and an agent cannot tell without being told.
3. **Return validation errors per field.** Which parameter, what was
   wrong, what is acceptable, so the retry is corrected rather than
   repeated (see mcp-tool-design).
4. **Never leak internals.** Stack traces, queries, and infrastructure
   detail enter the model's context and possibly its output (see
   error-messages).
5. **Include retry timing when known.** A rate limit that states when to
   retry prevents both hammering and unnecessary abandonment.
6. **Fail fast on unrecoverable conditions.** An agent looping on a
   permanently failing call burns budget and context, so the error must
   close the loop.
7. **Keep errors stable and documented.** Agents and prompts come to
   depend on error shapes, so changing them silently breaks integrations.

## Boundaries

Good errors improve recovery; they cannot fix a tool that fails for the
wrong reasons. Error text is model-visible, so it must be safe to
disclose. Retry policy belongs with the caller, and the server's job is
to give it enough to decide (see retry-strategies).
