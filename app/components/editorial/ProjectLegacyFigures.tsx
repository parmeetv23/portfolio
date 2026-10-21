export function SchedulingFigure() {
  return <figure className="project-technical restored-schedule">
    <p className="technical-heading">Time capacity and candidate schedules</p>
    <svg viewBox="0 0 640 280" role="img" aria-label="Schematic scheduling grid with candidate bookings occupying different amounts of time capacity.">
      <g stroke="#99ab8d" fill="none">{[40,90,140,190,240].map(y => <path key={y} d={`M80 ${y}H565`}/>)}{[80,177,274,371,468,565].map(x => <path key={x} d={`M${x} 40V240`}/>)}</g>
      <g fill="#69865c"><rect x="83" y="43" width="188" height="44"/><rect x="277" y="143" width="91" height="94"/><rect x="471" y="93" width="91" height="94"/></g>
      <g fill="#b2c49c"><rect x="83" y="143" width="91" height="44"/><rect x="374" y="43" width="91" height="44"/><rect x="374" y="193" width="188" height="44"/></g>
    </svg>
    <figcaption>Candidate bookings share recurring time capacity. The grid illustrates placements and durations; it is not a computed schedule.</figcaption>
  </figure>;
}

export function StreamingFigure() {
  const labels=['Browse','Profile','Restrictions'];
  return <figure className="project-technical restored-streaming">
    <p className="technical-heading">Browsing, profiles, and parent controls</p>
    <svg viewBox="0 0 640 300" role="img" aria-label="Three linked interface areas: catalog browsing, profile selection, and restriction settings.">
      {labels.map((label,i) => <g key={label}>
        <rect x={40+i*195} y={35+i*35} width="170" height="125" rx="25" fill={i===1?'#47614f':'#c4d0b7'} stroke="#8b9f7b"/>
        <text x={125+i*195} y={104+i*35} textAnchor="middle" fontSize="26" fill={i===1?'#f1f3ed':'#263f38'}>{label}</text>
        {i<2 && <path d={`M${210+i*195} ${100+i*35}h25v35`} fill="none" stroke="#526f48" strokeWidth="2"/>}
      </g>)}
    </svg>
    <figcaption>Linked interface areas in the family viewing prototype. Profile settings persist locally in the browser.</figcaption>
  </figure>;
}
