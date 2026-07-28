---
name: mcp-context-budgeting
description: Keep tool results small enough that an agent can hold what matters, through pagination, projection, and summarisation at the server. Use when tool output floods the context window.
---

# MCP context budgeting

Every token a tool returns is a token unavailable for reasoning. Servers
that return complete records because they are available push agents into
truncation and forgetting, and the fix belongs at the server rather than
in the client.

## Method

1. **Return what the next step needs.** A list operation returns
   identifiers and labels; detail comes from a follow-up call on the one
   that matters.
2. **Paginate by default with a modest page size.** Unbounded lists are
   the most common source of context floods, and the default should be
   safe rather than complete.
3. **Offer field selection.** Letting the caller request specific fields
   turns a large record into a small one without a new tool.
4. **Summarise server-side where the detail is rarely needed.** A
   summary with a way to fetch the full text is usually better than
   returning everything and hoping.
5. **Truncate explicitly and say so.** Silent truncation makes an agent
   reason over partial data believing it is complete, which is worse
   than an honest marker.
6. **Prefer references to embedded content.** An identifier or URI the
   agent can fetch on demand costs a fraction of the content itself.
7. **Measure real response sizes.** Tools are usually built against
   small test data and meet production volumes later (see
   mcp-server-testing).

## Boundaries

Budgeting shapes what a server returns; the client still controls the
window and may truncate anyway. Aggressive summarisation loses detail
that some tasks need, so a full-detail path must remain. Compact
responses are harder for humans to debug, making logging more important.
