// Public abstraction of application data flow. No business records or private schema.
const stages = [
  { title: 'Source data', lines: ['ERP records', 'Manual CSV inputs'], kind: 'source' },
  { title: 'Ingestion', lines: ['ETL and synchronization', 'Validation and imports'], kind: 'ingestion' },
  { title: 'Relational storage', lines: ['Application data', 'Persistent sync progress'], kind: 'storage' },
  { title: 'Scoring and APIs', lines: ['Deterministic ranking', 'Django JSON APIs'], kind: 'services' },
  { title: 'React interface', lines: ['Comparison controls', 'Rankings and details'], kind: 'interface' },
];

const overview = [
  { title: 'Data sources', lines: ['ERP records and manual inputs'], kind: 'source' },
  { title: 'Django backend', lines: ['Ingestion, relational models, scoring, and APIs'], kind: 'services' },
  { title: 'React frontend', lines: ['Configure comparisons and explore results'], kind: 'interface' },
];

function StageMark({ kind }: { kind: string }) {
  return <svg className="snap-stage-mark" viewBox="0 0 80 64" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    {kind === 'storage' ? <>
      <ellipse cx="40" cy="15" rx="25" ry="9"/>
      <path d="M15 15v32c0 12 50 12 50 0V15M15 31c0 12 50 12 50 0"/>
    </> : kind === 'source' ? <>
      <path d="M10 11h38v28H10zM31 28h38v27H31z"/>
      <path d="M17 19h16m-16 7h22M39 37h21m-21 8h15"/>
    </> : kind === 'interface' ? <>
      <rect x="10" y="10" width="60" height="44" rx="2"/>
      <path d="M10 21h60M23 21v33M32 32h27m-27 8h20m-20 7h24"/>
      <circle cx="17" cy="16" r="1" fill="currentColor" stroke="none"/>
    </> : kind === 'ingestion' ? <>
      <path d="M10 15h20l12 17h28M10 49h20l12-17M54 23l9 9-9 9"/>
      <circle cx="18" cy="15" r="5" fill="var(--snap-surface)"/>
      <circle cx="18" cy="49" r="5" fill="var(--snap-surface)"/>
    </> : <>
      <path d="M12 14h56M12 32h56M12 50h56"/>
      <rect x="23" y="8" width="10" height="12" fill="var(--snap-surface)"/>
      <rect x="48" y="26" width="10" height="12" fill="var(--snap-surface)"/>
      <rect x="33" y="44" width="10" height="12" fill="var(--snap-surface)"/>
    </>}
  </svg>;
}

export default function SnapRemedyArchitecture({ compact = false }: { compact?: boolean }) {
  return <figure className={`snap-architecture${compact ? ' snap-architecture-compact' : ''}`} aria-label="Snap Remedy application architecture">
    <div className="snap-architecture-heading">
      <p>{compact ? 'Data to results' : 'Application data flow'}</p>
    </div>
    <ol className="snap-flow" aria-label="Primary information flow, in order">
      {(compact ? overview : stages).map(stage => <li key={stage.title}>
        <StageMark kind={stage.kind}/>
        <p className="snap-stage-title">{stage.title}</p>
        <p className="snap-stage-copy">{stage.lines.map(line => <span key={line}>{line}</span>)}</p>
      </li>)}
    </ol>
    {!compact && <div className="snap-side-flows">
      <div>
        <p className="snap-side-title">Optional explanations</p>
        <p className="snap-side-route">Ranking context <span aria-hidden="true">→</span> LLM integration and cache <span aria-hidden="true">→</span> Result details</p>
        <p>LLM output does not calculate or change scores.</p>
      </div>
      <div>
        <p className="snap-side-title">Separate external-data viewer</p>
        <p className="snap-side-route">External data <span aria-hidden="true">→</span> Storage and APIs <span aria-hidden="true">→</span> Charts and tables</p>
        <p>No input to SKU scoring.</p>
      </div>
    </div>}
    {!compact && <figcaption>Logical components. ERP synchronization and CSV imports use separate ingestion paths.</figcaption>}
  </figure>;
}
