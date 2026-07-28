---
name: agent-refactoring-workflow
description: Direct an agent through a refactor in verifiable steps with tests as the safety net, rather than one large rewrite. Use when restructuring code with agent assistance.
---

# Agent refactoring workflow

Agents are effective at mechanical restructuring and prone to changing
behaviour while doing it. Working in verified steps is what keeps a
refactor a refactor rather than an unreviewable rewrite.

## Method

1. **Establish test coverage first.** Refactoring without tests is
   rewriting and hoping, and the agent should add characterisation tests
   before changing anything (see refactoring).
2. **State the target structure.** What the code should look like
   afterwards, since an agent asked to improve it will change things you
   did not want changed.
3. **Work in small verified steps.** One transformation, run the tests,
   commit. Large refactors in one turn are unreviewable and hard to
   bisect (see pull-request-size).
4. **Forbid behaviour changes explicitly.** Say that the refactor must
   preserve behaviour exactly, and treat any behaviour change as a
   separate commit (see negative-instructions).
5. **Review the diff yourself.** Agent refactors touch many files, and
   an unreviewed large diff is where unintended changes hide.
6. **Keep tests untouched during the refactor.** Changing tests and
   implementation together removes the safety net entirely.
7. **Commit at every green point.** Frequent commits make it trivial to
   discard a bad step rather than unpicking it (see git-workflow).

## Boundaries

Refactoring preserves behaviour and does not fix design problems that
need a rethink. Agents can miss subtle behavioural differences that
tests do not cover. Large-scale restructuring may need a migration plan
rather than a refactor (see integration-migration).
