---
name: mcp-tool-design
description: Design MCP tools an agent can select correctly, with names, descriptions, and schemas that make the right call obvious and the wrong one impossible. Use when exposing capability to an agent through an MCP server.
---

# MCP tool design

An agent picks a tool from its name, description, and schema alone. Most
tool-calling failures are not reasoning failures but description
failures: two tools that sound alike, a parameter whose meaning is
implied, or a name that does not say what it does.

## Method

1. **Name by the action, specifically.** create_invoice rather than
   invoice or handle_billing. The name is the strongest selection
   signal and vague names cause misselection.
2. **Write the description for the moment of choice.** What it does,
   when to use it, and when not to. Naming the alternative in the
   description is what separates two similar tools.
3. **Make the schema carry the meaning.** Enums instead of free strings,
   required fields marked, formats stated, and every parameter
   described. An agent cannot infer that a date must be ISO from a
   string type.
4. **Keep each tool to one job.** A tool with a mode parameter that
   changes its behaviour entirely is several tools sharing a name, and
   agents choose modes badly.
5. **Return structured, compact results.** The response enters the
   agent's context, so return what is needed for the next step rather
   than everything available (see mcp-context-budgeting).
6. **Make destructive tools obvious and separate.** Deletion and
   irreversible actions get explicit names and confirmation parameters
   rather than being a flag on a general tool (see
   mcp-security-boundaries).
7. **Test selection with realistic prompts.** Give a model the tool list
   and real requests, then check which it picks. Selection accuracy is
   the property that matters (see mcp-server-testing).

## Boundaries

Tool design shapes selection; it cannot make an agent competent at a
task it does not understand. Too many tools degrades selection
regardless of quality, so a large surface needs grouping or filtering.
Schemas constrain shape rather than semantics, so validation remains the
server's job.
