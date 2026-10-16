// Original vector studies. These illustrate architecture, not captured software.
export function ImportStudy({ resumed }: { resumed: boolean }) {
  return (
    <svg viewBox="0 0 800 650" role="img" aria-label={`Conceptual layered diagram of Spire ERP records, a persistent checkpoint, and relational storage. ${resumed ? "Processing resumes from saved progress." : "Records pass through batch processing."} Not a project screenshot.`}>
      <defs>
        <linearGradient id="v2-sheet" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f5f8ed"/><stop offset="1" stopColor="#c2ccb8"/></linearGradient>
        <linearGradient id="v2-edge" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9eac97"/><stop offset="1" stopColor="#59715e"/></linearGradient>
        <pattern id="v2-grid" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="matrix(1 .56 -1 .56 400 80)"><path d="M34 0H0V34" stroke="#53705a" strokeWidth=".65" fill="none" opacity=".35"/></pattern>
        <filter id="v2-shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
      </defs>
      <ellipse cx="420" cy="543" rx="250" ry="48" fill="#3e5747" opacity=".12" filter="url(#v2-shadow)"/>
      <g className="v2-storage-plane">
        <path d="M115 402 425 224 735 402 425 580Z" fill="#6e826b"/>
        <path d="m115 402 310 178 310-178v13L425 594 115 415Z" fill="url(#v2-edge)"/>
        <path d="M115 402 425 224 735 402 425 580Z" fill="url(#v2-grid)"/>
        {Array.from({ length: 5 }, (_, row) => Array.from({ length: 6 }, (_, col) => {
          const x = 405 + col * 39 - row * 31;
          const y = 290 + col * 22 + row * 18;
          return <path key={`${row}-${col}`} d={`m${x} ${y} 27 15 -23 13 -27-15Z`} fill={col < 3 || resumed ? "#d9e3c7" : "#8fa286"} stroke="#59705b" strokeWidth=".6"/>;
        }))}
      </g>
      <g className={`v2-checkpoint-plane ${resumed ? "is-resumed" : ""}`}>
        <path d="M115 276 425 98 735 276 425 454Z" fill="url(#v2-sheet)" fillOpacity=".94" stroke="#a8b69e"/>
        <path d="m115 276 310 178 310-178v8L425 463 115 284Z" fill="#a1b192"/>
        <path d="M115 276 425 98 735 276 425 454Z" fill="url(#v2-grid)"/>
        <path d="m233 277 192-110 192 110-192 110Z" fill="none" stroke="#5a7459" strokeDasharray="4 5" opacity=".5"/>
        <ellipse cx="425" cy="285" rx="79" ry="45" fill="#718969"/>
        <path d="M346 273v12a79 45 0 0 0 158 0v-12Z" fill="#304e3d"/>
        <ellipse cx="425" cy="273" rx="79" ry="45" fill="#284836"/>
        <ellipse cx="425" cy="273" rx="64" ry="36" fill="none" stroke="#9ab38d" strokeWidth=".8"/>
        <path d="m399 274 18 10 36-22" fill="none" stroke="#e4edd6" strokeWidth="3" strokeLinecap="round"/>
      </g>
      <g className="v2-record-planes" stroke="#aab89f" strokeWidth=".8">
        {[0, 1, 2].map(i => <g key={i} transform={`translate(${i * 11} ${-i * 13})`}><path d="m203 158 105-61 118 68-105 61Z" fill="#eef2e5"/><path d="m203 158 118 68v5l-118-68Z" fill="#9bab8e"/><path d="m226 155 60 34m-43-44 60 34m-43-44 60 34" stroke="#7e9470"/></g>)}
      </g>
      <g fill="none" stroke="#405b46" strokeWidth="1">
        <path d="m298 209 0 35 46 26" strokeDasharray="3 5"/>
        <path d="m509 323 36 21v52" strokeDasharray="3 5"/>
        <path d="M255 110H134L97 89M501 270h161l54-31M310 482H163l-44 27"/>
        <circle cx="255" cy="110" r="3" fill="#405b46"/><circle cx="501" cy="270" r="3" fill="#405b46"/><circle cx="310" cy="482" r="3" fill="#405b46"/>
      </g>
      <g className="v2-diagram-labels" fill="#344c3a" fontFamily="var(--v2-sans), sans-serif" fontSize="16"><text x="44" y="77">Source records</text><text x="615" y="224">Checkpoint</text><text x="44" y="535">Stored records</text></g>
      <g className="v2-diagram-details" fill="#52644e" fontFamily="var(--v2-sans), sans-serif" fontSize="12"><text x="44" y="98">Spire ERP</text><text x="615" y="245">Saved between batches</text><text x="44" y="556">Stable-key upserts</text></g>
    </svg>
  );
}

export function NetworkStudy() {
  return (
    <svg viewBox="0 0 760 490" role="img" aria-label="Original conceptual illustration of IRC-HAT: discovery, chat-server peers, and file-backed history. Not a runtime capture.">
      <defs><linearGradient id="v2-node" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d6dfc6"/><stop offset="1" stopColor="#80977c"/></linearGradient></defs>
      <g fill="none" stroke="#a8b99a" strokeWidth="1">
        <ellipse cx="380" cy="246" rx="270" ry="132" transform="rotate(-15 380 246)" opacity=".4"/>
        <ellipse cx="380" cy="246" rx="270" ry="132" transform="rotate(15 380 246)" opacity=".2"/>
        <path d="m214 282 166-96 166 96-166 96Z" strokeDasharray="3 7"/>
        <path d="M380 97v71M214 282v73M546 282v73"/>
      </g>
      {[{x:214,y:282},{x:380,y:186},{x:546,y:282}].map(({x,y}) => <g key={x}><path d={`M${x-62} ${y-7}v15a62 35 0 0 0 124 0v-15Z`} fill="#6a8366"/><ellipse cx={x} cy={y-7} rx="62" ry="35" fill="url(#v2-node)"/><ellipse cx={x} cy={y-7} rx="46" ry="25" fill="none" stroke="#edf3dc" strokeWidth=".7"/><ellipse cx={x} cy={y-7} rx="8" ry="5" fill="#2b4938"/></g>)}
      <g fill="#dce6cd"><circle cx="294" cy="232" r="4"/><circle cx="465" cy="235" r="4"/><circle cx="381" cy="378" r="4"/></g>
      <g fill="#e5ecd9" fontFamily="var(--v2-sans), sans-serif" fontSize="15" textAnchor="middle"><text x="380" y="79">Server discovery</text><text x="214" y="379">Chat server</text><text x="546" y="379">Peer server</text></g>
      <text x="380" y="441" textAnchor="middle" fill="#b6c5aa" fontFamily="var(--v2-sans), sans-serif" fontSize="12">TCP connections / peer forwarding / local history</text>
    </svg>
  );
}
