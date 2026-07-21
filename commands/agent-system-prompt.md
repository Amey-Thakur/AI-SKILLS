---
description: "Write a system prompt for an AI agent that defines its role, tools, boundaries, and output clearly enough to act reliably."
argument-hint: "[purpose]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
