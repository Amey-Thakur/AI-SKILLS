---
name: role-and-persona-prompting
description: Assign a role to shape expertise, register, and priorities, without pretending it grants knowledge the model lacks. Use when output should read as written by a particular kind of expert for a particular audience.
---

# Role and persona prompting

Telling a model to act as a specialist changes vocabulary, structure,
and what it treats as important. It does not add knowledge, and treating
a role as a competence upgrade is the common mistake.

## Method

1. **Assign the role for register and priorities.** A security reviewer
   and a product manager reading the same code surface different things,
   which is the real effect worth having.
2. **Name the audience as well as the role.** Explaining to a beginner
   and to a peer differ more than the role alone determines (see
   audience-adaptation).
3. **Be specific about the specialism.** A staff engineer who has run
   large migrations gives more targeted output than an expert engineer.
4. **Combine with the actual task rather than replacing it.** A role
   without a clear deliverable produces character rather than work.
5. **Avoid personas that imply authority the output lacks.** Acting as a
   doctor or lawyer invites reliance the output cannot support (see
   agent-legal-desk).
6. **Never impersonate a real person.** Writing as a named individual is
   a consent and misrepresentation problem regardless of intent.
7. **Test whether the role helps.** For many tasks a clear instruction
   outperforms a persona, and the persona is just tokens.

## Boundaries

Roles shape style and emphasis, not capability, and a role does not make
output reliable in a regulated domain. Personas can introduce
stereotyped assumptions along with the register. Users should not be
misled about what they are interacting with.
