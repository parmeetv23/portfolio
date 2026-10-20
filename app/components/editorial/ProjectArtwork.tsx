import type { Project } from '@/data/projects';
import ChatArchitecture from './ChatArchitecture';
import DetectionResults from './DetectionResults';

// Conceptual diagrams describe documented structures, never fabricated product UI.
export default function ProjectArtwork({ project }: { project: Project }) {
  if (project.slug === 'distributed-chat-system') return <ChatArchitecture compact/>;
  if (project.slug === 'occluded-pet-detection') return <DetectionResults/>;
  const compiler = project.slug === 'j-minus-minus-mips-compiler';
  const embedded = project.category === 'Embedded';
  const search = project.slug === 'genetic-algorithm-hyperparameter-finder';
  const scheduling = project.slug === 'ai-scheduling-hard-constraints';
  const climate = project.slug === 'climate-control-simulation';
  const frontend = project.category === 'Frontend';
  const restaurant = project.slug === 'fullstack-restaurant-system';
  const labels = compiler ? ['J-- source', 'AST + semantics', 'MIPS assembly'] : embedded ? ['SNES controller', 'GPIO / C', 'UART terminal'] : frontend ? ['Browse', 'Profile', 'Restrictions'] : restaurant ? ['React client', 'Express API', 'MySQL'] : ['Sensor values', 'Control rules', 'Simulated climate'];
  const variant = compiler ? 'compiler' : project.category.toLowerCase();
  return <figure className={`project-art art-${variant}`}>
    <svg viewBox="0 0 640 340" role="img" aria-label={scheduling ? 'Conceptual grid showing allocation of field-time capacity; not an actual schedule.' : climate ? 'Conceptual diagram of temperature, humidity, and soil-moisture controllers.' : search ? 'Conceptual search diagram: candidate solutions, selection, variation, and another generation.' : `Conceptual structure: ${labels.join(', ')}.`}>
      {scheduling ? <>
        <g stroke="#99ab8d" fill="none">{[70,120,170,220,270].map(y => <path key={y} d={`M80 ${y}H565`}/>)}{[80,177,274,371,468,565].map(x => <path key={x} d={`M${x} 70V270`}/>)}</g>
        <g fill="#69865c"><rect x="83" y="73" width="188" height="44"/><rect x="277" y="173" width="91" height="94"/><rect x="471" y="123" width="91" height="94"/></g>
        <g fill="#b2c49c"><rect x="83" y="173" width="91" height="44"/><rect x="374" y="73" width="91" height="44"/><rect x="374" y="223" width="188" height="44"/></g>
        <g fill="#263f38" fontSize="16"><text x="80" y="43">Field × time allocation</text><text x="80" y="315">Capacity / restrictions / candidate schedules</text></g>
      </> : climate ? <>
        <g fill="none" stroke="#a8b89b"><circle cx="320" cy="165" r="108"/><path d="M80 165h480M320 35v260"/></g>
        {[{x:158,label:'Temperature'},{x:320,label:'Humidity'},{x:482,label:'Soil moisture'}].map(({x,label},i) => <g key={label}><circle cx={x} cy="165" r="57" fill={i===1 ? '#3f5e48' : '#c2cfb2'} stroke="#849b73"/><path d={`M${x-25} 165h50M${x} 140v50`} stroke={i===1 ? '#c9d8b7' : '#647c53'} fill="none"/><text x={x} y="259" textAnchor="middle" fill="#263f38" fontSize="16">{label}</text></g>)}
        <text x="320" y="315" textAnchor="middle" fill="#53674b" fontSize="15">Three independent simulation loops</text>
      </> : search ? <>
        <g fill="none" stroke="#8e9f80"><path d="M90 95H550M90 170H550M90 245H550"/>{[120,220,320,420,520].map(x => <path key={x} d={`M${x} 80v180`}/>)}</g>
        {[120,220,320,420,520].map((x,i) => <g key={x}><circle cx={x} cy="95" r={15+i*3} fill="#b1c19b" stroke="#536b47"/><circle cx={x} cy="170" r={i%2 ? 23 : 12} fill={i%2 ? '#3e5c48' : '#bfccb0'}/><circle cx={x} cy="245" r={19+(i%3)*4} fill="#536e48"/></g>)}
        <g fontSize="16" fill="#263f38"><text x="40" y="42">Candidates → selection → variation</text><text x="40" y="313">Search across generations</text></g>
      </> : embedded ? <>
        <rect x="205" y="40" width="230" height="245" rx="12" fill="#385644"/>
        <rect x="265" y="105" width="110" height="110" fill="#b7c7a5" stroke="#dce6d2" strokeWidth="3"/>
        {Array.from({length: 9},(_,i) => <g key={i} fill="#9caf8d"><rect x={226+i*22} y="52" width="8" height="20"/><rect x={226+i*22} y="255" width="8" height="18"/></g>)}
        <path d="M205 160H70M435 160H570" stroke="#6c8260" strokeWidth="2" strokeDasharray="5 6"/>
        <g fill="#263f38" fontSize="17" textAnchor="middle"><text x="320" y="158">Bare metal</text><text x="320" y="183">C</text><text x="90" y="137">SNES</text><text x="548" y="137">UART</text><text x="320" y="325">GPIO input / serial output</text></g>
      </> : compiler ? <>
        <g stroke="#9aaa8c" fill="none"><path d="M105 100H320L520 220M320 100L320 220M320 100L120 220"/><path d="M120 220v35M320 220v35M520 220v35"/></g>
        <g fill="#263f38" textAnchor="middle"><text x="320" y="74" fontSize="28">J--</text><text x="120" y="215" fontSize="28">Parse</text><text x="320" y="215" fontSize="28">Resolve</text><text x="520" y="215" fontSize="28">Generate</text><text x="120" y="287" fontSize="15">ANTLR4</text><text x="320" y="287" fontSize="15">Semantic passes</text><text x="520" y="287" fontSize="15">MIPS</text></g>
      </> : <>
        {labels.map((label,i) => <g key={label}><rect x={40+i*195} y={65+i*35} width="170" height="125" rx={frontend ? 25 : 0} fill={i===1 ? '#47614f' : '#c4d0b7'} stroke="#8b9f7b"/><text x={125+i*195} y={134+i*35} textAnchor="middle" fontSize="16" fill={i===1 ? '#f1f3ed' : '#263f38'}>{label}</text>{i<2 && <path d={`M${210+i*195} ${130+i*35}h25v35`} fill="none" stroke="#526f48" strokeWidth="2"/>}</g>)}
      </>}
    </svg>
    <figcaption>{compiler ? 'Conceptual compilation pipeline.' : embedded ? 'Conceptual hardware interface; not a board schematic.' : scheduling ? 'Conceptual scheduling grid; not a validated schedule.' : climate ? 'Conceptual control loops; software simulation only.' : search ? 'Conceptual search process; not measured convergence.' : frontend ? 'Interface areas in the prototype; not product screenshots.' : 'Conceptual application structure; not a runtime capture.'}</figcaption>
  </figure>;
}
