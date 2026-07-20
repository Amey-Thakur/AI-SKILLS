---
name: dotnet-dependency-injection
description: Use .NET's built-in DI with correct lifetimes, the options pattern, and constructor injection free of service-locator drift. Use when wiring .NET services or debugging captive-dependency and disposal bugs.
---

# .NET dependency injection

The container's job is assembling object graphs with declared
lifetimes. The three bugs that matter are all lifetime bugs: captive
dependencies, disposed-too-early services, and state accidentally
shared across requests.

## Method

1. **Choose lifetimes from state, shortest first.** Transient for
   stateless lightweight services (the default answer); Scoped for
   anything per-request (DbContext, unit-of-work, request caches);
   Singleton only for genuinely shared, thread-safe, stateless-or-
   immutable services (config, clients built for sharing like
   HttpClient handlers, caches designed for concurrency: see
   jvm-memory-model's singleton rule mirrored).
2. **Never let a long life capture a short one.** A singleton
   injecting a scoped service freezes one instance of it forever:
   the captive-dependency bug (scope-validation catches it in
   Development; leave `ValidateScopes` and `ValidateOnBuild` on).
   Where a singleton legitimately needs per-operation dependencies,
   inject `IServiceScopeFactory` and create a scope per operation:
   the pattern for hosted/background services processing items
   (see background-jobs).
3. **Inject through constructors; banish the locator.** Dependencies
   visible in the constructor, classes constructible in plain unit
   tests (the spring-boot-discipline rule, same reasoning).
   `GetService` calls sprinkled through business logic hide the
   graph and defeat compile-time reasoning; tolerate the provider
   only at composition roots, factories, and scope-creating
   boundaries. If a constructor takes eight services, the class has
   eight jobs (see function-size instincts at class scale,
   coupling-analysis).
4. **Bind configuration with the options pattern.** `IOptions<T>`
   for static config, `IOptionsMonitor<T>` where reload matters;
   validated at startup
   (`ValidateDataAnnotations().ValidateOnStart()`) so a bad setting
   fails deploy, not the 3am request (see config-management,
   spring-boot-discipline's typed-properties twin). Inject the
   options type, not `IConfiguration`, so consumers state what they
   need.
5. **Let the container own disposal, and factories own theirs.**
   Registered `IDisposable`s are disposed with their scope: do not
   dispose injected services yourself. Anything you create manually
   (via factory or `ActivatorUtilities`) you dispose. HttpClient
   goes through `IHttpClientFactory` (typed clients), which manages
   handler lifetimes and socket exhaustion for you (see
   connection-pooling).
6. **Keep registration readable and testable.** Group registrations
   into extension methods per feature
   (`services.AddBilling(config)`); prefer explicit registrations
   over assembly-scanning magic for anything with a lifetime
   subtlety. Integration tests swap edges (fakes for external
   APIs) via the test host's `ConfigureTestServices`, not by
   re-architecting for the container (see test-doubles,
   integration-testing).

## Boundaries

- The built-in container is deliberately minimal; adopt a
  third-party container only for a named missing feature you will
  actually use, not by reflex (see managed-vs-selfhosted
  reasoning in miniature).
- DI wires object graphs; it is not a plugin system or a substitute
  for design: interfaces exist where consumers need seams (see
  go-project-layout's consumer-side interfaces), not one-per-class
  by ritual.
- Static/ambient state (`ServiceLocator.Current`, static singletons)
  beside a container gives the worst of both worlds; migrate it or
  quarantine it behind an injected abstraction.
