---
name: support-macros
description: Build reusable reply templates that speed common answers without making replies feel automated. Use when agents retype the same explanations daily.
---

# Support macros

Macros save real time on repetitive questions and cost trust when they
show. The line is whether the reply reads as written for this person,
which depends more on what the macro leaves blank than on how it is
worded.

## Method

1. **Macro the explanation, personalise the diagnosis.** The shared part
   is how the feature works; the specific part is what happened to this
   customer, and it must never be templated.
2. **Build placeholders for the specifics.** Explicit fields the agent
   must fill, so an unedited macro is visibly incomplete rather than
   subtly generic.
3. **Keep macros short.** Long templates get sent unread and unedited,
   which is exactly the failure mode.
4. **Review and retire on a schedule.** A macro describing an old
   interface is worse than no macro, and macros outlive the features
   they describe.
5. **Track usage per macro.** The most used ones should become knowledge
   base articles and product fixes rather than staying efficient answers
   to a recurring problem (see support-analytics).
6. **Never macro an apology for a serious failure.** A templated apology
   for an outage or a data problem reads as contempt.
7. **Let agents deviate freely.** A macro is a starting point, and
   enforcing them verbatim produces the robotic tone customers detect
   instantly.

## Boundaries

Macros speed replies; they cannot substitute for understanding the
issue, and a fast wrong answer costs more than a slower right one.
Heavy macro use signals a product problem worth fixing upstream.
Translated macros need review by native speakers (see
translation-quality-review).
