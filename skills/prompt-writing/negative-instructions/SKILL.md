---
name: negative-instructions
description: Tell a model what not to do in a way that works, by converting prohibitions into positive alternatives wherever possible. Use when a prompt lists things to avoid and the model keeps doing them.
---

# Negative instructions

Do not mention pricing raises the salience of pricing. Negative
instructions work less reliably than positive ones because they name the
thing they forbid, and the fix is usually to state the desired behaviour
instead.

## Method

1. **Convert prohibitions to positives.** Instead of do not use jargon,
   write use plain language a newcomer would understand, which is both
   clearer and more followable.
2. **Say what to do in the forbidden situation.** If the answer is not
   in the sources, say so beats do not make things up, because it
   supplies the alternative behaviour.
3. **Keep genuine prohibitions few and prominent.** Some things must be
   stated negatively, particularly safety rules, and they survive better
   when there are three rather than fifteen.
4. **Place hard prohibitions in the system prompt.** They apply across
   turns and should not be overridable by user input (see
   system-prompt-design).
5. **Avoid naming the exact thing you fear.** Detailed descriptions of
   unwanted output can act as a template for it.
6. **Verify rather than trust.** For consequential prohibitions, check
   the output rather than relying on adherence (see
   agent-generate-and-verify).
7. **Test the negative case explicitly.** Include prompts designed to
   trigger the forbidden behaviour in your evaluation set.

## Boundaries

Reframing helps and does not eliminate the effect; models still
occasionally do what they were told not to. Safety-critical prohibitions
need enforcement outside the model. Some constraints have no positive
formulation and must be stated as prohibitions.
