---
name: mcp-client-integration
description: Connect MCP servers into an application with lifecycle management, capability negotiation, and graceful degradation when a server is unavailable. Use when building a client or embedding MCP into a product.
---

# MCP client integration

The client owns the parts servers cannot: which servers to connect,
which tools to expose to the model, what to do when one fails, and where
the human approves. Getting these wrong makes good servers feel
unreliable.

## Method

1. **Negotiate capability, do not assume it.** Servers differ in whether
   they offer tools, resources, prompts, or sampling, and the client
   must adapt rather than fail.
2. **Manage lifecycle explicitly.** Start, health, restart, and shutdown
   for local servers; connection and resumption for remote ones (see
   mcp-transport-selection).
3. **Degrade gracefully on failure.** One unavailable server should
   remove its tools and continue, with the agent told what it lost
   rather than silently losing capability.
4. **Filter the tool surface before the model sees it.** Exposing every
   tool from every server degrades selection, so scope by task (see
   mcp-multi-server-orchestration).
5. **Own the approval gate.** The client is where destructive actions
   stop for confirmation, since a server cannot enforce it (see
   mcp-security-boundaries).
6. **Surface tool activity to the user.** What was called, with what,
   and what came back, because invisible tool use is impossible to trust
   or debug.
7. **Time out and cancel cleanly.** Long-running calls need a bound and
   a cancellation path, or one slow server hangs the session.

## Boundaries

The client mediates; it cannot validate what a server actually does with
a call. Users configuring their own servers introduces untrusted code
into the session, which needs disclosure. Protocol versions evolve, so
compatibility handling is ongoing.
