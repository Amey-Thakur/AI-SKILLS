---
name: grpc-services
description: Design gRPC services with clean proto contracts, versioning, streaming patterns, and deadline propagation. Use when building high-performance service-to-service APIs or evaluating gRPC against REST.
---

# gRPC services

gRPC uses Protocol Buffers over HTTP/2 for fast, strongly-typed
service-to-service communication with generated clients in every
language. It shines for internal microservice APIs where performance
and contract strictness matter; the design work is the proto contract,
its evolution, and using the streaming and deadline features correctly.

## Method

1. **Design the proto as the contract, carefully.** The
   `.proto` file defines the service, methods, and message
   types, and generates clients and servers in every
   language (see openapi-contracts' spec-first ethic, gRPC
   edition): so the proto is the API. Design messages for
   the domain, group related RPCs into services, and treat
   the proto with the same review rigor as any public
   contract.
2. **Evolve protos with the compatibility rules.** Field
   numbers are the wire identity and are permanent: never
   reuse or change a field's number; add new fields with new
   numbers (old clients ignore them), reserve removed field
   numbers, and never change a field's type (see schema-
   evolution, api-change-management: Protobuf's rules are
   strict and mechanical). Following them gives backward and
   forward compatibility; breaking them corrupts data
   silently.
3. **Choose the right RPC pattern.** Unary (request-
   response, the default), server streaming (one request,
   stream of responses: feeds, large result sets), client
   streaming (stream up, one response: uploads, batched
   ingestion), bidirectional streaming (chat, real-time
   sync). Pick the pattern matching the interaction; forcing
   everything into unary loses gRPC's streaming advantage
   where it fits.
4. **Propagate deadlines through the call chain.** gRPC
   deadlines flow across service boundaries: a caller's
   deadline is visible to the callee, which passes it
   further (see timeouts-and-retries' budget propagation).
   Set deadlines on every call (never infinite), and honor
   the incoming deadline (stop work the caller has abandoned):
   this is how gRPC systems avoid the cascading-timeout
   failures of naive chains.
5. **Handle errors with status codes and details.** gRPC's
   status codes (NOT_FOUND, INVALID_ARGUMENT,
   DEADLINE_EXCEEDED, UNAVAILABLE) plus rich error details
   (structured error messages): map failures to the right
   code so clients branch correctly and retry the retryable
   (UNAVAILABLE yes, INVALID_ARGUMENT no: see api-error-
   responses, timeouts-and-retries). Use the standard codes'
   semantics, do not invent your own meanings.
6. **Add the cross-cutting concerns via interceptors.**
   Auth, logging, tracing, retries, and metrics as
   interceptors (the middleware equivalent: see the mesh
   discussion in service-mesh-tradeoffs): applied uniformly
   across services without per-method code. Deadline
   propagation, retries with backoff, and load balancing
   are gRPC-native or mesh-provided; use them rather than
   reimplementing.

## Boundaries

- gRPC excels for internal service-to-service APIs
  (performance, strict contracts, streaming, polyglot);
  it is a poor fit for browser clients (needs gRPC-Web and
  a proxy), public APIs (REST/GraphQL are more accessible),
  and human-debuggable endpoints (binary, not curl-able).
  Choose per boundary (see rest-endpoint-design,
  graphql-schema-design).
- The binary protocol and codegen add tooling weight
  (proto compilation, generated code in the build); worth
  it for many services, overhead for a couple. Match to
  the system's scale.
- Field-number permanence and proto evolution rules are
  unforgiving; a mistake (reused field number) corrupts
  data across versions. This strictness is a feature
  (guaranteed compatibility) that demands discipline.
