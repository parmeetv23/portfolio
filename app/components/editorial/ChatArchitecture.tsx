'use client';

import { useId, useState } from 'react';

const flows = [
  {
    id: 'discovery', label: 'Discovery', title: 'Find a host, then register with it',
    summary: 'The primary returns the first active chat server with advertised capacity. The client opens a direct TCP connection and registers its username there.',
    detail: 'The lookup returns a server PID, host, and port. Chat servers register separately to receive their own process IDs and peer records; addressing stays outside chat-message transmission.',
    route: ['Lookup at the primary', 'Return host address', 'Direct chat connection + registration'],
    description: 'Client 1 queries the addressing primary and receives a chat-server PID, host, and port. It then opens a bidirectional TCP connection to chat server A and registers its username. Addressing replicas are not part of this lookup path.',
    caption: 'Client discovery shown. Dashed arrows carry lookup and address reply; the solid connection carries chat registration and messages.',
  },
  {
    id: 'messages', label: 'Messages', title: 'Broadcast locally, then propagate',
    summary: 'The server logs a new message, broadcasts it to local clients including its sender, and forwards it to a configurable number of peers. Seen IDs identify repeat copies.',
    detail: 'Each server selects up to n connected peers after its own PID in sorted order, wrapping at the end. Receiving servers repeat the same rule; seen message IDs suppress repeat processing. Increasing fan-out adds propagation paths and network traffic.',
    route: ['Client sends', 'Local log + broadcast / sender echo', 'Selected peers repeat propagation'],
    description: 'Client 1 sends to chat server A, which logs the message and echoes it in local broadcast. A selects the next n available peers in cyclic PID order, excluding itself. With fan-out two, A sends directly to B and C. Receiving servers repeat the selection rule. Selected onward paths illustrate propagation and duplicate suppression; C delivers to its local client.',
    caption: 'Fan-out is configurable up to all available peers. The highlighted paths show server A’s targets and selected onward hops, not every transmission. The sender’s echo confirms local server receipt.',
  },
  {
    id: 'coordination', label: 'Coordination', title: 'Track registration replies by event ID',
    summary: 'For a tracked registration, the primary sends update m to replicas and correlates their ACKs with that event. A separate replica request refreshes registry records.',
    detail: 'The pending event tracks remaining recipients. Retries resend the same update; nonresponders are removed after retry exhaustion so registration can proceed. Count updates and refresh responses use untracked paths.',
    route: ['Register a server', 'Update replicas / correlate ACKs', 'Reply after tracking completes'],
    description: 'A joining chat server registers with the primary. The primary sends a tracked update with event ID m to addressing replicas, which return ACKs correlated with m. The registration reply returns an assigned PID and is followed by peer records. Separately, replicas request registry records from the primary. ACK tracking is specific to selected events, not every count update or refresh response.',
    caption: 'Tracked registration and separate refresh request. ACKs track receipt; refresh returns individual records rather than an atomic snapshot.',
  },
  {
    id: 'failure', label: 'Failure & election', title: 'Elect a new addressing primary',
    summary: 'Addressing replicas run Bully election when the failed primary is removed. Higher process IDs take priority; replicas refresh their records and other processes reconnect to the new primary.',
    detail: 'Chat-server liveness is separate: idle peers receive PING, PONG clears the waiting state, and peers that remain unresponsive are removed from forwarding choices.',
    route: ['Remove failed primary', 'Challenge higher PIDs / receive Bully reply', 'Announce leader / reconnect and synchronize'],
    description: 'Addressing primary failure, higher-PID election challenges, Bully reply, leader announcement and addressing replica re-registration.',
    caption: 'Illustrated PIDs determine election priority. The new primary is announced, replicas synchronize, and clients and chat servers reconnect. Chat-peer heartbeats run separately.',
  },
] as const;

