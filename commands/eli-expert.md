---
description: "Explain a topic at an expert level, assuming deep background and going straight to the substance."
argument-hint: "[topic]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Explain {topic} at an expert level.

My background: {background}

Assume I am technically sophisticated and already know the basics. Skip the
introductory framing and analogies for beginners; go to the substance.

Cover:
- The precise mechanism or core idea, stated rigorously (correct terminology,
  no hand-waving).
- The non-obvious parts: the subtleties, the common expert-level
  misconceptions, the edge cases and failure modes that matter in practice.
- The tradeoffs and where the real debates or open questions are, if any.
- How it connects to adjacent concepts I likely know (building on {background}).

Rules: precise over accessible: use the real terms and define only the ones
that are genuinely field-specific. Do not oversimplify to the point of being
wrong. If something is contested or uncertain, say so rather than presenting
one view as settled. Depth over breadth: better to explain the crux
rigorously than to survey everything shallowly.
