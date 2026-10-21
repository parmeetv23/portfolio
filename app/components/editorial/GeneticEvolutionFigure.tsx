const generations = [
  [{r:30,trait:0},{r:24,trait:1},{r:10,trait:0},{r:14,trait:1},{r:8,trait:0}],
  [{r:30,trait:0},{r:24,trait:1},{r:18,trait:2},{r:12,trait:1},{r:16,trait:2}],
  [{r:30,trait:0},{r:24,trait:1},{r:23,trait:2},{r:20,trait:2},{r:25,trait:2}],
];

export default function GeneticEvolutionFigure() {
  return <figure className="project-technical evolution-figure">
    <p className="technical-heading">Evolution across generations</p>
    <div className="evolution-legend"><span>Larger circle = higher fitness</span><span><i aria-hidden="true"/> Mutation</span></div>
    <ol className="generation-rows">
      {generations.map((candidates, generation) => <li key={generation}>
        <span className="generation-label">Generation {generation + 1}</span>
        <svg viewBox="0 0 500 86" role="img" aria-label={`Generation ${generation + 1}: the largest candidate A ${generation ? 'survives unchanged; smaller offspring vary in fitness and traits' : 'has the highest fitness; four other candidates have lower fitness'}.`}>
          <path d="M50 43H450" stroke="#a9b89e" fill="none"/>
          {candidates.map(({r,trait},index) => {
            const x=50+index*100,y=43;
            return <g key={index}>
              <circle cx={x} cy={y} r={r} fill={trait===1?'#a7b88f':'#3d5946'} stroke="#536b47" strokeWidth="1.5"/>
              {trait===2 && <path d={`M${x} ${y-r}a${r} ${r} 0 0 1 0 ${r*2}Z`} fill="#b9c8a7"/>}
              {index===0 && <><circle cx={x} cy={y} r={r+5} fill="none" stroke="#536b47"/><text x={x} y={y+6} textAnchor="middle" fill="#fafbf7" fontSize="18">A</text></>}
              {generation>0 && index>1 && <path d={`M${x+r-2} ${y-r-7}l5 5-5 5-5-5Z`} fill="#fafbf7" stroke="#536b47" strokeWidth="1.5"/>}
            </g>;
          })}
        </svg>
      </li>)}
    </ol>
    <figcaption>The strongest candidate, A, stays. Crossover mixes parent traits, and mutation varies offspring. Circle sizes are illustrative, not measured fitness.</figcaption>
  </figure>;
}
