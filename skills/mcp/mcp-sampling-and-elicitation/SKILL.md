---
name: mcp-sampling-and-elicitation
description: Use server-initiated model calls and user prompts responsibly, so a server can ask for reasoning or input without seizing control. Use when a server needs the model's help or a decision from the user mid-operation.
---

# MCP sampling and elicitation

Most MCP flows run one way: the client asks, the server answers.
Sampling and elicitation reverse it, letting a server request a model
completion or ask the user something. Both are powerful and both invert
the trust relationship, so they need discipline.

## Method

1. **Use sampling only when the server genuinely needs reasoning.**
   Classifying free text or summarising a large result is reasonable;
   work the server could do deterministically is not.
2. **Keep the client in control of the model.** The client decides
   whether to honour a sampling request, with what model and limits,
   because an unbounded server-initiated call is a cost and safety hole.
3. **Show the user what was requested.** Server-initiated model calls
   are invisible otherwise, and invisible spend and reasoning erode
   trust.
4. **Elicit only what cannot be inferred.** Interrupting for information
   already available is friction, and frequent elicitation makes an
   automated flow feel broken (see agent-human-checkpoint).
5. **Ask precisely and offer options.** A specific question with choices
   is answerable quickly; an open request mid-flow is not.
6. **Handle refusal and timeout.** The user may decline or ignore, and
   the operation must fail cleanly rather than hanging.
7. **Never elicit secrets through this channel.** Credentials belong in
   the authentication flow, not in a mid-operation prompt (see
   mcp-authentication).

## Boundaries

These features depend on client support and may be unavailable, so
servers need a fallback path. Sampling spends the user's budget on the
server's behalf, which requires consent and limits. Elicitation breaks
automation, making it unsuitable for unattended runs.
