---
name: mcp-authentication
description: Authenticate and authorise access to a remote MCP server so tools act as the right user with the least necessary privilege. Use when hosting an MCP server that more than one person or agent reaches.
---

# MCP authentication

A remote MCP server exposes capability to an autonomous caller, which
makes the identity question sharper than in a normal API: you must know
which user an agent is acting for, and the agent must not be able to
exceed what that user may do.

## Method

1. **Authenticate the user, not just the client.** An agent acts on
   behalf of somebody, and authorisation decisions need that identity
   rather than a shared service credential.
2. **Use standard delegated authorisation.** OAuth-style flows with
   scoped tokens, rather than long-lived shared secrets pasted into
   configuration (see oauth-flows).
3. **Scope tokens to the minimum capability.** A read-only integration
   should hold a token that cannot write, since the agent will
   eventually attempt something unintended (see authz-design).
4. **Authorise per tool call, not per connection.** Permissions change
   during a long-lived session, and a check at connect time is not a
   check (see realtime-permissions).
5. **Never accept credentials as tool parameters.** Credentials passed
   through the model's context are logged, retained, and exposed by
   construction (see secrets-management).
6. **Make token expiry and refresh work unattended.** An agent cannot
   complete an interactive re-auth mid-task, so the flow must renew or
   fail clearly.
7. **Log every call with identity and parameters.** Attribution is what
   makes an incident investigable when an agent did something
   unexpected (see audit-logging).

## Boundaries

Authentication establishes identity; it does not constrain what an agent
attempts, which is what scoping and confirmation are for. Local stdio
servers inherit the user's session and need a different model. Consent
for a user's data to be reachable by an agent is a separate question
(see pii-handling).
