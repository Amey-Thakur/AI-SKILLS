---
name: system-prompt-design
description: Write the durable instructions that shape every turn, covering role, boundaries, and defaults without micromanaging each response. Use when configuring an assistant or agent that will handle many different requests.
---

# System prompt design

The system prompt is the constitution rather than the instruction: it
applies to every turn and cannot anticipate them. Good ones establish
role, boundaries, and defaults; bad ones try to script responses and
break on the first unanticipated request.

## Method

1. **Define the role and the audience.** Who the assistant is acting as
   and who it is speaking to determines register, depth, and what can be
   assumed.
2. **State the boundaries positively where possible.** What to do in a
   situation is followed more reliably than what not to do (see
   negative-instructions).
3. **Set defaults, not scripts.** Default length, format, and tone that
   a specific request can override, since scripted responses fail on
   anything unforeseen.
4. **Put safety and refusal rules where they cannot be overridden.**
   These belong in the system prompt precisely because user turns must
   not be able to rewrite them.
5. **Give the model its tools and their boundaries.** What it may do,
   what needs confirmation, and what it must never do unattended (see
   agent-delegation-protocol).
6. **Keep it as short as it can be.** Every instruction competes with
   every other for attention, and long system prompts degrade adherence
   to all of them.
7. **Version and test it as code.** A system prompt change alters every
   interaction, so it needs review and regression testing (see
   prompt-versioning).

## Boundaries

System prompts shape behaviour probabilistically and are not
enforcement; anything security-critical needs a check outside the model
(see mcp-security-boundaries). They are extractable by determined users,
so they must not contain secrets. Long system prompts consume context on
every turn.
