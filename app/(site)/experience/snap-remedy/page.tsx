import type { Metadata } from 'next';
import Link from 'next/link';
import RoleProgression from '@/app/components/RoleProgression';
import SnapRemedyArchitecture from '@/app/components/editorial/SnapRemedyArchitecture';
import { experiences } from '@/data/experiences';

export const metadata: Metadata = {
  title: 'Snap Remedy: ERP integration and product ranking',
  description: 'Full-stack engineering at Snap Remedy: relational data modeling, ERP integration, resumable synchronization, deterministic scoring, Django APIs, and React.',
};

const sections = [
  { id: 'data-modeling', title: 'Data modeling and ERP integration' },
  { id: 'synchronization', title: 'Resumable synchronization' },
  { id: 'scoring', title: 'Configurable SKU ranking' },
  { id: 'interface', title: 'Full-stack integration' },
  { id: 'validation', title: 'Testing and validation' },
];

export default function SnapRemedyPage() {
  const experience = experiences[0]!;
  return <main id="main-content" tabIndex={-1} className="v3-wrap snap-case">
    <header className="case-heading">
      <Link className="text-link" href="/experience#snap-remedy"><span aria-hidden="true">←</span> Professional experience</Link>
      <p className="case-category">Snap Remedy / Full-stack development</p>
      <h1>ERP integration and product ranking</h1>
      <p className="case-summary">I developed the Django backend and React frontend for an application that turns ERP records and manually supplied inputs into configurable product rankings.</p>
    </header>

    <section className="snap-introduction" aria-labelledby="application-title">
      <div>
        <h2 id="application-title">The application</h2>
        <p>Users configure comparisons through filters and factor weights, then review each finished-goods SKU’s score and supporting data.</p>
      </div>
      <aside className="snap-engagement" aria-label="Roles at Snap Remedy">
        <p>{experience.dates}</p>
        <RoleProgression roles={experience.roles}/>
        <ul className="technology-list" aria-label="Core technologies">{experience.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
      </aside>
    </section>

    <section id="architecture" className="snap-architecture-section" aria-labelledby="architecture-title">
      <div className="snap-section-heading"><h2 id="architecture-title">Application architecture</h2></div>
      <SnapRemedyArchitecture/>
    </section>

    <div className="case-layout">
      <aside className="case-toc">
        <p>Engineering decisions</p>
        <nav aria-label="Snap Remedy case study sections">
          <a href="#architecture">Architecture</a>
          {sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
        </nav>
      </aside>
      <div className="case-body snap-case-body">
        <section id="data-modeling" className="case-section">
          <h2>Data modeling and ERP integration</h2>
          <p>I built dataset-specific ETL adapters to map ERP payloads into Django models, convert values consistently, and resolve required relationships.</p>
          <p>I normalized repeated data into related records and used stable external identifiers and uniqueness constraints for repeatable imports. Retaining source payloads alongside queryable fields supported mapping diagnostics.</p>
          <p>Ranking queries the local database independently of synchronization, avoiding ERP requests during calculation.</p>
        </section>

        <section id="synchronization" className="case-section">
          <h2>Resumable synchronization</h2>
          <p>I implemented a shared synchronization runner with paginated fetching, bounded retries for temporary failures, and persistent checkpoints. Datasets run in dependency order.</p>
          <p>Checkpoints track page progress; writes commit in smaller transaction chunks. If a later chunk fails, committed chunks remain and the checkpoint stays on that page. Resume replays the page through stable-key upserts that update existing records instead of inserting duplicates.</p>
          <p>Status and recovery APIs expose progress and failures. Synchronization runs synchronously and supports checkpointed replay; it does not provide exactly-once processing. Recovery changes stored state without terminating a running process.</p>
        </section>

        <section id="scoring" className="case-section">
          <h2>Configurable SKU ranking</h2>
          <p>I implemented deterministic scoring with configurable weights, normalization, filtering, and stable tie ordering. Database-side aggregation prepares the inputs; Django APIs return scores and the values used to calculate them.</p>
          <p>The response identifies unavailable factors and reports completeness separately from the score. Missing-data rules distinguish unavailable inputs from low values.</p>
          <p>The API supports eight factors; seven have React controls. The remaining factor is API-only. Optional LLM explanations use completed ranking context without calculating or changing scores. Context-based caching reuses explanations; provider failures can be returned alongside valid rankings.</p>
        </section>

        <section id="interface" className="case-section">
          <h2>Full-stack integration</h2>
          <p>I built React controls for filters and weights, ranking requests, and expandable results, connected to Django JSON APIs.</p>
          <p>CSV imports provide row-level validation and a write-free preview. Confirmation revalidates the file and commits changes atomically, rolling back the import on a write failure.</p>
          <p>A separate external-data workflow stores observations and exposes them through APIs for charts and tables. It does not feed SKU scoring.</p>
        </section>

        <section id="validation" className="case-section">
          <h2>Testing and validation</h2>
          <p>I wrote backend tests for mapping, relationships, scoring, filters, API validation, and explanation caching. Failure-path tests cover retries, checkpoint replay, partial commits, and CSV rollback.</p>
          <p>The documented suite contains 185 tests; its recorded run used an isolated in-memory database and mocked providers. These results describe local backend behavior. I documented scoring rules, APIs, and synchronization recovery for handoff.</p>
        </section>
      </div>
    </div>
    <nav className="snap-case-return" aria-label="Return to experience"><Link className="text-link" href="/experience#snap-remedy"><span aria-hidden="true">←</span> Back to professional experience</Link></nav>
  </main>;
}
