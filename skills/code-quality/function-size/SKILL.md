---
name: function-size
description: Size functions to one clear job, extracting when they blur and leaving them long when the logic is linear. Use when a function grows hard to name or scan.
---

# Function size

The unit of a function is a job, not a line count. A function is the right size
when you can name what it does without "and", and read it without scrolling past
its own purpose. Length is a symptom worth reading, not the disease itself.

## Method

1. **Name the job in one phrase; if you need "and", split.**
   `validateAndSaveAndNotify` is three functions wearing one name. A name that
   stays honest with a single verb and object marks a function doing one thing.
2. **Watch the real extraction triggers,** not the line total: a comment
   announcing a "section", a block that needs its own local variables, a shift
   in level of abstraction, or a span you had to scroll to read whole. Any one
   of these is louder than raw length.
3. **Extract along abstraction seams.** A top-level function should read like a
   table of contents: `parseRequest`, `authorize`, `applyChange`,
   `renderResponse`. Push the how down a level so each layer speaks one
   vocabulary. A socket write sitting beside a business rule is the tell.
4. **Keep the parameter list short.** More than three or four arguments usually
   signals a missing type: bundle the related ones into a struct or options
   object. A long parameter list is size leaking through the signature instead
   of the body.
5. **Leave linear code long when splitting would only scatter it.** A 60-line
   function that runs straight down, with no reuse and one level of abstraction,
   is fine. Chopping it into helpers each called once, each needing the caller's
   context, makes the reader jump around to reassemble a single thought.
6. **Split when a piece wants its own test or its own reuse.** The clearest
   reason to extract is a block you want to assert on directly or call from a
   second place. Absent that, extraction buys only a name; weigh whether the
   name earns the indirection it adds.

## Litmus tests

- Can you state the function's job in one sentence with no "and" or "then"?
- Does reading it top to bottom stay at one level of abstraction, or dive into
  byte-shuffling between business steps?
- For each helper you extracted, is it tested or reused? If neither, did the
  name alone justify the jump?

## Boundaries

A linter's line limit is a prompt to look, not a verdict: a 12-line function
doing two jobs is worse than a 50-line one doing one. This skill sizes by
responsibility and defers branch counting to cyclomatic-complexity and the names
that extraction creates to naming-things.
