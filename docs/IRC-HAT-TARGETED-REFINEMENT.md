# Distributed Chat System: targeted correction record

## Scope

Preserve the existing sections, visual design, and four architecture modes. Update gossip fan-out, completed elected-primary recovery, containerization roles, and prose. Use the actual Snap Remedy case study and humanizer guidance as writing references.

## Evidence and conclusions

### Configurable gossip

The final report, physical PDF page 15, §5.1, describes a peer subset based on the server PID and a programmer-chosen number. In the original `CPSC559-Group` source, `ClientHandler.gossipToClosestPeers(msg, int n)` (410–439) queues the message to each selected connected peer. `getValidatedClosestPeers(int n)` (484–520) sorts connected PIDs plus self, starts after self, wraps cyclically, and excludes self. Its upper bound is the number of connected *other* servers, N−1 in a fully connected N-server network. Selection is deterministic by PID, not random or based on network distance.

The retained `handle` call at line 262 supplies 1. That is a particular call-site setting, not the algorithm's supported fan-out. Public descriptions now explain configurable n and the traffic/propagation-path tradeoff. The Messages diagram switches between one and two selected peers in a three-server illustration. It highlights all of origin A's targets plus selected onward hops, rather than claiming to show every peer's transmission. The UI illustrates configuration; it does not claim a live application setting or configuration API existed.

### Completed elected-primary recovery: material source conflict

The project owner explicitly confirms in the current request that newly elected primary discovery and reconnection were completed in the final project. Public copy and the final election stage now reflect that completed outcome. No DNS, virtual IP, service migration, lossless recovery, or specific undisclosed discovery protocol is invented.

The retained records materially disagree:

- Final report page 13, §3.4, describes distributing a new leader's connection information to chat servers.
- Page 17 describes preconfigured primary/backup client addresses and switching to a backup.
- Page 20, §8.2, explicitly says dynamic discovery of the elected primary was unfinished and restricted recovery.
- `LeaderElectionManager.setNewLeader` (371–410) updates addressing leadership, broadcasts the new primary record to chat servers, and restarts replica registration.
- The retained chat-server `AddressingServerHandler` dispatch checks `AdressServerRecord` at line 110, while the actual DTO is `AddrServerRecord`; `handleUpdateAddr` (168–185) logs host/port without adopting them. The retained client uses one configured addressing host in `ConnectionManager.registerWithAddressingServer` (235–243).

The owner clarification supersedes the earlier public “unfinished” statement. The exact final discovery implementation/revision is not reconciled by these retained artifacts. This is an artifact/version conflict, not an inference from lack of runtime tests. Earlier audit notes remain historical and are marked superseded on this point.

### Docker and Compose

The final report page 20 identifies connecting containers and choosing network modes as technical challenges. Original `Docker-help.md`, the three Dockerfiles, and `docker-compose.yml` explain the implementation:

- Gradle 8/JDK 21 builder stages compile application JARs inside containers; Eclipse Temurin 21 JDK runtime stages receive the built JARs. The Docker guide explicitly motivates consistent build dependencies across developer machines.
- Compose profiles select client, chat-server, and addressing-server services. They share a configured bridge network; environment variables supply addresses and ports, and host mappings expose distinct listeners.
- The client has interactive TTY/stdin settings. Replica deployment, health checks, and chat-log volume examples are commented out in the retained Compose file.

The case study now explains repeatable builds and multi-process network configuration. It does not claim production deployment, automatic replica scaling, or durable container volumes.

### Writing and labels

Reviewed homepage, listing/metadata data, case-study paragraphs, and all four diagram modes. Removed the single-successor framing and unfinished-recovery statement. Simplified chat nodes to “Chat server A/B/C” (two lines on narrow maps); retained visible PIDs only where needed to explain Bully priority. Kept the established section structure and Tools & Technologies. Existing message-echo, indexed-storage, ACK-scope, and separate control/data-path explanations remain.

## Validation

See `output/playwright/irc-hat-focused/` for the browser review script, results, and desktop/mobile screenshots. Checks include all four modes, both fan-out settings, all three election stages, native keyboard interaction, SVG connection endpoints, text clipping, responsive overflow, and accessibility.


Results: `npm run typecheck`, `npm run lint`, `NEXT_DIST_DIR=.next-production npm run build`, and `git diff --check` passed. Production build generated all 26 pages. Its only warnings concerned the existing outdated Browserslist dataset; dependencies were not changed. TypeScript also passed again after build completion.

Playwright passed 105 diagram states across three routes at widths 320, 390, 820, 1024, and 1440. Verified both fan-out values, all election steps, selected controls, arrow endpoints/directions, node roles, server labels, text bounds, keyboard activation, reduced motion, SSR, project filtering/navigation, metadata, and anchor targets. No browser errors or horizontal overflow. Desktop/mobile axe checks reported zero WCAG A/AA violations. Screenshots were also visually inspected for message fan-out, recovery, coordination, homepage, and listing layouts.

The existing development server at `http://127.0.0.1:3002` was reused and left running. No commits, pushes, merges, or deployments were performed.
