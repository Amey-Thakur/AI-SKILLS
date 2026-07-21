---
description: "Explain what a piece of code does, why it is shaped that way, and where it can bite."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Explain the code below to a reader who is {level}.

Structure:
1. **One sentence**: what this code accomplishes for its caller.
2. **The walk-through**: follow the execution order (not the line order),
   explaining each meaningful step in plain language. Name the technique
   when one is used (memoization, debounce, two-phase locking) and say why
   it is here.
3. **The sharp edges**: inputs or states where this code fails, surprises,
   or performs badly: only real ones you can point to in the code.
4. **Questions the code raises**: anything that looks intentional but
   undocumented (a magic number, a swallowed error). Phrase as questions,
   not accusations.

Rules:
- Explain only the code given; if it references things not shown, say what
  you can infer and mark it as inference.
- No rewriting or reviewing unless asked: this is comprehension, not
  critique.

<code>
{code}
</code>
