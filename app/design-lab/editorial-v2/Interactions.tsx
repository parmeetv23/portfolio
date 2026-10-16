"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ImportStudy } from "./Diagrams";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({ trigger: ".v2-practice", start: "top 100px", end: "bottom bottom-=80px", pin: ".v2-practice-heading", pinSpacing: false });
      gsap.fromTo(".v2-reading span", { opacity: .1 }, { opacity: 1, stagger: .08, ease: "none", scrollTrigger: { trigger: ".v2-reading", start: "top 88%", end: "top 50%", scrub: true, once: true } });
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope}>{children}</div>;
}

export function ImportFigure() {
  const [resumed, setResumed] = useState(false);
  return <figure className="v2-import-figure">
    <div className="v2-figure-top"><span>Resumable data imports</span><span>Snap Remedy</span></div>
    <ImportStudy resumed={resumed}/>
    <div className="v2-import-bottom"><p aria-live="polite">{resumed ? "Continue from the saved checkpoint." : "Save progress. Continue after interruption."}</p><button type="button" aria-pressed={resumed} onClick={() => setResumed(!resumed)}>{resumed ? "Reset study" : "Resume import"}<span aria-hidden="true">{resumed ? "↺" : "+"}</span></button></div>
    <figcaption>Conceptual illustration of the import approach, not a product capture.</figcaption>
  </figure>;
}

const notes = [
  { title: "Persistent checkpoints", copy: "Save progress between batches so an interrupted synchronization can resume without restarting the entire import." },
  { title: "Stable-key upserts", copy: "Match incoming records to stable keys when updating relational models, supporting replay after a failure." },
  { title: "Transactional imports", copy: "Validate and preview CSV data before importing it. Use transactions and rollback tests to check failure behavior." },
];

export function TechnicalNotes() {
  const [index, setIndex] = useState(0);
  const note = notes[index]!;
  return <aside className="v2-notes" aria-label="Implementation notes from Snap Remedy">
    <div className="v2-notes-top"><span>Implementation notes</span><div><button type="button" aria-label="Previous implementation note" onClick={() => setIndex((index + notes.length - 1) % notes.length)}>←</button><span className="v2-note-count">{index + 1} / {notes.length}</span><button type="button" aria-label="Next implementation note" onClick={() => setIndex((index + 1) % notes.length)}>→</button></div></div>
    <div aria-live="polite" aria-atomic="true"><h3>{note.title}</h3><p>{note.copy}</p></div>
  </aside>;
}

const stages = [
  { title: "Parse", mark: "J--", copy: "ANTLR4 grammars recognize the language. AST-shaping rules prepare it for semantic analysis." },
  { title: "Resolve", mark: "AST", copy: "Four passes handle declarations, scope and references, types, and structural validation." },
  { title: "Generate", mark: "MIPS", copy: "Storage annotations inform stack layout, calls, control flow, and buffered assembly output." },
];

export function CompilerStudy() {
  const [active, setActive] = useState(1);
  return <div className="v2-compiler-study">
    <div className="v2-compiler-intro"><div><p className="v2-discipline">Language implementation</p><h3><Link href="/projects/j-minus-minus-mips-compiler">J-- to MIPS compiler</Link></h3></div><p>A Python compiler built for CPSC 411. Explore the stages of the implementation.</p></div>
    <div className="v2-accordion" aria-label="Conceptual compiler pipeline">{stages.map((stage, i) => <div className={`v2-stage ${active === i ? "is-active" : ""}`} key={stage.title}>
      <button type="button" aria-expanded={active === i} aria-controls={`v2-stage-${i}`} onClick={() => setActive(active === i ? -1 : i)}><span>{stage.title}</span><span aria-hidden="true">{active === i ? "−" : "+"}</span></button>
      <div className="v2-stage-mark" aria-hidden="true">{stage.mark}</div>
      <p id={`v2-stage-${i}`} hidden={active !== i}>{stage.copy}</p>
    </div>)}</div>
    <div className="v2-compiler-foot"><p>Conceptual pipeline. Full execution remains unverified because external course support was unavailable during source review.</p><Link href="/projects/j-minus-minus-mips-compiler">Read project</Link></div>
  </div>;
}

export function ProjectStrip() {
  const strip = useRef<HTMLDivElement>(null);
  return <div className="v2-project-strip"><div className="v2-strip-heading"><p>More projects</p><button type="button" onClick={() => strip.current?.scrollBy({ left: 340, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} aria-label="Scroll more projects">Browse <span aria-hidden="true">→</span></button></div><div className="v2-strip-track" ref={strip} tabIndex={0} role="region" aria-label="More projects, scroll horizontally"><Link href="/projects/raspberry-pi-bare-metal">Bare-metal controller <span>C / GPIO / UART</span></Link><Link href="/projects/genetic-algorithm-hyperparameter-finder">Evolutionary search <span>Python / scikit-learn</span></Link><Link href="/projects/climate-control-simulation">Greenhouse simulation <span>Java / Swing</span></Link><Link href="/projects/kiddoflix">KiddoFlix <span>React / MUI</span></Link></div></div>;
}
