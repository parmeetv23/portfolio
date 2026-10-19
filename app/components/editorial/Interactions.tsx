"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { NetworkStudy } from "./Diagrams";

export function NetworkFigure() {
  const [traceCount, setTraceCount] = useState(0);
  const traced = traceCount > 0;
  const trace = () => setTraceCount(count => count + 1);
  return <figure className={`v3-network ${traced ? "is-tracing" : ""}`}>
    <div className="v3-visual-title"><span>IRC-HAT</span><span>Distributed chat system</span></div>
    <NetworkStudy key={traceCount}/>
    <div className="v3-network-bottom"><p aria-live="polite">{traced ? "Conceptual route through connected peers." : "Discovery, forwarding, local history."}</p><button type="button" onClick={trace}>{traced ? "Trace again" : "Trace a message"}<span aria-hidden="true">↗</span></button></div>
    <figcaption>Conceptual architecture study, not a runtime capture.</figcaption>
  </figure>;
}

const stages = [
  { title: "Parse", mark: "J--", copy: "ANTLR4 grammars recognize the language. AST-shaping rules prepare it for semantic analysis." },
  { title: "Resolve", mark: "AST", copy: "Four passes handle declarations, scope and references, types, and structural validation." },
  { title: "Generate", mark: "MIPS", copy: "Storage annotations inform stack layout, calls, control flow, and buffered assembly output." },
];

export function CompilerStudy() {
  const [active, setActive] = useState(1);
  return <div className="v3-compiler-study">
    <div className="v3-compiler-intro"><div><p className="v3-discipline">Language implementation</p><h3><Link href="/projects/j-minus-minus-mips-compiler">J-- to MIPS compiler</Link></h3></div><p>A Python compiler built for CPSC 411. Explore the stages of the implementation.</p></div>
    <div className="v3-accordion" aria-label="Conceptual compiler pipeline">{stages.map((stage, i) => <div className={`v3-stage ${active === i ? "is-active" : ""}`} key={stage.title}>
      <button type="button" aria-expanded={active === i} aria-controls={`v3-stage-${i}`} onClick={() => setActive(active === i ? -1 : i)}><span>{stage.title}</span><span aria-hidden="true">{active === i ? "−" : "+"}</span></button>
      <div className="v3-stage-mark" aria-hidden="true">{stage.mark}</div>
      <p id={`v3-stage-${i}`} hidden={active !== i}>{stage.copy}</p>
    </div>)}</div>
    <div className="v3-compiler-foot"><p>Conceptual pipeline. Full execution remains unverified because external course support was unavailable during source review.</p><Link href="/projects/j-minus-minus-mips-compiler">Read project</Link></div>
  </div>;
}

export function ProjectStrip() {
  const strip = useRef<HTMLDivElement>(null);
  return <div className="v3-project-strip"><div className="v3-strip-heading"><p>More projects</p><button type="button" onClick={() => strip.current?.scrollBy({ left: 340, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} aria-label="Scroll more projects">Browse <span aria-hidden="true">→</span></button></div><div className="v3-strip-track" ref={strip} tabIndex={0} role="region" aria-label="More projects, scroll horizontally"><Link href="/projects/raspberry-pi-bare-metal">Bare-metal controller <span>C / GPIO / UART</span></Link><Link href="/projects/genetic-algorithm-hyperparameter-finder">Evolutionary search <span>Python / scikit-learn</span></Link><Link href="/projects/climate-control-simulation">Greenhouse simulation <span>Java / Swing</span></Link><Link href="/projects/kiddoflix">KiddoFlix <span>React / MUI</span></Link></div></div>;
}
