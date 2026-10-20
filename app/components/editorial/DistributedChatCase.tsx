import Link from 'next/link';
import type { Project } from '@/data/projects';
import ChatArchitecture from './ChatArchitecture';

const sections = [
  ['architecture', 'System architecture'],
  ['networking', 'Custom TCP networking'],
  ['coordination', 'Discovery and registry replication'],
  ['messages', 'Message propagation and history'],
  ['recovery', 'Failure detection and recovery'],
  ['technologies', 'Tools & Technologies'],
] as const;

export default function DistributedChatCase({ project, previous, next }: {
  project: Project;
  previous: Project | null;
  next: Project | null;
}) {
  return <main id="main-content" tabIndex={-1} className="v3-wrap chat-case">
    <header className="case-heading">
      <Link className="text-link" href="/projects"><span aria-hidden="true">←</span> All projects</Link>
      <p className="case-category">IRC-HAT / Distributed systems</p>
      <h1>{project.title}</h1>
      <p className="case-summary">I built a distributed chat system in Java with custom TCP protocols, gossip-based message replication, and a replicated addressing service for discovery and coordination.</p>
    </header>

    <section id="architecture" className="chat-architecture-section" aria-labelledby="architecture-title">
      <div className="chat-section-intro">
        <h2 id="architecture-title">System architecture</h2>
        <p>Clients connect to a chat server and exchange messages through a network of peers. A primary addressing server and its replicas track membership and available capacity. Discovery and registry updates use a separate control protocol from chat traffic.</p>
      </div>
      <ChatArchitecture/>
    </section>

    <div className="case-layout">
      <aside className="case-toc">
        <p>Engineering decisions</p>
        <nav aria-label="Distributed Chat System sections">{sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      </aside>
      <div className="case-body chat-case-body">
        <section id="networking" className="case-section">
          <h2>Custom TCP networking</h2>
          <p>I implemented the application protocols and connection lifecycle across the client, chat server, and addressing server, with shared message types in a common Gradle module. Typed JSON envelopes distinguish chat messages from registry updates, acknowledgments, and election messages.</p>
          <p>Java NIO selectors multiplex server connections. Per-connection buffers assemble newline-delimited messages from TCP reads; chat output queues retain partially written buffers until the socket is ready again. The chat server dispatches framed messages to chat, peer, or addressing handlers through a fixed pool of eight workers.</p>
          <p>The terminal client runs input, sending, receiving, and rendering on separate workers. Queues coordinate outgoing messages and pending-send state while JLine handles terminal input.</p>
        </section>

        <section id="coordination" className="case-section">
          <h2>Discovery and registry replication</h2>
          <p>The addressing primary tracks server addresses, status, and client counts. Discovery selects the first active server with advertised capacity and returns its address. The client then opens a persistent TCP connection to that chat server and registers its username. New chat servers register separately, receive a network process ID and peer records, and connect to discovered peers.</p>
          <p>I implemented passive registry replication with correlated update and acknowledgment messages. For tracked registrations, a pending event records the replicas still expected to reply and defers the registration response. A watchdog resends the update to those recipients; retry exhaustion removes unresponsive recipients so registration can proceed. Client-count updates and periodic record refreshes use separate, untracked update paths.</p>
          <p>This concentrates membership changes in the primary and adds synchronization work during registration. Live chat propagation runs independently between peers, so each message avoids that registry coordination path.</p>
        </section>

        <section id="messages" className="case-section">
          <h2>Message propagation and history</h2>
          <p>A chat server logs an incoming message, broadcasts it to its local clients, and forwards it to selected peers. The sender receives that same message as an echo and clears its pending-send state. Receiving peers repeat the log, broadcast, and forwarding path, checking a seen-message-ID set for repeats.</p>
          <p>Gossip has a configurable fan-out: each server selects up to n connected peers, excluding itself. Selection starts after its own process ID in sorted order and wraps around as needed. Each receiving server applies the same rule. A larger fan-out creates more propagation paths at the cost of additional traffic and duplicate copies; smaller values spread messages through more hops. Live propagation runs asynchronously.</p>
          <p>I built append-only JSON-line storage with UUID-keyed metadata, byte offsets, and a timestamp index. History retrieval selects recent IDs from that index, then reads their recorded offsets. Storage and log-merge handlers suppress repeated serialized messages using SHA-256 hashes. Rewriting the JSON metadata index on each append keeps the file format simple but adds write work as history grows.</p>
        </section>

        <section id="recovery" className="case-section">
          <h2>Failure detection and recovery</h2>
          <p>Chat peers probe idle connections with PING/PONG and remove peers that remain unresponsive. On a closed chat connection, the client queries addressing again and re-registers with the returned host. Initial registration also requests recent history. Outgoing queues retain unsent work, and thrown send errors requeue the affected message.</p>
          <p>Joining and returning servers request peer logs to recover message history. I implemented the full-log request/response messages and a merge handler that appends records through the storage duplicate check. Addressing replicas synchronize separately by requesting server records from the primary.</p>
          <p>Bully election runs among addressing processes after a failed primary is removed. A candidate contacts higher PIDs; a higher process replies and starts its own election. The lower candidate waits for a leader announcement and restarts if none arrives. A candidate with no higher known PID, or no higher reply before timeout, announces itself as primary.</p>
          <p>The new primary’s connection details are distributed so clients and chat servers can discover it and reconnect. Addressing replicas re-register with the new leader and reload membership records, restoring registry coordination under the elected primary.</p>
        </section>

        <section id="technologies" className="case-section">
          <h2>Tools &amp; Technologies</h2>
          <ul className="technology-list" aria-label="Tools and technologies">{project.techStack.map(technology => <li key={technology}>{technology}</li>)}</ul>
          <p className="chat-tools-copy">I built connection state, message framing, dispatch, and queued chat writes around Java NIO channels and selectors. Jackson serializes typed wire messages; org.json supports the storage index and peer-record adaptation. JLine provides terminal editing alongside the client’s custom input, send, receive, and rendering workers.</p>
          <p>Gradle organizes the client, chat server, addressing server, and shared protocol modules. Multistage Docker builds compile the application JARs inside a Java 21 build environment and copy them into Java 21 runtime images. Building inside containers kept JDK and dependency setup consistent across developer machines.</p>
          <p>Docker Compose profiles run the process types individually or together on a shared bridge network. Environment variables supply advertised addresses and listener ports, while host port mappings let multiple services run locally without competing for the same port. This made the multi-process setup repeatable during development.</p>
        </section>
      </div>
    </div>

    <nav className="case-pagination" aria-label="Adjacent projects">
      {previous ? <Link href={`/projects/${previous.slug}`}><span>← Previous project</span>{previous.title}</Link> : <Link href="/projects"><span>← The collection</span>All projects</Link>}
      {next ? <Link href={`/projects/${next.slug}`}><span>Next project →</span>{next.title}</Link> : <Link href="/projects"><span>The collection →</span>All projects</Link>}
    </nav>
  </main>;
}
