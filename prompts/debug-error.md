---
name: debug-error
description: Diagnose an error methodically from the message, code, and context, with the most likely cause first.
variables:
  - "{error}: the full error message and stack trace"
  - "{code}: the relevant code, if available"
  - "{context}: what you were doing, what changed recently, environment"
settings: "Temperature 0.2-0.4 for focused reasoning."
---

Help me debug this error.

Error and stack trace:
{error}

Relevant code:
{code}

Context (what I was doing, what changed recently):
{context}

Work through it in this order:
1. Read the error literally: what is it actually saying, and which line/frame
   in the stack trace is in MY code (not the library)?
2. State the most likely cause in one sentence, with the reasoning from the
   evidence above. Then list up to 2 alternative causes, ranked.
3. For the top cause, give the specific fix (the exact change), and the
   fastest way to confirm it is the cause before applying the fix.
4. If the evidence is insufficient, name the ONE piece of information (a log
   line, a value to print, a command to run) that would most narrow it down.

Do not guess wildly or list ten possibilities. Reason from the actual error
and stack trace to the most probable cause.