const electionStages = [
  {
    id: 'lost', label: '1. Primary lost', title: 'Remove the failed primary',
    summary: 'The primary control connection is lost. Removing its registry record triggers election among the remaining addressing processes.',
    description: 'Addressing primary PID 1 is unavailable. Its control connection is lost and its record is removed. Addressing replicas with PIDs 2 and 3 remain; no leader has been selected.',
  },
  {
    id: 'election', label: '2. Election', title: 'Challenge the higher PID',
    summary: 'PID 2 challenges PID 3. PID 3 returns a Bully reply and starts its own election; PID 2 waits for a leader announcement.',
    description: 'Primary PID 1 is unavailable. Replica PID 2 sends Election to higher PID 3; PID 3 returns Bully and initiates its own election. PID 2 waits. In this example PID 3 has no higher known process to challenge.',
  },
  {
    id: 'leader', label: '3. New primary', title: 'Announce leadership and reconnect',
    summary: 'With no higher known PID, process 3 becomes primary and announces its address. Replicas re-register and receive records; clients and chat servers discover the new primary and reconnect.',
    description: 'Process PID 3 changes from replica to primary and sends a Leader announcement to PID 2. PID 2 re-registers and receives records. Clients and chat servers discover the elected primary’s address and reconnect to it. The old primary remains unavailable.',
  },
] as const;

type FlowId = typeof flows[number]['id'];
type ElectionStage = typeof electionStages[number];

function ArrowDefinitions({ id }: { id: string }) {
  return <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="context-stroke" strokeWidth="1.5"/></marker></defs>;
}

