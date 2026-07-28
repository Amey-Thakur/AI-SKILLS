---
description: "Assess a dataset for the problems that would invalidate analysis, before anyone builds on it."
argument-hint: "[dataset]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Audit this dataset:

{dataset}

Intended use: {use}

Use data-cleaning, sampling-and-bias, and data-lineage.

Report:
- Completeness: missing values and whether missingness is random.
- Validity: values outside plausible ranges, wrong types, broken formats.
- Consistency: the same entity represented differently.
- Duplicates and what constitutes one here.
- Timeliness: how current, and any gaps in coverage.
- Selection bias: who or what is systematically absent.
- Whether it can support the intended use.

Rules: assess against the intended use rather than in the abstract.
Distinguish problems that block the use from those worth noting. Say
plainly if the data cannot support the use. Missing data is often the
most informative finding.
