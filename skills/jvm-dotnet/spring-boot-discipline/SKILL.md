---
name: spring-boot-discipline
description: Keep Spring Boot apps explicit with constructor injection, typed configuration, test slices, and restrained magic. Use when building or reviewing Spring Boot services that must stay debuggable.
---

# Spring Boot discipline

Spring's power is wiring; its failure mode is invisibility. The
discipline is keeping every behavior traceable to code you can read:
explicit constructors, typed config, and knowing what each annotation
actually registers.

## Method

1. **Inject through constructors, always.** Final fields, one
   constructor (no `@Autowired` needed): dependencies are visible,
   the class is constructible in a plain unit test without Spring,
   and circular dependencies fail fast at startup instead of hiding
   behind lazy proxies. Field injection is untestable state
   assembly; a circular-dependency error is a design smell to fix,
   not to `@Lazy` away (see coupling-analysis).
2. **Bind configuration to typed, validated properties.**
   `@ConfigurationProperties(prefix = "billing")` records with
   validation annotations, over scattered `@Value` strings: typos
   fail at startup, config is discoverable in one class, and IDE
   metadata works. Profiles select per-environment values; secrets
   come from the environment or a vault, never committed YAML (see
   config-management, secrets-management).
3. **Keep beans honest about their scope and cost.** Singletons are
   the default and must therefore be stateless or thread-safe (see
   jvm-memory-model); request-scoped state belongs in method
   parameters, not mutable singleton fields. Heavy startup work
   moves behind `ApplicationRunner` or lazy initialization
   deliberately, and startup time is watched: a service that takes
   two minutes to boot fails its readiness budget (see
   health-checks, kubernetes-workloads startup probes).
4. **Draw transaction boundaries where you can see them.**
   `@Transactional` on the service method that forms the unit of
   work; know the proxy rules (self-invocation bypasses it,
   private methods ignore it) and keep transactions short: no HTTP
   calls inside (see transactions-isolation, timeouts-and-retries).
   Publishing events after commit uses
   `@TransactionalEventListener` or the outbox (see
   transactional-outbox), not hope.
5. **Test with slices, reserve the full context.** Plain JUnit for
   domain logic (constructor injection makes this free);
   `@WebMvcTest` for controllers with mocked services,
   `@DataJpaTest` for repositories against Testcontainers-backed
   databases (see database-testing, test-environment-parity); one
   or two `@SpringBootTest` smoke tests that the context assembles
   and endpoints respond. A suite of full-context tests is a
   ten-minute build that tests wiring a hundred times (see
   test-speed).
6. **Audit the auto-configuration you ship.** Review actuator's
   conditions report to know what Spring registered on your behalf;
   pin down surprises with explicit beans. Expose actuator
   endpoints deliberately (health and metrics; not env/heapdump to
   the world: see security-headers instincts, least-privilege) and
   wire health groups to your real dependencies (see
   health-checks).

## Boundaries

- Spring is for applications; libraries published to other teams
  should not require a Spring context to use (see api-sdk-design).
- Reflection-heavy magic (AOP everywhere, custom BeanPostProcessors)
  is a maintainability tax and a native-image obstacle; each use
  needs an owner who can explain it in review.
- Reactive Spring (WebFlux) changes threading, transactions, and
  debugging entirely; do not mix stacks casually: choose per
  service with the blocking-vs-reactive workload argument (see
  async-io-patterns).
