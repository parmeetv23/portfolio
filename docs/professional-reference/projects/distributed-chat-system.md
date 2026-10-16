---
project_id: distributed-chat-system
name: "IRC-HAT — Distributed IRC-Style Chat System"
dates: "Jan. 2025 -- Apr. 2025"
categories: ["Distributed systems", "Networking", "Concurrent programming", "File persistence"]
technologies: ["Java", "Java NIO", "TCP", "Jackson", "org.json", "JLine", "Gradle", "Docker", "Docker Compose", "JSON", "SHA-256"]
evidence:
  - evidence/distributed-chat-system/PROJECT_ANALYSIS.md
---

> Transfer source: `Resume_Builder/projects/distributed-chat-system.md` at revision `0793f96beae0a8db7b3890dc70c9383d4c87b2cf`; copied 2026-10-15. Source class: **canonical-record**. Original provenance, uncertainty, and time qualifications remain applicable. See the collection README and GAPS.md before using claims.

# Overview

Course-project terminal chat application with client, chat-server, and addressing-server processes plus a shared library. Clients discover an available server, register a display name, exchange messages, and request recent history. Chat servers persist messages locally and relay them to peers; addressing replicas coordinate registry changes and contain Bully-style election logic.

“IRC-style” describes the interaction, not IRC wire-protocol compliance. Traffic uses custom newline-delimited JSON over TCP. Original implementation attribution follows the ownership instruction recorded in the evidence, not contributor lists or Git authorship inference.

# Core Contributions

- Selector-based accept/connect/read/write processing, per-connection framing state, dispatch, and queued chat output retaining partially written buffers.
- Separate typed chat/control envelope families, message factories and payload mapping, UUID chat IDs, and correlated addressing-message IDs.
- Capacity-aware discovery, registry/channel associations, process registration/count updates, tracked replica ACKs, deferred registration replies, retry watchdog, and periodic replica refresh.
- Shared-room registration, recent-history responses, local broadcast, duplicate-ID tracking, and cyclic PID-successor peer forwarding.
- File-backed history with byte-offset metadata, SHA-256 duplicate hashes, timestamp indexing, and merge/rebuild helpers.
- Concurrent terminal workers, pending-send display, reconnect/requeue paths, resource coordination, packaging/container configuration, manual harnesses, and technical documentation.

# Architecture / Technical Design

Four root-included Gradle modules are common, addressingserver, chatserver, and client; three supply process entrypoints. The separately configured tests module is excluded from root settings.

Primary-oriented addressing registries hold advertised addresses/ports, status, and capacity. Discovery selects the first active non-full record and increments its count before the client connects. Tracked registrations maintain pending recipients and callbacks; ACKs remove recipients. Some count/refresh broadcasts are untracked. Replicas nominally request chat records every twenty seconds and both registries every sixth cycle.

Chat servers combine selector event loops with **eight message workers**. Read accumulators reconstruct newline frames; synchronized output queues cooperate with OP_WRITE. Messages are appended, locally broadcast including to the sender, and forwarded to **one successor peer** from cyclic sorted PIDs with a ten-second target cache. The sender treats its echo as acknowledgment; recipient delivery is not separately acknowledged.

Clients use **four workers**, concurrent queues, synchronized lists/sets, a message lock, and a four-count shutdown latch. Custom rendering integrates JLine editing with timestamps, connection/pending status, and a 100-entry visible history window. That window does not bound retained history/queues.

# Technical Depth

Per-server append-only JSON-line logs have a separate JSON index containing UUID, byte offset, wall-clock timestamp, and full-message SHA-256 hash. Maps, sets, and a timestamp TreeMap separate physical append order from history selection. Every append rewrites the index. Merge uses append/deduplication; rebuild exists but is not automatically called at startup. Hashing covers serialized messages rather than content text alone.

Bully election challenges higher PIDs, waits five seconds for a Bully reply and twelve seconds for a leader announcement, and can promote/announce/reinitialize processes. EOF cleanup, peer heartbeats, failure broadcasts, and replica refresh are implemented mechanisms, not consensus or partition-safety guarantees.

