---
name: firmware-ota-updates
description: Ship over-the-air firmware with A/B slots, signed images, power-loss resilience, and staged fleet rollout. Use when building device update systems or reviewing one before it bricks a fleet.
---

# Firmware OTA updates

OTA is the highest-stakes code you will ship: a bug in the updater
bricks devices you cannot touch. Every design choice serves one
invariant: the device can always boot *something* that can take
another update.

## Method

1. **Use A/B slots with an immutable recovery floor.** Two
   application slots: write the new image to the inactive slot,
   verify, mark bootable, reboot into it; the old slot remains
   intact for rollback. Beneath both, a minimal bootloader that
   never updates OTA (or only via a separately-armored path)
   and can always reach the update channel: that is the
   unbrickable floor (see cloud-disaster-recovery's tiered
   thinking, in silicon).
2. **Verify signatures before *and* at every boot.** Images
   signed (ed25519-class) with keys the device holds only the
   public half of; verify after download, and secure-boot
   verifies the active slot each boot so corrupted flash fails
   to rollback instead of executing garbage. Include version
   anti-rollback (monotonic counters) so an attacker cannot
   downgrade to a vulnerable build (see crypto-usage,
   supply-chain-defense for the signing pipeline).
3. **Make the state machine power-loss-proof.** Update state
   (downloading, verified, trial-boot, confirmed) lives in
   flash with atomic transitions (see script-idempotency's
   atomicity at byte scale); yank power at *any* point and the
   device resumes or reverts cleanly: test exactly that with
   automated power-cycling rigs, hundreds of cycles across the
   state transitions (see chaos-testing, made literal).
4. **Confirm health before committing.** First boot on the new
   slot is a trial: the application must positively confirm
   (connectivity up, watchdog quiet, self-tests pass: see
   health-checks' readiness idea) within a window, or the
   bootloader auto-reverts to the old slot. The confirm bar is
   "can take the *next* update", minimum: a device that boots
   but cannot update again is slow-motion bricked.
5. **Roll out to the fleet in stages.** Canary cohort (lab
   devices, then 1%), watch update-success and post-update
   health telemetry (see mobile-observability's release-health
   twin, canary-analysis), expand on evidence with numeric
   halt criteria; jitter download windows so a million devices
   do not hit the CDN and the cell network at once (see
   scheduled-jobs' jitter, cdn-strategy). Delta updates cut
   bandwidth 5-10x for constrained links (see iot-messaging's
   budget reality); resumable downloads for flaky connectivity.
6. **Version compatibility beyond the binary.** Config and data
   formats migrate forward across versions (see
   game-save-systems' migration discipline); hardware revisions
   gate image selection (right image for the right board,
   enforced by device-reported IDs); and the fleet dashboard
   answers "which versions are out there" at all times: you
   will support every version that exists until it does not
   (see api-versioning's usage-measurement rule).

## Boundaries

- Managed OTA services (Mender/Memfault/AWS-class) implement
  much of this; evaluate them against the checklist above
  rather than rebuilding (see managed-vs-selfhosted): the
  power-loss and confirm-health testing remains yours either
  way.
- Tiny MCUs without space for two slots need swap-with-scratch
  schemes (MCUboot-style) with their own fine print; the
  invariants stay identical, the mechanics get harder.
- Update *content* policy (what ships when, regulatory
  re-certification for medical/automotive) is a release
  process on top (see mobile-release-strategy's cadence
  ideas); this skill is the mechanism that makes any policy
  survivable.
