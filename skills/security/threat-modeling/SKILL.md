---
name: threat-modeling
description: Map assets, entry points, and STRIDE threats before writing code so defenses land in the design instead of a later patch. Use when starting a feature that handles auth, money, personal data, or external input.
---

# Threat modeling

A threat model is the cheapest security work you will ever do: it costs a
whiteboard and an hour, and it moves defenses into the design where they are
free instead of into production where they are expensive. Skip it and you
find the gaps after an attacker does.

## Method

1. **Inventory the assets worth stealing.** List what an attacker wants:
   credentials, session tokens, payment data, PII, admin capabilities, the
   database itself. Rank them by what a breach of each would cost.
   Everything downstream defends this list.
2. **Draw the data flow with trust boundaries.** Sketch the browsers, your
   services, the database, third-party APIs, and queues. Draw a line
   wherever data crosses from less-trusted to more-trusted (internet to
   server, service to database). Each line is where you spend attention.
3. **Enumerate entry points.** Every route, form field, file upload,
   webhook, queue consumer, CLI flag, and env var is a door. Write them all
   down; the one you forget is the one that ships unguarded.
4. **Walk STRIDE against each boundary.** Ask the six per crossing:
   Spoofing (fake an identity?), Tampering (alter data in transit or at
   rest?), Repudiation (deny an action with no audit trail?), Information
   disclosure (read what they should not?), Denial of service (exhaust a
   resource?), Elevation of privilege (become admin?). Name a concrete
   threat for each letter that applies.
5. **Rate the threats and assign mitigations.** Score each by likelihood
   times impact (DREAD, or a plain high/medium/low). For the top ones pick
   a control: parameterized queries, an authz check, rate limits, signed
   tokens. Document low-risk items as accepted, not silently dropped.
6. **Write the model down and revisit it.** Store the diagram and threat
   table in the repo next to the code. Re-open it when the feature grows a
   new entry point; a stale threat model lies by omission.

## Litmus tests

- Can you name the highest-value asset this feature exposes and the control
  protecting it?
- Does every entry point on your list map to at least one STRIDE threat you
  considered?
- Would a new engineer reading the model understand what you chose not to
  defend, and why?

## Boundaries

Threat modeling scopes the design; it does not verify the implementation.
Pair it with code-level review and testing to confirm the controls were
built correctly. For high-stakes systems (payments, health data, crypto)
bring in a security specialist rather than trusting a solo walkthrough.
