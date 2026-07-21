---
name: agent-tool-definition
description: Write a tool/function definition for an AI agent with a description that steers use and parameters it fills correctly.
variables:
  - "{tool}: what the tool does and what it acts on"
  - "{params}: the inputs it needs, and what it returns"
settings: "Temperature 0.2-0.4 for precision."
---

Write a tool definition for an AI agent.

Tool: {tool}
Inputs and output: {params}

Produce:
1. Name: a clear verb-noun name (`search_orders`, `send_email`) that says what
   it does.
2. Description: the most important part, because the agent chooses tools by
   reading it. State what it does, WHEN to use it, and when NOT to (to
   disambiguate from similar tools). Write it as instruction to the model, with
   an example use case.
3. Parameters: each with a clear name, type, whether required, a description
   with format and an example ("ISO date, e.g. 2026-01-15"), and an enum for
   closed choices. Few parameters, named plainly: every parameter description
   is a prompt the model reads.
4. Return shape: what the tool gives back, so the agent knows what to expect.
5. Error behavior: what errors it returns and how they should read to the
   agent ("date_range exceeds 90 days: split into smaller ranges", not a bare
   code): the error message is the agent's recovery instruction.

Rules: the description and parameter docs ARE prompts; write them as carefully
as the system prompt. Size the tool at task granularity (one coherent
capability), not one-per-endpoint. Make misuse hard through enums, required
fields, and clear descriptions. Provide it in the format the target platform
uses (JSON Schema for tool/function calling) if I name the platform, otherwise
as a clear structured spec.
