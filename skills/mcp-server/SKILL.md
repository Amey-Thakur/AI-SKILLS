---
name: mcp-server
description: Design a Model Context Protocol server that exposes tools and data to AI agents safely and legibly. Use when building an MCP server or deciding what to expose to an agent.
---

# MCP server

The Model Context Protocol lets an agent discover and call your tools and
read your resources. The server is a contract with a caller that reasons in
natural language and will misuse anything ambiguous, so design for a smart
caller that cannot see your source.

## Method

1. **Expose the right primitive.** MCP offers tools (actions the agent
   invokes), resources (data the agent reads), and prompts (templates the
   agent fills). Read-only data is a resource, not a tool; an action with
   effects is a tool. Choosing wrong makes the agent fetch data by calling
   side-effecting tools, or take actions it thinks are safe reads.
2. **Name and describe for the model, not the maintainer.** Every tool's name
   and description is how the agent decides whether and how to call it. Say
   what it does, when to use it, and what it returns, in one clear statement.
   A vague description produces wrong calls no schema can prevent.
3. **Make schemas strict and self-documenting.** Each parameter has a type, a
   description, and required-or-optional stated. Constrain enums, ranges, and
   formats so the model cannot pass a shape you will reject. Invalid states
   the schema forbids are calls you never have to handle.
4. **Return results the model can use.** Structured, labeled output over raw
   dumps; the fields the agent needs to decide the next step, not your
   internal representation. Truncate or paginate large results so one call
   cannot blow the context window.
5. **Errors are part of the contract.** A failed call returns a clear,
   actionable message the agent can recover from ("file not found: check the
   path" beats a stack trace). Distinguish the agent's mistake from a server
   failure so the agent knows whether to retry, fix its input, or give up.
6. **Guard every boundary, because the caller is not trusted.** Validate and
   sanitize all inputs; scope what each tool can touch; never expose a tool
   that runs arbitrary commands, reads arbitrary paths, or leaks secrets.
   Treat tool arguments as hostile input reaching a privileged operation,
   because that is exactly what they are.
7. **Keep tools small and composable.** One tool, one job, with a name that
   says it. A mega-tool with a mode parameter is harder for the agent to use
   correctly than three focused tools.

## Litmus tests

- Could the agent use every tool correctly from its name, description, and
  schema alone, with no access to your code?
- Can any tool call cause damage the caller did not clearly intend?
- Does every error tell the agent what to do next?
- Could a single response overflow the context window?

## Boundaries

Follow the MCP specification and your SDK's conventions; a server that
diverges from the protocol is a server clients cannot use. Expose the
smallest surface that serves the need. Every tool is attack surface and
context cost, so a tool that is rarely useful is a net loss.
