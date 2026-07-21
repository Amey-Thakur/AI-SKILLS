---
description: "Run a SWOT analysis (strengths, weaknesses, opportunities, threats) that is specific and leads to actions."
argument-hint: "[subject]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Run a SWOT analysis for: {subject}

Context: {context}

Structure the four quadrants, keeping internal and external straight:
- Strengths (internal, present): real advantages, specific to this subject,
  not generic ("good team" means nothing without what makes them good).
- Weaknesses (internal, present): honest internal gaps and disadvantages.
- Opportunities (external, potential): market/environment factors you could
  exploit.
- Threats (external, potential): market/environment factors that could hurt
  you.

Rules: be specific and evidence-based, not a list of platitudes. Distinguish
internal (S/W: things you control) from external (O/T: things you do not):
mixing them is the common SWOT mistake. Then, the part most SWOTs skip:
- Cross the quadrants into actions: how to use a strength to seize an
  opportunity or counter a threat, and how to fix or defend a weakness.
- End with the 2-3 highest-priority moves this analysis points to.

A SWOT that just lists four buckets and stops is decoration; the value is the
strategy it points to. If a quadrant is thin because I have not given enough
context, say what you would need to know.