function ArchitectureMap({ flow, mobile, id, fanout }: { flow: typeof flows[number]; mobile: boolean; id: string; fanout: number }) {
  const messages = flow.id === 'messages';
  const discovery = flow.id === 'discovery';
  const coordination = flow.id === 'coordination';
  const primary = mobile ? { x: 20, y: 50, w: 118, h: 68 } : { x: 180, y: 50, w: 150, h: 76 };
  const replicas = mobile ? { x: 190, y: 50, w: 112, h: 68 } : { x: 470, y: 50, w: 150, h: 76 };
  const chats = mobile ? [18, 120, 222].map(x => ({ x, y: 254, w: 80, h: 74 })) : [75, 275, 475].map(x => ({ x, y: 246, w: 130, h: 80 }));
  const clients = mobile ? [18, 222].map(x => ({ x, y: 415, w: 80, h: 44 })) : [75, 475].map(x => ({ x, y: 376, w: 130, h: 46 }));
  const arrow = `url(#${id}-arrow)`;
  const edgeClass = (active: boolean, kind = '') => `chat-edge${active ? ' is-active' : ''}${kind ? ` chat-edge-${kind}` : ''}`;

  return <svg className={`chat-map chat-map-${mobile ? 'mobile' : 'desktop'}`} viewBox={mobile ? '0 0 320 478' : '0 0 680 442'} role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>{`${flow.label}: Distributed Chat System`}</title>
    <desc id={`${id}-description`}>{flow.description}{messages ? ` Illustrated fan-out: ${fanout}; server A forwards directly to ${fanout === 1 ? 'B' : 'B and C'}.` : ''}</desc>
    <ArrowDefinitions id={id}/>
    <text className="chat-map-label" x={mobile ? 20 : 24} y="25">{coordination ? 'Tracked registration' : 'Discovery & coordination'}</text>
    <path className="chat-plane-rule" d={mobile ? coordination ? 'M20 216H302' : 'M20 188H302' : 'M24 180H656'}/>
    <text className="chat-map-label" x={mobile ? 20 : 24} y={mobile ? coordination ? 240 : 220 : 211}>{coordination ? 'Chat-server membership' : 'Chat servers'}</text>

    <g className={edgeClass(discovery, 'control')} data-path="discovery" markerEnd={arrow}>
      <path data-message="lookup" d={mobile ? 'M30 415H4V144H48V118' : 'M92 376H4V151H210V126'}/>
      <path data-message="host-reply" d={mobile ? 'M110 118V172H12V437H18' : 'M294 126V171H16V399H75'}/>
    </g>
    {discovery && <g className="chat-edge-label">
      <text x={mobile ? 70 : 144} y={mobile ? 137 : 145}>Lookup</text>
      <text x={mobile ? 54 : 80} y="165">Server address</text>
    </g>}

    <path className={edgeClass(coordination, 'control')} data-path="registry-update" data-event="m" markerEnd={arrow} d={mobile ? 'M138 70H190' : 'M330 74H470'}/>
    <path className={edgeClass(coordination, 'control')} data-path="registry-ack" data-event="m" markerEnd={arrow} d={mobile ? 'M190 100H138' : 'M470 105H330'}/>
    <path className={edgeClass(coordination, 'control')} data-path="registry-refresh" markerEnd={arrow} d={mobile ? 'M246 118V164H110V118' : 'M545 50V35H255V50'}/>
    <path className={edgeClass(coordination, 'control')} data-path="server-registration" markerStart={arrow} markerEnd={arrow} d={mobile ? 'M262 254V186H79V118' : 'M540 246V166H255V126'}/>
    {coordination && <g className="chat-edge-label">
      <text x={mobile ? 164 : 400} y={mobile ? 63 : 60} textAnchor="middle">{mobile ? 'ID m' : 'Update m'}</text>
      <text x={mobile ? 164 : 400} y={mobile ? 131 : 128} textAnchor="middle">{mobile ? 'ACK' : 'ACK m'}</text>
      <text x={mobile ? 180 : 400} y={mobile ? 154 : 27} textAnchor="middle">{mobile ? 'Refresh' : 'Refresh request'}</text>
      <text x={mobile ? 160 : 413} y={mobile ? 205 : 158} textAnchor="middle">Register / reply</text>
    </g>}

    {discovery && <path className="chat-edge is-active" data-path="client-chat" markerStart={arrow} markerEnd={arrow} d={mobile ? 'M58 415V328' : 'M140 376V326'}/>}
    <path className={edgeClass(messages)} data-path="chat-send" markerEnd={arrow} d={mobile ? 'M46 415V328' : 'M126 376V326'}/>
    <path className={edgeClass(messages)} data-path="chat-echo" markerEnd={arrow} d={mobile ? 'M70 328V415' : 'M154 326V376'}/>
    <g className={edgeClass(messages)} data-path="chat-forward" markerEnd={arrow}>
      <path d={mobile ? 'M98 278H120' : 'M205 274H275'}/>
      <path d={mobile ? 'M200 278H222' : 'M405 274H475'}/>
      <path d={mobile ? 'M262 328V362H58V328' : 'M540 326V343H140V326'}/>
      <path d={mobile ? 'M262 328V415' : 'M540 326V376'}/>
    </g>
    {messages && fanout === 2 && <path className="chat-edge is-active" data-path="origin-second-peer" markerEnd={arrow} d={mobile ? 'M58 254V238H262V254' : 'M140 246V228H540V246'}/>}
    {discovery && <text className="chat-edge-label" x={mobile ? 78 : 158} y={mobile ? 391 : 356}>Direct TCP</text>}
    {messages && <g className="chat-edge-label">
      <text x={mobile ? 160 : 340} y={mobile ? 387 : 373} textAnchor="middle">Seen ID → stop repeat</text>
      <text x={mobile ? 87 : 171} y={mobile ? 407 : 357}>Send / echo</text>
      <text x={mobile ? 233 : 553} y={mobile ? 407 : 357}>Deliver</text>
    </g>}

    {[{ ...primary, label: 'Primary', sub: 'addressing server' }, { ...replicas, label: 'Addressing', sub: 'replicas' }].map(node => <g key={node.label} className={`chat-node chat-control-node${coordination || discovery && node.label === 'Primary' ? ' is-active' : ''}`}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="2"/>
      <text x={node.x + node.w / 2} y={node.y + (mobile && node.label === 'Primary' ? 22 : 29)} textAnchor="middle">{node.label}</text>
      <text className="chat-node-sub" x={node.x + node.w / 2} y={node.y + (mobile && node.label === 'Primary' ? 43 : 50)} textAnchor="middle">{mobile && node.label === 'Primary' ? 'addressing' : node.sub}</text>
      {mobile && node.label === 'Primary' && <text className="chat-node-sub" x={node.x + node.w / 2} y={node.y + 60} textAnchor="middle">server</text>}
    </g>)}
    {chats.map((node, i) => <g key={node.x} className={`chat-node chat-peer-node${messages || discovery && i === 0 || coordination && i === 2 ? ' is-active' : ''}`} data-pid={coordination && i === 2 ? 'pending' : 10 + i * 10}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="2"/>
      <text x={node.x + node.w / 2} y={node.y + 30} textAnchor="middle">{mobile ? 'Chat' : 'Chat server'}</text>
      <text className="chat-node-sub" x={node.x + node.w / 2} y={node.y + 53} textAnchor="middle">{`${mobile ? 'server ' : ''}${String.fromCharCode(65 + i)}${coordination && i === 2 && !mobile ? ' / joining' : ''}`}</text>
    </g>)}
    {clients.map((node, i) => <g key={node.x} className={`chat-node chat-client-node${messages || discovery && i === 0 ? ' is-active' : ''}`}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="22"/>
      <text x={node.x + node.w / 2} y={node.y + 28} textAnchor="middle">{`Client ${i + 1}`}</text>
    </g>)}
  </svg>;
}

