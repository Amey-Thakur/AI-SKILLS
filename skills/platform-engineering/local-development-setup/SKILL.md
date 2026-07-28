---
name: local-development-setup
description: Make a working local environment reachable in minutes from a clean machine, and keep it close to production. Use when onboarding takes days or developers cannot run the system locally.
---

# Local development setup

A slow or broken local setup taxes every developer continuously and
blocks new joiners entirely. It is usually neglected because the people
who could fix it already have it working.

## Method

1. **Target one command from a clean checkout.** Everything else is
   documentation nobody follows correctly (see
   contributor-onboarding).
2. **Test on a genuinely clean machine.** Setup instructions written by
   someone with the tools installed always omit steps.
3. **Containerise dependencies.** Databases, queues, and services as
   containers rather than machine-wide installations that conflict
   between projects.
4. **Provide seed data.** An empty database is not a working
   environment, and realistic sample data is what makes local testing
   meaningful (see environment-provisioning).
5. **Keep it close to production.** Same major versions and
   configuration shape, since divergence moves bug discovery later.
6. **Make the feedback loop fast.** Hot reload and fast tests, because
   the edit-run cycle is repeated hundreds of times a day.
7. **Own it explicitly.** An unowned setup decays until someone new
   cannot start, which is when the cost becomes visible.

## Boundaries

Local environments cannot reproduce production scale, data, or managed
services fully. Some systems are too large to run locally and need
alternatives such as remote development. Machine differences remain a
source of divergence that containers reduce rather than eliminate.
