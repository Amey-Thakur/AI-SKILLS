---
name: agent-tool-permissions
description: Configure what a coding agent may do without asking, balancing autonomy against the cost of an unwanted action. Use when setting up an agent's permissions for a project.
---

# Agent tool permissions

Permission configuration decides how much the agent can do unattended.
Too restrictive and every step needs approval until you stop reading
them; too permissive and a mistaken command is executed before you see
it.

## Method

1. **Allow read operations broadly.** Reading files, searching, and
   running tests are cheap, reversible, and needed constantly, so
   prompting on them trains you to approve blindly.
2. **Gate anything that writes outside the working tree.** Package
   installs, system changes, and network calls have effects that
   outlive the session.
3. **Never auto-approve destructive commands.** Force pushes, deletions,
   and history rewrites need a human every time (see
   agent-human-checkpoint).
4. **Scope credentials to the project.** An agent inherits your
   environment, so limit what those credentials can reach (see
   api-credential-rotation).
5. **Review permission rules periodically.** Rules accumulate during
   frustrating sessions and are rarely revisited (see
   repository-permissions).
6. **Use a sandbox for exploratory work.** A container or worktree
   limits the blast radius of an autonomous session (see
   environment-provisioning).
7. **Prefer allowing a specific command to disabling prompts.** Broad
   auto-approval to stop interruptions removes the check entirely.

## Boundaries

Permissions constrain tools and not intent, so an agent can still make
harmful changes within allowed operations. Approval fatigue is real and
makes over-prompting counterproductive. Version control is the practical
safety net for anything in the working tree (see git-workflow).
