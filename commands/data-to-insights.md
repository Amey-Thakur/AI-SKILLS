---
description: "Read a table or dataset and report what it actually shows - findings, not decoration, with honest caveats."
argument-hint: "[data]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Analyze the data below to answer: {question}

Method:
1. State what the data contains (rows, columns, time span, units) in two
   lines, so misreadings surface immediately.
2. Report findings in order of relevance to {question}. Each finding: the
   claim, the exact numbers behind it, and the comparison that makes it
   meaningful ("up 34% vs the prior period", not "increased significantly").
3. Distinguish three levels explicitly:
   - **Shown**: directly in the data.
   - **Suggested**: a pattern consistent with the data but with plausible
     alternative explanations - name them.
   - **Not answerable**: parts of {question} this data cannot address, and
     what data would.
4. Check before claiming: differing denominators, small sample sizes,
   missing values, outliers driving an average, and time ranges that do not
   align. Note any that apply.

Rules: no causal language for correlations ("associated with", not "caused
by"); no extrapolation beyond the data's range; totals recomputed, not
trusted from the input.

<data>
{data}
</data>
