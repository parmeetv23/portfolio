export function ChatIllustration() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Conceptual diagram of a client discovering a chat server and messages forwarding between peers">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M125 205 C125 75 320 75 320 165 M125 205 C125 315 320 330 320 245 M320 165 C420 60 525 100 525 205 C525 310 420 340 320 245" opacity=".35" />
        <path d="M165 205 H280 M360 205 H485" />
        <circle cx="125" cy="205" r="39" /><circle cx="320" cy="205" r="40" /><circle cx="525" cy="205" r="39" />
      </g>
      <g fill="currentColor"><circle cx="125" cy="205" r="7" /><circle cx="320" cy="205" r="7" /><circle cx="525" cy="205" r="7" />
        <rect x="217" y="199" width="12" height="12" transform="rotate(45 223 205)" />
        <rect x="417" y="199" width="12" height="12" transform="rotate(45 423 205)" />
      </g>
      <g fill="currentColor" fontSize="15" textAnchor="middle" fontFamily="var(--lab-sans), sans-serif">
        <text x="125" y="276">Client</text><text x="320" y="276">Chat server</text><text x="525" y="276">Peer server</text>
        <text x="320" y="61" fontSize="13">Discovery, forwarding, persistence</text>
      </g>
    </svg>
  );
}

export function PetIllustration() {
  return (
    <svg viewBox="0 0 540 400" role="img" aria-label="Conceptual illustration of a cat partially hidden behind furniture; not a detection result">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M204 176 L198 85 L254 125 Q282 112 309 125 L360 85 L354 183 Q380 232 348 278 H211 Q177 233 204 176Z" />
        <path d="M240 177 L248 177 M307 177 L315 177 M273 200 L281 207 L289 200 M281 207 V219 M267 220 Q280 232 295 220" strokeLinecap="round" strokeWidth="3" />
        <path d="M207 209 L159 200 M207 222 L154 226 M352 209 L397 200 M352 222 L404 226" />
        <path d="M169 70 H144 V95 M372 70 H398 V95 M144 272 V297 H169 M398 272 V297 H372" strokeDasharray="3 5" opacity=".55" />
      </g>
      <path d="M50 259 Q50 236 76 236 H460 Q485 236 485 259 V342 H50Z" fill="currentColor" />
      <path d="M58 262 H476 M189 242 V340 M352 242 V340" fill="none" stroke="var(--pet-line, #d9dfe9)" strokeWidth="1" opacity=".65" />
      <text x="270" y="378" textAnchor="middle" fill="currentColor" fontFamily="var(--lab-sans), sans-serif" fontSize="13">Partial visibility. A different kind of test.</text>
    </svg>
  );
}

export function CompilerIllustration() {
  return (
    <svg viewBox="0 0 640 400" role="img" aria-label="Conceptual compiler pipeline from source through semantic analysis to MIPS output">
      <g fill="currentColor" fontFamily="var(--lab-display), sans-serif" textAnchor="middle">
        <text x="123" y="202" fontSize="58">J--</text><text x="500" y="202" fontSize="58">MIPS</text>
        <text x="123" y="249" fontSize="15">Source</text><text x="500" y="249" fontSize="15">Target</text>
        <text x="320" y="109" fontSize="14">Parse. Resolve. Generate.</text>
      </g>
      <g stroke="currentColor" fill="none" strokeWidth="1.5"><path d="M207 185 H405 M391 174 L405 185 L391 196" /><path d="M270 185 V290 H370 V185" opacity=".4" /></g>
      <text x="320" y="326" fill="currentColor" textAnchor="middle" fontFamily="var(--lab-sans), sans-serif" fontSize="13">Four semantic passes</text>
    </svg>
  );
}

export function ImportIllustration() {
  return (
    <svg viewBox="0 0 660 380" role="img" aria-label="Conceptual illustration of records passing through a saved checkpoint, based on resumable processing at Snap Remedy">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M${65 + i * 18} ${86 + i * 26} H${260 + i * 18} Q330 ${86 + i * 26} 330 190 Q330 ${294 - i * 26} ${400 - i * 18} ${294 - i * 26} H${595 - i * 18}`} opacity={.22 + i * .12} />)}
        <circle cx="330" cy="190" r="63" /><circle cx="330" cy="190" r="75" opacity=".25" />
      </g>
      <path d="M310 191 L324 205 L351 176" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <g fill="currentColor" fontFamily="var(--lab-sans), sans-serif" fontSize="13" textAnchor="middle"><text x="145" y="331">ERP records</text><text x="330" y="331">Saved checkpoint</text><text x="515" y="331">Resume processing</text></g>
    </svg>
  );
}
