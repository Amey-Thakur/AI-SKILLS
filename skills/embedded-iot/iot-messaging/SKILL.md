---
name: iot-messaging
description: Connect device fleets with MQTT topic design, QoS chosen per message class, offline buffering, and safe fleet commands. Use when designing device-to-cloud messaging or debugging lost telemetry and stuck commands.
---

# IoT messaging

Devices live on networks that drop, NAT-timeout, and meter every
byte. The messaging design decides what survives that: topic
structure is your API, QoS is your delivery contract, and offline
behavior is where fleets succeed or quietly hemorrhage data.

## Method

1. **Design topics as a stable, ACL-able hierarchy.**
   `v1/{site}/{device}/telemetry/{sensor}`,
   `v1/{site}/{device}/cmd/{action}`, with device credentials
   scoped to their own subtree (a device may publish only its
   telemetry, subscribe only its commands: see least-privilege,
   multi-tenancy's scoping). Version the prefix (see
   api-versioning); wildcards are for backend consumers, never
   for device subscriptions.
2. **Choose QoS per message class, minimally.** Telemetry that
   is dense and replaceable: QoS 0 (loss is cheaper than the
   retransmit chatter). Events and alarms: QoS 1 with
   consumer-side dedup (at-least-once means duplicates; see
   idempotent-consumers, delivery-guarantees). QoS 2 almost
   never: its four-way handshake costs battery and broker state
   for a guarantee idempotency provides cheaper. Retained
   messages for last-known-state topics (dashboards read
   without waiting for the next publish).
3. **Buffer offline with an explicit policy.** Flash-backed
   ring per message class (see
   embedded-memory-constraints' pools): alarms keep-oldest
   until delivered, telemetry drop-oldest with a gap marker
   (see sensor-data-handling's timestamped batching so
   backfilled data lands correctly). On reconnect: drain
   oldest-first with rate limiting: a thousand devices
   reconnecting after an outage must not DDoS the broker with
   their backlogs (jittered reconnect with exponential
   backoff; see scheduled-jobs, timeouts-and-retries).
4. **Tune the connection for the link's economics.**
   Keepalive interval balanced against NAT timeouts and radio
   wakeups (each ping costs battery: see low-power-design);
   persistent sessions so subscriptions survive reconnects;
   TLS with session resumption (full handshakes per connect
   drain batteries and data plans; see tls-configuration);
   payloads compact (CBOR/protobuf over JSON at scale, delta
   encoding: see firmware-ota-updates' delta logic for the
   big payloads).
5. **Make commands a request/response discipline.** Commands
   carry IDs and expiry; devices ack to a response topic with
   outcome; the platform tracks pending commands and retries
   idempotently (see idempotency-keys: a "reboot" delivered
   twice must be safe or gated). Broadcast/fleet commands
   stage like any rollout (cohorts, halt criteria: see
   firmware-ota-updates' staging, automation-guardrails for
   the blast-radius controls).
6. **Monitor the fleet's connectivity as a product metric.**
   Last-will messages flag ungraceful disconnects; per-device
   last-seen, connect-churn rates, message-loss estimates
   (sequence gaps), and buffer high-water marks on dashboards
   (see mobile-observability's fleet-health analog,
   infrastructure-monitoring): a rising churn rate is a
   network, power, or firmware regression announcing itself
   before support tickets do.

## Boundaries

- MQTT is the default but not the law: constrained links may
  want CoAP/LwM2M, high-rate streams may want direct
  ingestion endpoints; the topic/QoS/offline design questions
  transfer to each.
- Broker scaling, bridging, and shared subscriptions are
  backend capacity work (see message-queues,
  capacity-planning); device-side design assumes the broker
  answers.
- Security beyond transport (device identity provisioning,
  cert rotation at fleet scale, revocation) is its own
  program (see iam-design's workload-identity thinking,
  secrets-management): messaging rides on it.
