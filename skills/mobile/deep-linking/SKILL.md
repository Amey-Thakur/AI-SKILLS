---
name: deep-linking
description: Set up universal and app links that open the right in-app screen from a URL, with deferred links surviving install and a routing layer that validates every parameter. Use when adding shareable links, wiring campaign or email links into the app, or debugging links that open the browser instead.
---

# Deep linking

A deep link maps an external URL to an in-app destination. Done right, a
shared link opens the app on the exact screen; done wrong, it bounces to
the website or a blank home screen. The setup is fiddly and platform-
specific: association files, intent filters, and a router that treats every
incoming URL as untrusted.

## Method

1. **Use verified links, not custom schemes, for web-originating URLs.**
   Configure iOS Universal Links with an `apple-app-site-association` file
   at the domain root (served over HTTPS, correct `application-identifier`,
   no redirect) and Android App Links with `assetlinks.json` plus
   `autoVerify` intent filters. These open the app directly and cannot be
   hijacked by another app the way a `myapp://` scheme can. Keep a custom
   scheme only as an internal fallback.
2. **Route through one entry point with typed, validated parsing.** Funnel
   every link through a single router that parses path and query into a
   typed destination and rejects anything malformed. Treat URL parameters
   as hostile input: an id in a link can be forged, so authorize on arrival
   rather than trusting the link to imply access.
3. **Build the parent back stack on arrival, do not just show the leaf.**
   When a link lands deep, synthesize the navigation stack beneath it so
   Back reaches a real parent, not app exit. This is the same back-stack
   discipline as in-app navigation, applied to an externally triggered
   entry.
4. **Handle deferred deep links for users without the app.** When a link
   targets content but the app is not installed, send the user to the store,
   then on first launch route to the original destination. Carry the intent
   through install using a deferred-link SDK or a fingerprint/clipboard
   match, and account for the privacy limits that make deferred matching
   probabilistic, not guaranteed.
5. **Cover cold start, warm resume, and running states.** A link must work
   when the app is not running (parse in the launch handler), backgrounded
   (`onNewIntent`, `continueUserActivity`), and foreground. Each path is a
   distinct code route and each is a distinct bug; test all three.
6. **Version the URL contract and keep old links working.** Links live
   forever in emails, messages, and search results. Never repurpose a path;
   redirect retired routes to a sensible screen so a two-year-old link does
   not dead-end.

## Testing matrix

- App state: not installed, installed-not-running, backgrounded,
  foreground. Trigger each with `adb shell am start -a android.intent.action.VIEW -d "<url>"`
  and `xcrun simctl openurl booted "<url>"`.
- Source: browser address bar, Notes/Messages tap, email client, another
  app. Some sources strip or wrap URLs; a link that works pasted may fail
  from an email client.
- Verify the association files with the platform validators and confirm no
  redirect sits in front of them.

## Boundaries

This covers the URL-to-screen mapping, association setup, and deferred
install flow. The in-app hierarchy the link lands into is mobile-navigation;
routing a notification tap is push-notifications. Attribution accuracy and
campaign analytics beyond first-open routing are a marketing concern, not
part of the link contract.