function ElectionMap({ stage, mobile, id }: { stage: ElectionStage; mobile: boolean; id: string }) {
  const primary = mobile ? { x: 100, y: 50, w: 120, h: 68 } : { x: 260, y: 50, w: 160, h: 76 };
  const lower = mobile ? { x: 16, y: 254, w: 120, h: 74 } : { x: 70, y: 246, w: 160, h: 80 };
  const higher = mobile ? { x: 184, y: 254, w: 120, h: 74 } : { x: 450, y: 246, w: 160, h: 80 };
  const arrow = `url(#${id}-arrow)`;
  const leader = stage.id === 'leader';
  return <svg className={`chat-map chat-map-${mobile ? 'mobile' : 'desktop'}`} data-election-stage={stage.id} viewBox={mobile ? '0 0 320 478' : '0 0 680 462'} role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>{`Addressing failure and election: ${stage.title}`}</title>
    <desc id={`${id}-description`}>{stage.description}</desc>
    <ArrowDefinitions id={id}/>
    <text className="chat-map-label" x={mobile ? 20 : 24} y="25">Addressing processes</text>
    {stage.id === 'lost' && <g className="chat-edge chat-edge-control chat-failed-link" data-path="primary-lost">
      <path d={mobile ? 'M160 118V180H76V254M160 180H244V254' : 'M340 126V170H150V246M340 170H530V246'}/>
    </g>}
    <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 157 : 156} textAnchor="middle">{stage.id === 'lost' ? 'Control connection lost' : 'Failed primary removed'}</text>
    {stage.id === 'election' && <>
      <path className="chat-edge is-active" data-path="election-challenge" data-from="2" data-to="3" markerEnd={arrow} d={mobile ? 'M136 278H184' : 'M230 274H450'}/>
      <path className="chat-edge chat-edge-control is-active" data-path="bully-reply" data-from="3" data-to="2" markerEnd={arrow} d={mobile ? 'M184 306H136' : 'M450 306H230'}/>
      <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 239 : 255} textAnchor="middle">Election →</text>
      <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 354 : 335} textAnchor="middle">← Bully reply</text>
    </>}
    {leader && <>
      <path className="chat-edge is-active" data-path="leader-announcement" data-from="3" data-to="2" markerEnd={arrow} d={mobile ? 'M244 254V193H76V254' : 'M530 246V196H150V246'}/>
      <path className="chat-edge chat-edge-control is-active" data-path="replica-register" data-from="2" data-to="3" markerEnd={arrow} d={mobile ? 'M136 278H184' : 'M230 274H450'}/>
      <path className="chat-edge chat-edge-control is-active" data-path="replica-records" data-from="3" data-to="2" markerEnd={arrow} d={mobile ? 'M184 306H136' : 'M450 306H230'}/>
      <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 184 : 184} textAnchor="middle">Leader announcement</text>
      <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 239 : 255} textAnchor="middle">Register →</text>
      <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 354 : 335} textAnchor="middle">← Records</text>
    </>}
    <g className="chat-node chat-control-node chat-failed-node" data-pid="1" data-role="unavailable">
      <rect x={primary.x} y={primary.y} width={primary.w} height={primary.h} rx="2"/>
      <text x={primary.x + primary.w / 2} y={primary.y + 27} textAnchor="middle">Primary</text>
      <text className="chat-node-sub" x={primary.x + primary.w / 2} y={primary.y + 51} textAnchor="middle">PID 1</text>
      <path className="chat-failure-mark" d={`M${primary.x + primary.w - 14} ${primary.y + 8}l8 8m-8 0 8-8`}/>
    </g>
    {[{ ...lower, pid: 2 }, { ...higher, pid: 3 }].map(node => <g key={node.pid} className={`chat-node chat-control-node is-active${leader && node.pid === 3 ? ' chat-leader-node' : ''}`} data-pid={node.pid} data-role={leader && node.pid === 3 ? 'primary' : 'replica'}>
      <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="2"/>
      <text x={node.x + node.w / 2} y={node.y + 27} textAnchor="middle">{leader && node.pid === 3 ? 'Primary' : 'Replica'}</text>
      <text className="chat-node-sub" x={node.x + node.w / 2} y={node.y + 53} textAnchor="middle">{`PID ${node.pid}`}</text>
    </g>)}
    {leader && <>
      <path className="chat-edge chat-edge-control is-active" data-path="reconnect-primary" markerEnd={arrow} d={mobile ? 'M160 398V373H290V328' : 'M340 384V361H578V326'}/>
      <g className="chat-node is-active" data-role="reconnecting-processes">
        <rect x={mobile ? 40 : 210} y={mobile ? 398 : 384} width={mobile ? 240 : 260} height="60" rx="2"/>
        <text x={mobile ? 160 : 340} y={mobile ? 423 : 409} textAnchor="middle">Clients &amp; chat servers</text>
        <text className="chat-node-sub" x={mobile ? 160 : 340} y={mobile ? 446 : 432} textAnchor="middle">Reconnect to new primary</text>
      </g>
    </>}
    {!leader && <text className="chat-edge-label" x={mobile ? 160 : 340} y={mobile ? 397 : 393} textAnchor="middle">{stage.id === 'lost' ? 'Remaining replicas begin election' : 'PID 2 waits; PID 3 starts election'}</text>}
    {!leader && <text className="chat-map-label" x={mobile ? 160 : 340} y={mobile ? 440 : 426} textAnchor="middle">{stage.id === 'lost' ? 'Chat-peer heartbeats are separate' : 'No higher known PID than 3 here'}</text>}
  </svg>;
}

