---
name: mcp-multi-server-orchestration
description: Run an agent across several MCP servers without name collisions, tool overload, or ambiguity about which server owns an action. Use when one agent connects to more than a few servers.
---

# MCP multi-server orchestration

Each server is designed in isolation and they meet in one agent's tool
list. Two servers with a search tool, forty tools where twelve are
relevant, and no indication which system an action affects: these are
integration problems no individual server can solve.

## Method

1. **Namespace tools by server.** Prefixed names make ownership obvious
   to both the agent and the person reading the transcript, and prevent
   silent collisions.
2. **Expose only the tools the task needs.** Tool selection degrades as
   the list grows, so filtering per task or per agent beats connecting
   everything (see agent-specialist-router).
3. **Give each agent its own server set.** In a multi-agent system,
   scoping servers per role limits both confusion and blast radius (see
   agent-context-isolation).
4. **Resolve overlapping capability explicitly.** When two servers can
   do the same thing, the instructions must say which is authoritative
   for what, or the choice is arbitrary per call.
5. **Isolate credentials per server.** One server's compromise must not
   reach another's access, which means separate scoped tokens rather
   than a shared identity (see mcp-authentication).
6. **Handle partial availability.** One server being down should degrade
   capability rather than failing the agent, which requires the agent to
   know what it lost.
7. **Log which server served each call.** Debugging a multi-server agent
   without attribution is guesswork (see audit-logging).

## Boundaries

Orchestration manages the surface; it cannot fix a badly designed tool
on an upstream server. More servers means more failure modes and more
latency variance. Tool count has a practical ceiling beyond which
selection accuracy falls regardless of naming.
