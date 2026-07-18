---
name: mobile-app-security
description: Protect a mobile app by storing secrets in the platform keystore, pinning certificates only where rotation is controlled, and treating obfuscation as delay rather than defense. Use when building or reviewing an iOS or Android app that holds tokens, keys, or user data on device.
---

# Mobile app security

A mobile binary runs on hardware the attacker owns. They can decompile it,
read its storage, and proxy its traffic on a rooted phone. The recurring
mistakes all treat the device as trusted: secrets dropped in plain
preferences, a binary that carries its own API keys, and obfuscation mistaken
for a control. Build for an environment where the user may be the adversary.

## Method

1. **Store secrets in the hardware-backed store, not flat files.** Put tokens
   and keys in the iOS Keychain with `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`,
   or the Android Keystore, never in `UserDefaults`, `SharedPreferences`,
   SQLite, or a plist. Those sit in cleartext in the sandbox and in cloud
   backups.
2. **Ship no long-lived secret in the binary.** Anything compiled in falls out
   to `strings`, Hopper, or jadx. Keep API secrets server-side, hand the app
   short-lived tokens, and route any third-party call that needs a secret
   through your own backend.
3. **Pin certificates only where you can rotate fast.** Pin to the CA or
   intermediate public key rather than the leaf, and ship at least one backup
   pin so a cert renewal does not brick installed apps. Skip pinning when you
   cannot push an update quickly enough to survive an emergency key change.
4. **State the ceiling on obfuscation.** R8, ProGuard, or a commercial packer
   buys minutes to hours against a reverse engineer, not permanence. Use it to
   slow analysis, never as the barrier between an attacker and a value that
   must stay secret, since Frida reads it at runtime regardless.
5. **Keep sensitive data off the OS surface.** Exclude token files from iCloud
   and Android auto-backup, set `FLAG_SECURE` or blur on backgrounding so
   screens stay out of the app switcher and screenshots, and validate deep
   links and custom URL schemes as untrusted input.
6. **Treat root and jailbreak detection as signal, not a gate.** It helps fraud
   scoring and can trip a casual attacker, but any client check runs on the
   attacker's device and gets patched out. Enforce every trust decision on the
   server.

## Signals

- Does pulling the app sandbox off a rooted device reveal any token in
  cleartext?
- Does a server cert renewal keep old installs working through a backup pin?
- Can the app still enforce authorization once root detection is bypassed?
- Do sensitive screens stay blank in the task switcher and screenshots?

## Boundaries

This addresses on-device storage, transport trust, and binary hardening. It
does not cover the API the app talks to (see api-security) or the flow that
issues its tokens (see oauth-flows). Server-side enforcement stays the real
control: the client hardens, it does not decide.
