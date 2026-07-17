---
name: explain-code
description: Explain what a piece of code does, why it is shaped that way, and where it can bite.
variables:
  - "{code}: the code to explain"
  - "{level}: the reader's experience (e.g. new to the language, senior but new to this codebase)"
settings: "Temperature 0-0.3."
---

Explain the code below to a reader who is {level}.

Structure:
1. **One sentence**: what this code accomplishes for its caller.
2. **The walk-through**: follow the execution order (not the line order),
   explaining each meaningful step in plain language. Name the technique
   when one is used (memoization, debounce, two-phase locking) and say why
   it is here.
3. **The sharp edges**: inputs or states where this code fails, surprises,
   or performs badly — only real ones you can point to in the code.
4. **Questions the code raises**: anything that looks intentional but
   undocumented (a magic number, a swallowed error). Phrase as questions,
   not accusations.

Rules:
- Explain only the code given; if it references things not shown, say what
  you can infer and mark it as inference.
- No rewriting or reviewing unless asked — this is comprehension, not
  critique.

<code>
{code}
</code>
