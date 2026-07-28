---
description: "Extract the terms that matter from an agreement and flag deviations for a lawyer, without giving legal advice."
argument-hint: "[contract]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Review this agreement:

{contract}

Standard positions: {position}

Use the agent-legal-desk method.

Extract into a fixed structure:
- Parties, term, renewal, and notice period.
- Payment terms and what triggers them.
- Liability, indemnity, and any caps.
- Data handling, location, and subprocessors.
- Termination rights on each side.
- Intellectual property ownership.
- Anything absent that you would expect.

Then list deviations from the stated standard positions, quoting the
clause text exactly.

Rules: this is document triage, not legal advice, and nothing here should
be relied on as such. Quote clauses rather than characterising their legal
effect. Mark anything not found as not found rather than inferring. Route
anything touching liability, IP, or personal data to a qualified lawyer.
