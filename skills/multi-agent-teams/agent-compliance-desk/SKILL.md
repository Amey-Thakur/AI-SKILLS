---
name: agent-compliance-desk
description: Run continuous compliance with agents that map controls to evidence, collect it on a schedule, and flag drift before an audit finds it. Use when preparing for or maintaining a certification and evidence gathering is a periodic fire drill.
---

# Agent compliance desk

Compliance is expensive because evidence is collected in a panic once a
year, when the people who knew have moved on. Continuous collection is
dull, scheduled, and rule-bound, which makes it a natural fit for
agents and a poor fit for human attention.

## Team

- **Control mapper**: maintains the mapping from each control to the
  system that satisfies it and the evidence that proves it.
- **Evidence collector**: gathers the artefact on a schedule and stores
  it with a timestamp.
- **Drift detector**: compares current state against the last accepted
  state and raises differences.

Shape: continuous collection against a control register, with drift
escalation.

## Method

1. **Build the control-to-evidence map first.** Each control needs a
   named system, a named artefact, and an owner. Controls without a
   defined artefact are the ones that fail an audit.
2. **Prefer generated evidence to attested evidence.** An exported
   configuration or access list beats a screenshot, and beats a
   statement that a policy exists (see audit-logging).
3. **Collect on a schedule, not before the audit.** Timestamped
   evidence across the period demonstrates the control operated, which
   is what auditors test, rather than that it exists today.
4. **Detect drift as a first-class event.** A policy loosened, an
   access grant unrevoked, or a job that stopped running is the finding
   you want in week two, not month eleven.
5. **Track exceptions with expiry.** Every accepted deviation needs an
   owner, a reason, and a date it is revisited, or exceptions silently
   become the standard.
6. **Keep evidence access controlled.** Compliance artefacts often
   contain sensitive configuration and personal data (see
   data-classification).
7. **Rehearse the auditor's question.** For a sample of controls, try
   to answer show me from the evidence alone, which is the only real
   test of the register.

## Run it

In Claude Code, keep the control register as a tracked file, run the
collector on a schedule writing dated artefacts into an evidence
directory, and run the drift detector as a comparison pass that opens
findings. Human owners resolve findings. Port to LangGraph with a
scheduled collection node and a comparison node raising events.

## Signals it works

- Any control can be evidenced from stored artefacts without asking a
  person.
- Drift is found within days, and exceptions carry expiry dates.
- Audit preparation is a review of existing evidence, not a collection
  sprint.

## Boundaries

This desk gathers and monitors; it does not certify, interpret a
framework, or replace an auditor or compliance officer. Whether a
control satisfies a requirement is a judgement made by qualified people,
and agents must not modify controls, grant access, or alter policy to
close a finding.
