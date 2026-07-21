---
description: "Surface what can go wrong with a plan, ranked by expected damage, with mitigations that change the odds."
argument-hint: "[plan]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Stress-test this plan: {plan}

Context: {context}

Method:
1. Enumerate risks across four lenses so nothing hides:
   - Technical: what breaks, scales badly, or depends on an unproven part.
   - People/process: handoffs, single points of knowledge, timeline
     collisions.
   - External: vendors, platforms, regulation, market timing.
   - Assumption risk: the beliefs the plan only works if true. State each
     assumption explicitly.
2. For each risk: likelihood (low/med/high), impact if it lands (one
   concrete sentence, not a category), and how you would notice it early
   (the tripwire).
3. Rank by likelihood × impact, worst first. Cut anything trivial; five
   real risks beat twenty theoretical ones.
4. For the top risks: one mitigation that reduces likelihood or impact
   BEFORE it happens, and one response if it happens anyway. "Monitor
   closely" is not a mitigation.
5. End with **Kill criteria**: the observable conditions under which this
   plan should be stopped or changed, decided now while heads are cool.

Ground every risk in the plan and context given; a risk you cannot tie to
a specific element of the plan is filler - leave it out.
