---
description: "Analyse a competitor's product from public information, separating observation from inference."
argument-hint: "[competitor]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Analyse this competitor product:

{competitor}

Focus: {focus}

Use agent-competitive-analysis-team and competitive-strategy.

Produce:
- What it does, from public evidence.
- Who it appears built for, and the signals for that.
- Where it is genuinely better than yours.
- Where it is weaker, and whether that is deliberate.
- What their pricing implies about their strategy.
- What you cannot know from outside.
- What this means for your positioning.

Rules: use only public sources and mark every inference as inference.
State their genuine strengths, since analysis that finds only weakness is
not analysis. Never misrepresent yourself to obtain information. Do not
present speculation about their internals as fact.
