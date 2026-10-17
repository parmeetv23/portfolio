// Original conceptual illustration. No product screen or operational data is shown.
export type ApplicationLayer = "overview" | "interface" | "services" | "data";

export default function ApplicationStudy({
  active,
}: {
  active: ApplicationLayer;
}) {
  return (
    <svg
      className={`v3-application-svg v3-layer-${active}`}
      viewBox="0 -25 760 595"
      role="img"
      aria-label="Conceptual exploded view of a full-stack application: React interfaces, Django services and scoring, and ETL data integration. Not a product screenshot."
    >
      <defs>
        <linearGradient id="v3-app-paper" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fcfff4" />
          <stop offset="1" stopColor="#c3d1ac" />
        </linearGradient>
        <linearGradient id="v3-app-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a3b498" />
          <stop offset="1" stopColor="#59745e" />
        </linearGradient>
        <pattern
          id="v3-app-grid"
          width="38"
          height="38"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M38 0H0V38"
            stroke="#b7c8ac"
            strokeWidth=".6"
            opacity=".22"
            fill="none"
          />
        </pattern>
        <filter id="v3-app-shadow" x="-50%" y="-60%" width="200%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <path fill="url(#v3-app-grid)" d="M15 0h730v550H15Z" />
      <ellipse
        cx="398"
        cy="483"
        rx="243"
        ry="43"
        fill="#0e281e"
        opacity=".7"
        filter="url(#v3-app-shadow)"
      />
      <g className="v3-app-layer v3-app-data">
        <path
          d="m116 350 266-152 266 152-266 153Z"
          fill="#54725a"
          stroke="#8ca27c"
        />
        <path
          d="m116 350 266 153 266-153v12L382 516 116 362Z"
          fill="#3e5b45"
          stroke="#79966b"
          strokeWidth=".6"
        />
        {Array.from({ length: 4 }, (_, row) =>
          Array.from({ length: 5 }, (_, col) => {
            const x = 342 + col * 41 - row * 38,
              y = 282 + col * 23 + row * 22;
            return (
              <g key={`${row}-${col}`}>
                <path
                  d={`m${x} ${y} 31 18 -29 17 -31-18Z`}
                  fill={col % 2 === 0 ? "#d0ddba" : "#8fa87a"}
                  stroke="#4d6c4f"
                  strokeWidth="1"
                />
                <path
                  d={`m${x - 29} ${y + 17} 31 18v5l-31-18Z`}
                  fill="#709064"
                />
              </g>
            );
          }),
        )}
        <path d="M245 404h-85l-30 22" stroke="#bdcda9" fill="none" />
        <text x="45" y="449" className="v3-app-label">
          Data integration
        </text>
      </g>
      <g className="v3-app-layer v3-app-services">
        <path
          d="m116 245 266-152 266 152-266 153Z"
          fill="url(#v3-app-metal)"
          stroke="#d1dcbd"
          strokeWidth=".7"
        />
        <path d="m116 245 266 153 266-153v9L382 408 116 254Z" fill="#617c5f" />
        <path
          d="m233 245 149-85 149 85-149 86Z"
          fill="none"
          stroke="#ebf1dc"
          strokeDasharray="3 6"
          opacity=".7"
        />
        {[
          { x: 300, y: 244 },
          { x: 382, y: 197 },
          { x: 464, y: 244 },
        ].map(({ x, y }) => (
          <g key={x}>
            <path
              d={`m${x - 32} ${y} 32-18 32 18-32 18Z`}
              fill="#2c4937"
              stroke="#d1ddbd"
            />
            <path
              d={`m${x - 32} ${y} 32 18 32-18v10l-32 18-32-18Z`}
              fill="#36583f"
            />
            <path
              d={`m${x - 12} ${y - 1} 12 7 12-7`}
              fill="none"
              stroke="#e4efcb"
              strokeWidth="2"
            />
          </g>
        ))}
        <path d="m570 264 80 0 30-22" fill="none" stroke="#d0ddbc" />
        <text x="563" y="220" className="v3-app-label">
          Django services
        </text>
      </g>
      <g className="v3-app-layer v3-app-interface">
        <path
          d="m116 143 266-152 266 152-266 153Z"
          fill="url(#v3-app-paper)"
          stroke="#eef4dc"
        />
        <path d="m116 143 266 153 266-153v10L382 307 116 153Z" fill="#9eb58a" />
        <g transform="matrix(.82 .47 -.82 .47 356 28)">
          <rect
            width="300"
            height="240"
            rx="3"
            fill="#f1f5e6"
            stroke="#8ea77b"
          />
          <path d="M0 36h300M65 36v204" stroke="#b0bfa1" />
          <path
            d="M15 17h30m35 0h70M15 60h31m-31 27h31m-31 27h31m-31 27h31"
            stroke="#7a9368"
            strokeWidth="4"
          />
          <path d="M86 64h107M86 82h161" stroke="#b3c49e" strokeWidth="6" />
          <rect x="85" y="107" width="192" height="96" fill="#d9e3c8" />
          <path
            d="M106 177v-26h23v26m18 0v-43h23v43m18 0v-29h23v29m18 0v-53h23v53"
            fill="#56754e"
          />
          <path d="M85 220h130" stroke="#a5b794" strokeWidth="4" />
        </g>
        <path d="M240 118h-95l-27-22" stroke="#d0ddbc" fill="none" />
        <text x="45" y="77" className="v3-app-label">
          React interfaces
        </text>
      </g>
      <path
        className="v3-app-flow"
        d="M382 475V350m0-40V245m0-50v-57"
        fill="none"
        stroke="#ecf5d2"
        strokeWidth="2"
        strokeDasharray="4 7"
        opacity=".75"
      />
    </svg>
  );
}
