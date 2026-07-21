---
name: agent-system-prompt
description: Write a system prompt for an AI agent that defines its role, tools, boundaries, and output clearly enough to act reliably.
variables:
  - "{purpose}: what the agent is for and what it should accomplish"
  - "{tools}: the tools/actions it has, and any constraints or things it must not do"
settings: "Temperature 0.3-0.5."
---

Write a system prompt for an AI agent.

Purpose: {purpose}
Tools and constraints: {tools}

Cover, in order:
- Role and objective: who the agent is and what success looks like, in one or
  two sentences. Concrete, not "you are a helpful assistant".
- Capabilities and tools: what it can do, when to use each tool, and how to
  handle tool errors (retry, fall back, report). Reference tools by what they
  are for, not just their names.
- Boundaries: what it must NOT do, what requires confirmation, and how to
  handle requests outside its scope or that it cannot safely fulfill. Be
  explicit: agents follow the boundaries you write, not the ones you assumed.
- Method: how to approach the task (plan first, verify before acting on
  irreversible steps, when to ask versus proceed).
- Output format: exactly how to respond, and how to report completion or
  failure.

Rules: precise and unambiguous (an agent does exactly what the prompt says,
including the gaps: vagueness becomes unpredictable behavior). Front-load the
most important instructions (models weight the start heavily). State
boundaries and safety as hard rules, not suggestions. Keep it lean: every
instruction competes for attention, so cut what does not change behavior. If
the purpose implies risks (irreversible actions, sensitive data), build in the
guardrails explicitly.
