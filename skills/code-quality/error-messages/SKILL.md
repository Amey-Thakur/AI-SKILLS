---
name: error-messages
description: Write error messages that name the specific thing, show the offending state, and state the fix as an action. Use when writing any thrown exception, log line, or user-facing failure text.
---

# Error messages

An error message is read exactly when someone is stuck, frustrated, and
looking for the way out. "Invalid input" or "Something went wrong" adds
nothing to that situation. A message that earns its place names what
failed, shows the state that caused it, and points at the next action.

## Method

1. **Name the specific thing.** Not "file error" but "cannot read
   config.yaml": the exact filename, key, field, or id. The reader should
   not have to guess which of forty files the message means. Include the
   identifier they can grep for.
2. **Show the offending state.** Quote the actual value against the
   expected shape: "port must be 1 to 65535, got 70000" or "expected 3
   columns, row 12 has 5". The gap between got and expected is usually the
   whole diagnosis.
3. **State the fix as an action.** End with what to do: "set DATABASE_URL
   in .env" or "run `migrate up` first". A message that describes the
   problem but not the remedy leaves the reader exactly where they started,
   one search deeper.
4. **Write for the reader, keep internals in logs.** A user sees "This
   image is over 10 MB; compress it or choose another"; the stack trace,
   error code, and request id go to the log. Correlate the two with an id
   the user can quote, not by dumping the trace on their screen.
5. **Match severity to reality.** Do not log an expected empty result as
   `ERROR`, and do not whisper a data-loss risk at `info`. A log scanner
   filtering on level trusts that you got this right; a miscolored line
   hides the one that matters.
6. **State the fact, not blame or mood.** Drop "Oops!", "Fatal!", and "You
   entered an invalid value". Say what happened and what to do.
   Blame-free, specific, actionable: the reader wants out, not an apology.

## Signals

- Does the message name the exact field, file, or id, or only a vague
  category?
- Could a first-time reader act on it without opening the source?
- Are got and expected both visible whenever a value is rejected?

## Boundaries

Security-sensitive failures deliberately withhold detail: a login error
says "invalid credentials", never "no such user", and the diagnostic goes
to the log instead of the message. Internal panics on genuine bugs favor a
full stack trace over a polished sentence, because the audience there is
the developer, not the user.