export default function ChatArchitecture({ compact = false }: { compact?: boolean }) {
  const [fanout, setFanout] = useState(2);
  const [active, setActive] = useState<FlowId>('messages');
  const [stageId, setStageId] = useState<ElectionStage['id']>('election');
  const id = useId();
  const flow = flows.find(item => item.id === active)!;
  const stage = electionStages.find(item => item.id === stageId)!;
  return <figure className={`chat-architecture${compact ? ' chat-architecture-compact' : ''}`} aria-label="Distributed Chat System interactive architecture" data-flow={active} data-fanout={fanout}>
    <div className="chat-figure-heading"><p>Distributed Chat System</p><span>Explore the architecture</span></div>
    <div className="chat-flow-controls" role="group" aria-label="Architecture view">
      {flows.map(item => <button key={item.id} type="button" aria-pressed={active === item.id} aria-controls={`${id}-content`} onClick={() => setActive(item.id)}>{item.label}</button>)}
    </div>
    {active === 'messages' && <div className="chat-fanout-controls" role="group" aria-label="Gossip fan-out">
      <span>Peers per server</span>
      {[1, 2].map(count => <button key={count} type="button" aria-pressed={fanout === count} aria-controls={`${id}-content`} onClick={() => setFanout(count)}>{count}</button>)}
      <span>Two available in this example</span>
    </div>}
    {active === 'failure' && <div className="chat-election-controls" role="group" aria-label="Election sequence">
      {electionStages.map(item => <button key={item.id} type="button" aria-pressed={stageId === item.id} aria-controls={`${id}-content`} onClick={() => setStageId(item.id)}>{item.label}</button>)}
    </div>}
    <div id={`${id}-content`} className="chat-figure-content">
      <div className="chat-figure-maps">
        {active === 'failure' ? <>
          <ElectionMap stage={stage} mobile={false} id={`${id}-desktop`}/>
          <ElectionMap stage={stage} mobile id={`${id}-mobile`}/>
        </> : <>
          <ArchitectureMap flow={flow} fanout={fanout} mobile={false} id={`${id}-desktop`}/>
          <ArchitectureMap flow={flow} fanout={fanout} mobile id={`${id}-mobile`}/>
        </>}
      </div>
      <div className="chat-flow-explanation" aria-live="polite" aria-atomic="true">
        <p className="chat-flow-title">{active === 'failure' ? stage.title : flow.title}</p>
        <p>{active === 'failure' ? stage.summary : flow.summary}</p>
        {!compact && <>
          <ol className="chat-flow-route" aria-label={`${flow.label} flow`}>{flow.route.map(step => <li key={step}>{step}</li>)}</ol>
          <p className="chat-flow-detail">{flow.detail}</p>
          {active === 'failure' && <div className="chat-election-note"><p>Election timeout handling</p><p>If known higher PIDs do not reply before timeout, a candidate declares itself leader. A Bully reply instead makes it wait for Leader; if that announcement never arrives, it restarts election.</p></div>}
        </>}
      </div>
    </div>
    <figcaption>{flow.caption}</figcaption>
  </figure>;
}
