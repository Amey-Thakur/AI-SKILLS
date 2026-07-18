---
name: xss-defense
description: Prevent cross-site scripting by encoding output for its exact sink, keeping template autoescaping on, and backing it with a strict Content Security Policy. Use when rendering user-controlled data into HTML, attributes, JavaScript, or URLs.
---

# XSS defense

Cross-site scripting happens when data the user controls is interpreted as
code by another user's browser. The defense is contextual output encoding:
the same string is safe in HTML text and dangerous in a `<script>` block, so
encoding depends on where the value lands. Autoescaping and a Content
Security Policy backstop the encoding you forget.

## Method

1. **Encode at output, for the specific context.** HTML body needs
   HTML-entity encoding; an attribute needs attribute encoding; inside
   `<script>` needs JavaScript-string encoding; a URL needs percent-
   encoding. Encoding for the wrong context still lets script through.
   Encode when you write to the page, not when you store.
2. **Keep template autoescaping on and never bypass it blindly.** Jinja2,
   Django, React (`{}`), and Handlebars escape HTML by default. Audit every
   bypass: `|safe`, `mark_safe`, `dangerouslySetInnerHTML`, `v-html`,
   `{{{ }}}`. Each is a place you promised the value is already safe. Make
   sure that promise holds.
3. **Sanitize rich HTML with a real library, not a regex.** If users
   legitimately submit HTML from a rich-text editor, run it through
   DOMPurify or a server-side equivalent with a strict tag and attribute
   allowlist. Regex stripping of `<script>` is trivially bypassed with
   `<img onerror>` and malformed tags.
4. **Guard URL sinks against `javascript:` schemes.** A user-supplied
   `href` or `src` of `javascript:alert(1)` executes on click. After
   canonicalizing, allow only `http`, `https`, and `mailto`; reject or
   neutralize the rest.
5. **Deploy a strict Content Security Policy.** Set
   `Content-Security-Policy` with a nonce- or hash-based `script-src`, no
   `unsafe-inline`, and no broad wildcards. CSP turns a missed encoding from
   account takeover into a blocked script and a console error. Start in
   `Content-Security-Policy-Report-Only` to find violations before you
   enforce.
6. **Set session cookies HttpOnly so script cannot read them.** Mark them
   `HttpOnly` and `Secure`. Even if XSS fires, the token stays out of reach
   of `document.cookie`, shrinking what a successful injection can steal.

## Signals

- Can you name the output context (HTML, attribute, JS, URL) for every place
  user data reaches the page?
- Does a grep for `dangerouslySetInnerHTML`, `|safe`, and `v-html` turn up
  only reviewed, justified uses?
- Does your CSP block inline script, tested against a real injection
  payload?

## Boundaries

Output encoding defends against XSS; it is not input validation and does not
stop injection into other sinks. DOM-based XSS lives entirely in client
JavaScript (`innerHTML`, `eval`, `document.write`) and needs the same
contextual encoding applied in the browser. Framework defaults cover most
cases, so reach for manual encoding only where you left autoescaping behind.
