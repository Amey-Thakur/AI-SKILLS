---
name: pci-scope-reduction
description: Keep card data out of your systems so compliance obligations stay minimal, and know what remains in scope when it cannot. Use when handling card payments or preparing for a compliance assessment.
---

# PCI scope reduction

Compliance cost scales with how much card data touches your systems. The
cheapest programme is the one where card data never reaches your
servers, so the strategy is not securing card data but avoiding
possession of it.

## Method

1. **Use hosted fields or a redirect.** When the card goes directly from
   the browser to the provider, your servers never see it, which is the
   single largest reduction available (see payment-integration).
2. **Store tokens, never numbers.** A provider token references the
   payment method without being one, and it is safe to keep in your
   database.
3. **Audit every place card data could land accidentally.** Logs, error
   reports, support tools, screenshots, and analytics payloads are how
   data enters scope without anyone deciding it should (see
   data-minimization).
4. **Segment any system that must handle card data.** If a flow
   genuinely requires it, isolate it on its own network and hosts so the
   rest of the estate stays out of scope (see zero-trust-basics).
5. **Know which validation level and questionnaire applies.** It depends
   on volume and integration method, and choosing the integration
   changes the questionnaire dramatically.
6. **Keep evidence continuously.** Configuration exports, access
   reviews, and scan results collected on a schedule rather than
   assembled before an assessment (see agent-compliance-desk).
7. **Re-check scope after every integration change.** A new analytics
   script on the checkout page can pull that page back into scope.

## Boundaries

- This is not a compliance opinion; validation is performed by a
  qualified assessor or self-assessment as your level requires.
- Reducing scope reduces obligation, not responsibility for a breach.
- Provider compliance covers their systems only; your integration and
  surrounding pages remain yours.
