import Link from 'next/link';
import type { ReactNode } from 'react';
import { SchedulingFigure, StreamingFigure } from './ProjectLegacyFigures';
import GeneticEvolutionFigure from './GeneticEvolutionFigure';
import { TemperatureControl } from './ProjectMechanisms';

type Stage = { name: string; detail: string };
function Flow({ stages }: { stages: Stage[] }) {
  return <ol className="technical-flow">{stages.map(stage => <li key={stage.name}><span>{stage.name}</span><small>{stage.detail}</small></li>)}</ol>;
}

export function CompilerFigure() {
  return <figure className="project-technical compiler-example">
    <p className="technical-heading">From source code to execution</p>
    <ol className="compiler-translation">
      <li className="compiler-source"><p className="compiler-step-label">J-- source</p><pre><code>{'main() {\n  printi(42);\n}'}</code></pre><p className="compiler-step-note">Parse the program and resolve the call.</p></li>
      <li className="compiler-target"><p className="compiler-step-label">MIPS instructions</p><pre><code>{'li    $v0, 42\naddiu $sp, $sp, -4\nsw    $v0, 0($sp)\njal   printi\nnop\naddiu $sp, $sp, 4'}</code></pre><p className="compiler-step-note">Push the argument and call the print routine.</p></li>
      <li className="compiler-output"><p className="compiler-step-label">Expected output</p><samp>42</samp></li>
    </ol>
    <figcaption>Illustrative translation. The assembly excerpt omits function setup and the generated print routine, which uses a MIPS simulator syscall.</figcaption>
  </figure>;
}

export function CompilerStudy({ children }: { children?: ReactNode }) {
  return <div className="v3-compiler-study">
    <div className="v3-compiler-intro"><div><p className="v3-discipline">Language implementation</p><h3><Link href="/projects/j-minus-minus-mips-compiler">J-- to MIPS compiler</Link></h3></div><p>I built the grammar, semantic analysis, and a MIPS backend. Resolved declarations connect source expressions to target storage.</p></div>
    {children ?? <CompilerFigure/>}
    <div className="v3-compiler-foot"><p>Four semantic passes check names, types, and structural rules before assembly emission.</p><Link href="/projects/j-minus-minus-mips-compiler">Read project</Link></div>
  </div>;
}

export default function ProjectTechnicalFigure({ slug }: { slug: string }) {
  if (slug === 'j-minus-minus-mips-compiler') return <CompilerFigure/>;
  if (slug === 'climate-control-simulation') return <TemperatureControl/>;
  if (slug === 'genetic-algorithm-hyperparameter-finder') return <GeneticEvolutionFigure/>;
  if (slug === 'ai-scheduling-hard-constraints') return <SchedulingFigure/>;
  if (slug === 'raspberry-pi-bare-metal') return <figure className="project-technical controller-figure">
    <p className="technical-heading">From electrical signals to button state</p>
    <div className="runtime-boundary"><p>Raspberry Pi firmware</p><Flow stages={[{ name: 'Latch', detail: 'Capture button state' }, { name: 'Clock × 16', detail: 'Sample the data line' }]}/>
      <div className="signal-conversion"><div><span>Sampled line</span><code>… 1 0 1 1 …</code></div><div><span>Pressed mask</span><code>… 0 1 0 0 …</code></div></div>
      <small>Active-low input: 0 on the wire becomes 1 in the pressed mask.</small>
    </div>
    <div className="serial-transport"><strong>Changed state only ↓</strong><span>Hexadecimal / UART / 115200 baud</span></div>
    <div className="runtime-boundary"><p>Desktop Python host</p><Flow stages={[{ name: 'Decode mask', detail: 'Check individual button bits' }, { name: 'Dispatch', detail: 'Move or control the Pygame puzzle' }]}/></div>
    <figcaption>The Pi handles controller timing. The desktop receives a state message and maps its bits to actions. The bit pattern above is illustrative.</figcaption>
  </figure>;
  if (slug === 'family-streaming-interface') return <StreamingFigure/>;
  return null;
}
