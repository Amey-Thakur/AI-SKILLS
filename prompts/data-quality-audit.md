---
name: data-quality-audit
description: Assess a dataset for the problems that would invalidate analysis, before anyone builds on it.
variables:
  - "{dataset}: the data, its source, and what it is meant to represent"
  - "{use}: what it will be used for"
settings: "Temperature 0.2."
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
