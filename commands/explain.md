---
description: "Explain anything clearly at the right level for the reader, from beginner to expert. A quick /explain command for any concept."
argument-hint: "[topic]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Explain: {topic}

For: {level}

Rules:
- Start with the core idea in one or two plain sentences, then build up detail
  as the level warrants. Lead with what it is and why it matters.
- Match the depth to the reader: a beginner needs the intuition and an analogy;
  a practitioner needs the precise mechanism and the caveats. Do not
  patronize experts or lose beginners.
- Use concrete examples; show the thing, do not just define it. An analogy
  where it clarifies (and note where the analogy breaks down).
- Build in order, no forward references: each part rests on what came before.
- Be accurate: if something is contested, uncertain, or simplified for the
  level, say so rather than presenting a tidy falsehood.

Keep it as long as the topic and level need, no longer. End by checking the
one thing most likely to still confuse the reader. For code specifically see
explain-code; for the two extremes see explain-like-im-five and eli-expert.
