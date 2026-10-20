# IRC-HAT content refinement

> Follow-up: [targeted correction record](IRC-HAT-TARGETED-REFINEMENT.md) supersedes the earlier one-peer presentation and the recommendation to describe elected-primary discovery as unfinished. The owner confirms completed recovery; the follow-up records the conflicting retained artifacts explicitly.


This records the initial refinement. The subsequent [technical audit and claim ledger](IRC-HAT-TECHNICAL-AUDIT.md) corrects lifecycle and diagram details and adds the fourth Failure & election mode. Current validation is in [the audit review](../output/playwright/irc-hat-audit/REPORT.md).

Implemented October 19, 2026. The primary public name is **Distributed Chat System**; IRC-HAT remains the secondary identifier. The existing URL is retained.

## Reference basis

The final report, `CPSC 559 Team 16 Final Report.pdf`, is the primary reference for the completed architecture and design rationale. Its 22 pages were read directly for this refinement. Relevant physical PDF pages are 10–11 (registration), 12–13 (communication), 14–15 (synchronization and replication), 16–17 (consistency), 17–20 (failure handling), and 20–21 (discovery challenges and future work).

The supplied presentation exports inform the redrawn architecture: Page 5 (server registration), Page 3 (join-time log requests), Page 3.1 (peer message propagation), Page 7 (peer failure/rejoin), and Page 8 (client retry). The extensionless `559 progress/untitled folder/diagrams/NIO` artifact is an ASCII text diagram of selector readiness, worker dispatch, queued responses, and OP_WRITE. It is a regular file, correcting the earlier planning response that described it as an empty folder.

Implementation details are supported by [the existing source investigation](professional-reference/evidence/distributed-chat-system/PROJECT_ANALYSIS.md). The Snap Remedy case study and homepage feature supplied the writing and hierarchy reference. Original professional reference records and project sources are unchanged.

## Public presentation

The homepage, Projects listing, project title, search description, and Open Graph metadata now identify the distributed system. The case study has sections for custom TCP networking, discovery/registry replication, message propagation/history, recovery, and Tools & Technologies. Ownership is stated in the opening and engineering explanations. Tradeoffs appear with the mechanism they concern.

The shared architecture has three selectable views: discovery, messages, and coordination. All placements use the same actors and protocol paths. The homepage and listing have compact explanations; the case study adds protocol steps, join/synchronization context, and the addressing election sequence. Mobile uses a separate geometry for the same topology instead of shrinking desktop text. No continuously running animation or new dependencies are required.

## Material factual questions for owner review

These are concrete differences between the final report and the later inspected source snapshot. A static investigation's lack of execution is not itself a contradiction, and does not invalidate the report's qualitative account of the application.

| Topic | Final report | Inspected source record | Publication decision / follow-up |
| --- | --- | --- | --- |
| Message ordering | Pages 13–16 describe vector timestamps, partial ordering, and eventual P-RAM consistency. | `ClientServerMessage`/`ChatLog` use wall-clock timestamps and receipt order; no vector-clock mechanism is identified. | Describe asynchronous propagation, unique IDs, and timestamp-indexed retrieval. Resolve which revision, if any, implemented the report's vector ordering before publishing that guarantee. |
| Registry completion | Pages 15–17 describe every update as acknowledged and applied in a common order before completion. | `ReplicaSyncCoordinator` ACKs before applying changes; count/refresh paths are untracked, and retry exhaustion can remove pending recipients. | Describe correlated ACKs, deferred registration responses, retries, and refresh. Do not equate receipt tracking with a durable or sequentially consistent commit. |
| Full-log recovery | Pages 13–14 and 18 describe pulling and merging peer logs on joins/recovery. | Full-log request/response and merge handlers exist, but the response reads an uninitialized shared `CHATLOG_FILE` field. Ordinary append/recent-history uses the initialized `ChatLog`. | Present the recovery protocol and handlers; avoid a demonstrated lossless/full-log recovery claim. Ask whether the final demonstration used a revision with the path connected correctly. |
| Addressing failure detection | Page 19 describes adaptive timeout failure action. | The inspected `PingManager` computes estimates but its timeout action is commented out. Chat peer PING/PONG is a distinct implemented path. | Show chat peer heartbeats and the addressing election algorithm, without depicting a verified adaptive addressing-timeout pipeline. |
| Client resends | Page 17 and supplied Page 8 describe resending pending messages after reconnection. | Pending-send display, EOF reconnection, and send-exception requeue exist; no ACK-timeout resend sweep is identified. | Describe queues and send-error retry paths. Avoid claiming every unacknowledged message is automatically recovered. |

Primary discovery has an additional conflict *within the report*: page 17 describes backup addresses and takeover, while the final challenges discussion on page 20 explicitly states that discovering a newly elected primary remains unfinished. The case study retains that precise scope statement in the election discussion. The visual never reroutes a client automatically to an elected addressing primary.

The report's PID-selected peer subset is compatible with the inspected one-successor setting; it is not treated as a contradiction. The diagram shows that concrete forwarding pattern. No throughput, latency, recovery-duration, or stress-topology numbers were introduced: the final report does not provide measured benchmark results. The earlier resume-seed assertion of 50 clients / 15 servers is not substituted for report evidence.

## Verification

See [the browser review](../output/playwright/irc-hat/REPORT.md) for viewport, interaction, accessibility, and build results. Verification exercises this portfolio, not the original Java distributed application.
