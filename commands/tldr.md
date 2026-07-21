---
description: "Get the one-line or few-bullet bottom line of anything long, instantly. A quick /tldr command for when you just need the gist."
argument-hint: "[content]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

TLDR this:

{content}

Give me the bottom line, fast:
- One sentence that captures the single most important point, first.
- Then 2-4 bullets with the key supporting points or takeaways, only if the
  content warrants them.
- Cut everything else. This is the gist, not a summary.

Rules: faithful (do not distort to fit a punchy line), and genuinely brief (if
it is longer than a few lines, it is not a TLDR). Lead with what the reader
most needs to know or decide. If there is an action or conclusion buried in
the content, surface it. For a fuller summary see summarize.
