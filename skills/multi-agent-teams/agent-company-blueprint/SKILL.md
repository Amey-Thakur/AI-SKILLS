---
name: agent-company-blueprint
description: Compose specialist agent desks into one operating company with a shared ledger, a weekly cadence, and human approval gates on anything binding. Use when you want agents to run the recurring operations of a business rather than a single project.
---

# Agent company blueprint

A single agent cannot run a business, and forty agents with no
structure run it into the ground. What works is a small number of
standing desks, each owning one function, writing to one shared record,
meeting on a fixed cadence, and escalating anything that spends money,
signs a commitment, or speaks publicly to a human. This skill is the
frame the other desks plug into.

## Team

- **Chief of staff** (`agent-role-definition`): sets the week's
  priorities, routes work, resolves conflicts between desks.
- **Standing desks** (`agent-finance-desk`, `agent-sales-pipeline`,
  `agent-customer-success-team`, `agent-marketing-studio`,
  `agent-legal-desk`): one function each, permanently staffed.
- **Project crews** (`agent-startup-squad`, `agent-migration-crew`):
  spun up for a piece of work, disbanded when it ends.

Shape: a hub with standing desks on a weekly loop, crews attached as
needed, one human owner above all of it.

## Method

1. **Write the operating charter first.** One page naming the desks
   that exist, what each owns, what each may decide alone, and what it
   must escalate. Ambiguity here becomes two desks doing the same work
   or none doing it (see agent-role-definition).
2. **Give every desk one file and one cadence.** Each writes its state
   to a known path on a known day, so the company's condition is
   readable without asking anyone. A desk that reports only when asked
   is a desk nobody notices failing.
3. **Keep one shared ledger of facts.** Customers, revenue, commitments,
   and open risks live in one place that every desk reads and only the
   owning desk writes. Desks holding private versions of the truth is
   the failure mode that ends the whole arrangement (see
   agent-context-isolation).
4. **Run a weekly review that produces decisions.** The chief of staff
   collects each desk's file, surfaces conflicts and blockers, and ends
   with a written list of decisions and owners, not a summary.
5. **Gate anything binding on a human.** Money out, contracts, public
   statements, hiring, pricing changes, and anything touching customer
   data stop at an approval step by design (see
   agent-orchestration-antipatterns).
6. **Retire desks that stop earning their place.** A desk producing
   reports nobody reads is overhead with a heartbeat; fold it into
   another or close it.
7. **Review the charter monthly.** As the business changes, ownership
   drifts, and the charter is the cheapest thing to correct.

## Run it

In Claude Code, give each desk its own subagent definition and its own
output file under a dated directory, with the chief of staff as the
orchestrator that reads all of them and writes the decision list.
A scheduled run makes the cadence real. Port to CrewAI as a hierarchical
crew with a manager agent, to AutoGen as a GroupChat with a planner, or
to LangGraph as a supervisor graph where each desk is a node and the
ledger is shared state.

## Signals it works

- The week ends with written decisions and owners, not a pile of reports.
- Any desk's current state can be read from its file without asking it.
- Binding actions consistently stop at the human gate rather than
  slipping through one desk that felt confident.

## Boundaries

This organises recurring operations; it does not replace the judgement
of the person accountable for the business. Agents draft, analyse, and
prepare, while a human decides anything with legal, financial, or
reputational consequence. Real relationships with customers, investors,
and staff are human work, and delegating them to an agent is how trust
is lost. Nothing here is legal, tax, or financial advice.
