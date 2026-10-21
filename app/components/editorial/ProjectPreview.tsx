import Link from 'next/link';
import type { Project } from '@/data/projects';
import ProjectArtwork from './ProjectArtwork';

// Overview figures shared by the gallery and homepage. Case studies keep full artwork.
export function ChatPreview() {
  return <figure className="gallery-preview gallery-chat">
    <p className="gallery-heading">Discover a host. Relay between peers.</p>
    <div className="gallery-discovery"><span>Client lookup</span><span aria-hidden="true">↔</span><strong>Addressing primary</strong></div>
    <div className="gallery-chat-map" role="img" aria-label="Clients connect directly to chat servers. Server A forwards to B, and B forwards to C, illustrating one-peer relay. Addressing handles discovery separately from chat traffic.">
      <div className="gallery-peer-row"><span>Server A</span><i aria-hidden="true">→</i><span>Server B</span><i aria-hidden="true">→</i><span>Server C</span></div>
      <div className="gallery-client-row"><span>↕<small>Client 1</small></span><span>↕<small>Client 2</small></span></div>
    </div>
    <figcaption>Local broadcast, peer forwarding, and seen-ID suppression. Selected relay path shown.</figcaption>
    <Link className="text-link" href="/projects/distributed-chat-system#architecture">Explore the interactive architecture <span aria-hidden="true">↗</span></Link>
  </figure>;
}

export function CompilerPreview() {
  return <figure className="gallery-preview gallery-compiler">
    <p className="gallery-heading">Source to assembly</p>
    <div className="gallery-translation">
      <div><span>J-- source</span><code>printi(42);</code></div>
      <span className="gallery-arrow" aria-hidden="true">→</span>
      <div><span>MIPS excerpt</span><code>{'li $v0, 42\n⋮\njal printi'}</code></div>
    </div>
    <p className="gallery-detail">Parse → Resolve names &amp; types → Emit</p>
    <figcaption>Illustrative excerpt; stack setup and runtime omitted. Calls use a custom stack convention.</figcaption>
  </figure>;
}

function EvolutionPreview() {
  return <figure className="gallery-preview gallery-evolution">
    <p className="gallery-heading">Keep the best. Vary the offspring.</p>
    <div className="gallery-populations">
      {[0, 1].map(generation => <div key={generation}><span>Generation {generation + 1}</span>
        <svg viewBox="0 0 280 80" role="img" aria-label={generation ? 'Candidate A is retained; offspring mix parent traits and vary through mutation.' : 'Candidate A has the highest fitness in this illustrative population.'}>
          <path d="M40 40H240" stroke="#8b9f7b"/>
          {[28, generation ? 23 : 18, generation ? 20 : 12].map((r, i) => <g key={i}>
            <circle cx={40 + i * 100} cy="40" r={r} fill={i === 1 ? '#a7b88f' : '#3d5946'}/>
            {i === 0 && <><circle cx="40" cy="40" r="33" fill="none" stroke="#536b47"/><text x="40" y="46" textAnchor="middle" fill="#fafbf7" fontSize="18">A</text></>}
            {generation === 1 && i === 2 && <><path d={`M240 ${40-r}a${r} ${r} 0 0 1 0 ${r*2}Z`} fill="#b9c8a7"/><path d="m261 14 5 5-5 5-5-5Z" fill="#fafbf7" stroke="#536b47"/></>}
          </g>)}
        </svg>
      </div>)}
    </div>
    <p className="gallery-detail">CV fitness → Selection → Crossover + mutation</p>
    <figcaption>Ring: retained best. Diamond: mutation. Size represents fitness; populations are illustrative, not measured results.</figcaption>
  </figure>;
}

function ControllerPreview() {
  return <figure className="gallery-preview gallery-controller">
    <p className="gallery-heading">Controller signals to game actions</p>
    <ol className="gallery-signal-path">
      <li><strong>SNES → Pi GPIO</strong><span>Latch + 16 clocked samples</span><code>Active-low → pressed mask</code></li>
      <li><strong>UART → Desktop Python</strong><span>Changed states only · hexadecimal</span><code>Decode bits → Pygame actions</code></li>
    </ol>
    <figcaption>Timing runs in bare-metal C on the Pi. The desktop host maps the received button mask to game actions.</figcaption>
  </figure>;
}

export function PetPreview() {
  return <figure className="gallery-preview gallery-pet">
    <p className="gallery-heading">Synthetic occlusion, real evaluation</p>
    <div className="gallery-dataset"><div><strong>3,312</strong><span>clean pet images</span></div><span aria-hidden="true">+</span><div><strong>3,000</strong><span>synthetic composites</span></div></div>
    <p className="gallery-training">6,312 training images <span>Whole-pet boxes retained</span></p>
    <p className="gallery-detail">YOLOv8n / EfficientDet-D0</p>
    <dl className="gallery-evaluation"><div><dt>Clean test</dt><dd>3,669 images</dd></div><div><dt>Real occlusion</dt><dd>74 images / 90 boxes</dd></div></dl>
    <figcaption>Clean vs. combined training. Real-occlusion transfer was mixed across detectors.</figcaption>
  </figure>;
}

function RestaurantPreview() {
  return <figure className="gallery-preview gallery-restaurant">
    <p className="gallery-heading">Three layers. One editable identity.</p>
    <ol className="gallery-app-layers" aria-label="Restaurant application architecture">
      <li><strong>React</strong><span>Axios services</span></li>
      <li><strong>Express</strong><span>Controllers + queries</span></li>
      <li><strong>MySQL</strong><span>Direct SQL</span></li>
    </ol>
    <div className="gallery-reservation-key"><span>Reservation key</span><div><code>Customer phone</code><code>Location</code><code>Date</code></div></div>
    <div className="gallery-key-update"><div><code>WHERE</code><span>Previous key</span></div><span aria-hidden="true">→</span><div><code>SET</code><span>Replacement values</span></div></div>
    <figcaption>Edits carry both old and new values so the API can locate the row even when its identifying fields change.</figcaption>
  </figure>;
}

export default function ProjectPreview({ project }: { project: Project }) {
  switch (project.slug) {
    case 'distributed-chat-system': return <ChatPreview/>;
    case 'j-minus-minus-mips-compiler': return <CompilerPreview/>;
    case 'genetic-algorithm-hyperparameter-finder': return <EvolutionPreview/>;
    case 'raspberry-pi-bare-metal': return <ControllerPreview/>;
    case 'occluded-pet-detection': return <PetPreview/>;
    case 'fullstack-restaurant-system': return <RestaurantPreview/>;
    default: return <ProjectArtwork project={project}/>;
  }
}
