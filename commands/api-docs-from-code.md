---
description: "Generate accurate reference documentation for an API from its code, marking every inference."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write reference documentation for the API below, for {audience}.

For each endpoint or public function:
- **Name and purpose**: one sentence on what it does for the caller.
- **Signature**: method and path (or function signature), parameters with
  types, which are required, and defaults where the code shows them.
- **Request example**: one realistic call, using only field names present
  in the code.
- **Response**: the success shape with field meanings, plus each error the
  code actually returns (status, condition, body shape).
- **Notes**: auth requirements, rate limits, idempotency, pagination, but
  only where the code or its middleware shows them.

Rules:
- Document what the code does, not what it should do. Where behavior is
  unclear from the code alone, write [verify: question] rather than
  guessing.
- Keep descriptions to the caller's perspective; internals stay out unless
  they leak into behavior.
- Order endpoints by resource, then by the natural usage sequence.
- End with a "Not documented" list naming anything you skipped and why.

<code>
{code}
</code>
