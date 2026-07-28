---
name: agent-code-review
description: Use an agent to review a diff productively, with the right scope, framing, and scepticism about its findings. Use when reviewing your own changes before requesting human review.
---

# Agent code review

Agents catch a real class of defects consistently and produce confident
false positives just as consistently. The value comes from scoping the
review and verifying findings rather than accepting the list.

## Method

1. **Review the diff, not the repository.** A focused review of what
   changed produces specific findings; a whole-codebase review produces
   generic advice (see code-review).
2. **Give the intent of the change.** What it is meant to do, so the
   review can judge whether it does (see agent-context-setup).
3. **Ask for one dimension at a time.** Correctness, then security, then
   performance. A single pass over everything covers each shallowly (see
   agent-quality-council).
4. **Require evidence for each finding.** The specific line and a
   concrete failure scenario, since findings without them are usually
   pattern-matching (see agent-generate-and-verify).
5. **Verify before acting.** Confirm the issue is real in your codebase,
   because plausible-sounding findings about code that does not behave
   that way are common.
6. **Use it before human review, not instead.** It clears mechanical
   issues so human reviewers spend attention on design.
7. **Feed recurring findings into the instruction file.** A rule the
   agent keeps flagging belongs written down (see
   agent-instruction-files).

## Boundaries

Agent review supplements human review and cannot judge whether the
change is the right thing to build. It lacks the system context a
reviewer holds. False positives waste time and erode trust, which is why
verification is part of the workflow.
