---
name: e2e-testing
description: Write end-to-end tests that earn their cost by covering complete user journeys against stable selectors. Use when protecting a critical path like signup or checkout across the full stack.
---

# End-to-end testing

An end-to-end (E2E) test drives the real application the way a user does:
through the browser, across every layer, to a real result. Each one is slow,
brittle, and costly to maintain, so it has to pay rent. A suite that retests
every field validation through the UI collapses under flakiness and gets
muted. Spend E2E tests only on journeys whose failure would cost real money
or trust, and build them to survive cosmetic change.

## Method

1. **Test journeys, not pages.** One test completes a goal a user cares
   about, end to end: register, add to cart, pay, see the confirmation.
   Field-level rules and error copy belong in faster tests, not a browser
   round trip.
2. **Select by role or test id, never by styling.** Target
   `getByRole("button", {name: "Pay"})` or `data-testid="submit-order"`, not
   `.btn-primary:nth-child(3)`. Selectors tied to layout break on every
   redesign that changed no behavior.
3. **Wait on state, never on the clock.** Assert the app reached a condition,
   `await expect(page.getByText("Order placed")).toBeVisible()`, never
   `sleep(3000)`. Fixed sleeps are the primary engine of E2E flakiness and
   slowness at once.
4. **Seed data through the API, act through the UI.** Create the account and
   catalog with fast backend calls, then drive only the journey under test
   through the browser. Building prerequisites by clicking multiplies both
   runtime and failure surface.
5. **Keep the count small and the paths critical.** A handful of journeys run
   on merge beats hundreds run nightly and ignored. Rank by revenue and
   support-ticket risk, and delete any test whose failure no one would act
   on.
6. **Isolate each run's data.** Unique emails and tenant ids per run let tests
   execute in parallel without colliding, and let a failed run leave
   diagnosable state instead of poisoning the next.

## Signals

- Does each test represent a path a real user takes to a real outcome, not a
  single widget?
- Would a CSS refactor that preserves behavior leave every test green?
- When one fails, does the trace point at a broken journey rather than a
  timing accident?

## Boundaries

E2E is the narrow top of the pyramid, not where coverage lives: push edge
cases and validation down to integration-testing and unit-test-design.
Follow the team's chosen runner, Playwright, Cypress, or Selenium, over the
selector and waiting syntax shown here.
