---
description: "Design an integration with a third-party API so its failures and changes stay contained."
argument-hint: "[api]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design an integration with:

{api}

Usage: {usage}

Use third-party-integration, integration-resilience, rate-limit-handling,
and data-mapping.

Cover:
- The interface you expose internally, isolating their model from yours.
- Timeouts, retries, and what happens when the service is down.
- Rate limit handling and how you stay under.
- How their data maps into yours, including unknown enum values.
- Credential scope, storage, and rotation.
- What you monitor and what alerts.
- How you would migrate away.

Rules: decide the degraded behaviour explicitly rather than defaulting to
failure. Never call a third party synchronously in a critical path
without saying what happens when it is slow. State which of their terms
constrain the design. Treat their responses as untrusted input.
