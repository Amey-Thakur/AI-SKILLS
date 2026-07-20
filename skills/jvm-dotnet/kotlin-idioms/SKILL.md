---
name: kotlin-idioms
description: Write Kotlin that uses null safety, data classes, and coroutines as designed, with clean Java interop. Use when writing Kotlin or migrating Java code and habits to it.
---

# Kotlin idioms

Kotlin's value is making illegal states unrepresentable with less
ceremony: non-null types by default, values as data classes,
asynchrony as suspending functions. Java habits imported wholesale
forfeit exactly that value.

## Method

1. **Design types non-null first.** `String?` is a decision, not a
   default; push nullability to the edges and convert early
   (`?: throw`, `requireNotNull` with a message). Use `?.` and `?:`
   for genuine absence; every `!!` is a latent NPE with your name
   on it: acceptable in tests, a review flag in production code.
   Platform types from Java are unchecked: annotate your Java
   (`@Nullable`/`@NotNull`) or wrap it at the boundary (see
   null-handling).
2. **Model values as data classes and sealed hierarchies.**
   `data class` for value carriers (copy() for updates, val
   everywhere: see immutability-defaults); `sealed interface` plus
   `when` for closed alternatives, letting the compiler enforce
   exhaustiveness (the exhaustive-switches discipline, built in).
   Prefer immutable `List`/`Map` interfaces in signatures and
   `toList()` copies at boundaries; Kotlin's read-only views are
   not deep immutability (see java-collections).
3. **Use scope functions sparingly and conventionally.** `let` for
   null-guarded transforms, `apply` for object configuration,
   `also` for side effects in a chain: one level deep. Nested
   `let`s with shadowed `it`s are write-only code; a local val and
   an if reads better (see cognitive-load).
4. **Write coroutines with structured concurrency.** Suspend
   functions for async work; launch inside a scope tied to a
   lifecycle (`coroutineScope`, supervisor scopes for independent
   children), never `GlobalScope`. Cancellation is cooperative:
   check it in loops, keep `withContext(Dispatchers.IO)` around
   blocking calls, and treat `CancellationException` as control
   flow to rethrow, not an error to log (the go-concurrency and
   python-asyncio contracts, Kotlin dialect).
5. **Keep Java interop deliberate.** Expose Kotlin APIs Java can
   call cleanly (`@JvmStatic`, `@JvmOverloads` where Java callers
   exist); default arguments replace builder/overload ladders for
   Kotlin consumers. Checked exceptions vanish in Kotlin: document
   throwing behavior (see rust-error-handling's audience thinking)
   since the compiler no longer forces callers to see it.
6. **Prefer expressions and small functions.** Single-expression
   functions, `when` as an expression, early returns over nested
   conditionals (see guard-clauses); extension functions to give
   existing types domain verbs, kept in the domain's package rather
   than a global Utils file (see python-project-structure's
   grab-bag rule).

## Boundaries

- Kotlin does not fix the JVM's rules: the memory model
  (see jvm-memory-model), GC behavior, and collections contracts
  apply unchanged under the nicer syntax.
- Operator overloading and DSL builders are library-author tools;
  application code inventing clever operators trades a day of
  writing for years of "what does this plus mean" (see
  naming-things).
- Coroutines interop with blocking frameworks needs explicit
  bridges (`runBlocking` at the very top only); sprinkling
  runBlocking inside services deadlocks thread pools.
