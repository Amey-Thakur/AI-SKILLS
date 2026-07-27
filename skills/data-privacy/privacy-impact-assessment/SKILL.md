---
name: privacy-impact-assessment
description: Assess a high-risk processing activity before it ships, documenting risks, mitigations, and the decision. Use when processing sensitive data, profiling at scale, or introducing a novel use of personal data.
---

# Privacy impact assessment

An assessment is a structured argument that a processing activity is
justified and its risks are controlled. Its value is catching the
unacceptable design before it is built, and leaving a record of why the
acceptable one was accepted.

## Method

1. **Describe the processing plainly.** What data, whose, for what
   purpose, by what means, retained how long, shared with whom. Most
   problems surface while writing this section honestly.
2. **Test necessity and proportionality.** Could the purpose be met
   with less data, weaker identifiers, or shorter retention? If yes,
   the design changes rather than the assessment concluding it is fine
   (see data-minimization).
3. **Identify risks from the person's side.** Not risk to the company
   but harm to the individual: exposure, discrimination, unexpected
   inference, loss of control. This reframing is what makes the
   exercise useful rather than procedural.
4. **Attach a mitigation to each risk, with an owner.** Access control,
   anonymisation, retention limits, transparency, and opt-outs, each
   assigned rather than listed (see privacy-by-design).
5. **State the residual risk and who accepted it.** Some risk always
   remains, and naming the accountable person is the difference between
   a decision and a document.
6. **Revisit when the processing changes.** New data sources, new
   purposes, or new scale invalidate the original conclusion, so tie
   review to those triggers.

## Boundaries

- Whether an assessment is legally required, and what it must contain,
  varies by jurisdiction and is a legal determination.
- An assessment documents and reduces risk; it does not authorise
  processing that lacks a lawful basis.
- It is a design-time tool, so running it after launch salvages
  documentation but not the design choices already made.
