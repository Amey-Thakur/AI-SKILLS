---
name: reply-to-email
description: Draft a clear, appropriate reply to an email that addresses what was asked and moves it forward.
variables:
  - "{email}: the email you received (paste it)"
  - "{intent}: what you want to say or achieve in the reply, and the tone"
settings: "Temperature 0.4-0.6."
---

Draft a reply to this email:

{email}

What I want to convey: {intent}

Rules:
- Address what they actually asked or raised. If they asked three questions,
  answer three. Do not dodge the awkward one: a reply that skips the hard part
  invites another round.
- Match the tone to the relationship and the situation (warm, formal, brief),
  and mirror their register unless there is reason not to.
- Be clear about any decision, answer, or next step. If you are saying no or
  delivering something they will not love, be direct but kind (do not bury it
  or over-apologize).
- Keep it as short as the content allows: reply to be read, not to perform.
- End with the next step or a clear close, so it does not leave things hanging.

Output the reply, ready to send (with a subject if it is a new thread). If the
email needs information I have not given, mark it as a placeholder. If replying
well requires a decision I have not made, ask me. Rules: honest and direct over
evasive, professional without being stiff, no filler ("I hope this finds you
well") unless it fits. Give a shorter and a warmer variant if the situation is
delicate.
