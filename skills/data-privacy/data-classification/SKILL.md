---
name: data-classification
description: Label data by sensitivity so controls, retention, and access follow the label instead of being argued case by case. Use when designing storage, granting access, or deciding how carefully a dataset must be handled.
---

# Data classification

Without labels, every dataset gets the same treatment, which means
either over-protecting cheap data or under-protecting sensitive data.
Classification exists so the control follows the content
automatically rather than depending on who is looking.

## Method

1. **Use few levels with clear tests.** Public, internal, confidential,
   and restricted is enough for most organisations, and each level
   needs a one-line test anyone can apply without a meeting.
2. **Classify at the field level where it matters.** A table is rarely
   uniformly sensitive; an email column and a status column do not
   deserve the same handling. Field-level labels let you protect
   precisely (see data-minimization).
3. **Attach controls to the label, not the system.** Encryption,
   access approval, logging, retention, and export rules should be
   defined once per level and applied wherever that level appears (see
   encryption-at-rest, audit-logging).
4. **Label at creation and carry it downstream.** A classified field
   copied into a warehouse, an export, or a log keeps its
   classification, and pipelines must propagate the label rather than
   dropping it at the first join (see data-lineage).
5. **Treat special categories separately.** Health, biometrics,
   financial account data, government identifiers, and children's data
   carry rules of their own beyond your internal scheme.
6. **Review labels when purpose changes.** Data aggregated or joined
   can become more sensitive than either input, so re-classify at those
   boundaries rather than inheriting the lowest label.

## Boundaries

- Classification directs controls; it does not implement them. A label
  with no enforcement is documentation, not protection.
- Over-classification is a real cost: if everything is restricted,
  people route around the controls to get work done.
- Regulatory categories do not always map onto internal levels, so keep
  the mapping explicit rather than assumed.
