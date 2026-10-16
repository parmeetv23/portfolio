export function NetworkStudy() {
  return (
    <svg viewBox="0 0 760 490" role="img" aria-label="Original conceptual illustration of IRC-HAT: discovery, chat-server peers, and file-backed history. Not a runtime capture.">
      <defs><linearGradient id="v3-node" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d6dfc6"/><stop offset="1" stopColor="#80977c"/></linearGradient></defs>
      <g fill="none" stroke="#a8b99a" strokeWidth="1">
        <ellipse cx="380" cy="246" rx="270" ry="132" transform="rotate(-15 380 246)" opacity=".4"/>
        <ellipse cx="380" cy="246" rx="270" ry="132" transform="rotate(15 380 246)" opacity=".2"/>
        <path d="m214 282 166-96 166 96-166 96Z" strokeDasharray="3 7"/>
        <path d="M380 97v71M214 282v73M546 282v73"/>
      </g>
      {[{x:214,y:282},{x:380,y:186},{x:546,y:282}].map(({x,y}) => <g key={x}><path d={`M${x-62} ${y-7}v15a62 35 0 0 0 124 0v-15Z`} fill="#6a8366"/><ellipse cx={x} cy={y-7} rx="62" ry="35" fill="url(#v3-node)"/><ellipse cx={x} cy={y-7} rx="46" ry="25" fill="none" stroke="#edf3dc" strokeWidth=".7"/><ellipse cx={x} cy={y-7} rx="8" ry="5" fill="#2b4938"/></g>)}
      <path pathLength="710" className="v3-network-packet" d="M214 282 380 186 546 282 380 378 214 282" fill="none" stroke="#f5fbd9" strokeWidth="4" strokeDasharray="16 694" opacity="0"/>
      <g fill="#dce6cd"><circle cx="294" cy="232" r="4"/><circle cx="465" cy="235" r="4"/><circle cx="381" cy="378" r="4"/></g>
      <g fill="#e5ecd9" fontFamily="var(--v3-sans), sans-serif" fontSize="15" textAnchor="middle"><text x="380" y="79">Server discovery</text><text x="214" y="379">Chat server</text><text x="546" y="379">Peer server</text></g>
      <text x="380" y="441" textAnchor="middle" fill="#b6c5aa" fontFamily="var(--v3-sans), sans-serif" fontSize="12">TCP connections / peer forwarding / local history</text>
    </svg>
  );
}