Build files define dependency-expanded application JARs and manifests. Multistage images use JDK 21; active Compose declares three services and a bridge network. Replica, healthcheck, and chat-log volume blocks are commented out. Configured topology is not verified deployment or external durability across container removal.

# Scale / Metrics

- Three process types, four included modules, eight chat workers, and four client workers are structural counts.
- Chat servers advertise **ten clients** as capacity; accept/registration does not enforce that as a hard socket limit.
- Live forwarding selects one peer; initial history requests ten messages; terminal rendering shows up to 100 entries.
- No corroborated stress-test topology, measured throughput/latency, recovery duration, or production workload is established by the analysis.

# Testing / Validation

No active JUnit @Test methods were found. Thirteen commented JUnit/Mockito designs, five manual NIO harness methods, and an interactive reflective runner preserve test intent/diagnostics. The excluded test module has stale APIs/assumptions; one harness calls a nonexistent current wrapper method. These are not passing automated coverage.

The investigation ran no build, application, container, or tests. Existing build artifacts do not establish current-source success. Documentation discusses failures/demonstrations; the final paper explicitly acknowledges incomplete primary discovery.

# Reliability / Failure Handling

Chat partial writes remain queued; selected EOF paths trigger cleanup/reconnect; thrown send errors can requeue messages; watchdogs retry missing replica ACKs; peer PING/PONG updates liveness state. Client reconnect uses fixed five-second delays despite exponential-backoff comments. Material limits:

- Full-log responses read an uninitialized shared path field while ordinary append/history uses an initialized ChatLog. Successful full-log recovery is not established.
- Chat servers do not correctly adopt elected-primary addresses; clients use one configured addressing host. Election alone does not provide complete failover.
- No ACK-timeout retransmission sweep exists. Unchecked PrintWriter errors and initial-history buffering can lose messages; reconnect is not lossless recovery.
- Concurrent duplicate checks and append/index operations are not fully serialized. Log/index writes lack journal, fsync protocol, and atomic replacement; rebuild uses a different hash representation.
- Replica ACKs precede state application; not every update is tracked; retry exhaustion removes recipients and invokes completion. Formal consistency/durable commit is unproven.
- Addressing timeout action is inactive; heartbeat cleanup bypasses some notifications; fragmented initial handshakes can be mistaken for closed connections. Addressing writes lack chat-style queued partial-write handling and can busy-spin.

# Limitations / Attribution Boundaries

- No implemented vector-clock ordering: history uses wall-clock timestamps and live display follows receipt order. Exactly-once delivery, causal ordering, lossless recovery, convergence, and partition-safe leadership are unverified.
- Registration is not authenticated identity. Session helpers are unintegrated; sockets/plaintext files provide no implemented TLS or end-to-end encryption. Private messaging, multiple rooms, and moderation are not delivered features.
- Java supplies networking/concurrency/hash primitives; Jackson/org.json serialization, JLine editing, Gradle machinery, and container images are third-party facilities. Custom work is protocol, state, handlers, persistence/index logic, integration, and configuration.
- No production users, cloud/DNS integration, deployed scale, or measured outcome is established. Full-log transfer is not streamed/checkpointed, and queues/frames/history lack comprehensive bounds.

# Notes

January–April 2025 dates derive from the owner-supplied resume seed on 2026-10-07, not a timeline verified by the analysis. The seed title was “Distributed Fault-Tolerant Chat System.” Its vector-timestamp and “seamless recovery” wording exceeds analyzed implementation; registry ACK tracking and chat echoes are separate mechanisms. The seed reports Docker stress testing with **50 clients and 15 servers**. Preserve that only as an uncorroborated historical assertion: the analysis establishes neither execution/results for that topology nor a capacity claim. Do not substitute configuration counts for that test claim.

Evidence sections: Contributions; Architecture; Database / Data Engineering; Reliability / Failure Handling; Testing / Quality; Deployment / Infrastructure; Uncertain / Not Verifiable. Internal paths refer to the investigated workspace.
