"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ApplicationStudy, { type ApplicationLayer } from "./ApplicationStudy";
import { NetworkStudy } from "./Diagrams";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const sections = [
  { id: "v3-experience", name: "Experience" },
  { id: "v3-work", name: "Projects" },
  { id: "v3-contact", name: "Contact" },
];

export function Navigation() {
  const [active, setActive] = useState("v3-overview");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "v3-overview";
      for (const section of sections) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .35) current = section.id;
      }
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8) current = "v3-contact";
      setActive(current);
      setScrolled(scrollY > 24);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);
  return <header className={`v3-navigation ${scrolled ? "is-scrolled" : ""}`}>
    <div className="v3-header v3-wrap">
      <a href="#v3-overview" className="v3-monogram" aria-label="Parmeet Virdi, back to introduction" aria-current={active === "v3-overview" ? "location" : undefined}>pv<span aria-hidden="true">.</span></a>
      <p className="v3-header-role">Software developer<span>Calgary, Alberta</span></p>
      <nav aria-label="Portfolio navigation">{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.name}</a>)}<Link className="v3-resume" href="/resume">Resume <span aria-hidden="true">↗</span></Link></nav>
    </div>
  </header>;
}

export function Motion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".v3-app-flow", { strokeDashoffset: 220 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".v3-application-figure", start: "top 90%", end: "top 30%", scrub: true } });
      gsap.fromTo(".v3-application-svg", { y: 16 }, { y: 0, ease: "none", scrollTrigger: { trigger: ".v3-application-figure", start: "top bottom", end: "top 20%", scrub: true } });
    });
    return () => media.revert();
  }, { scope });
  return <div ref={scope}>{children}</div>;
}

const layers: { id: ApplicationLayer; name: string; title: string; copy: string }[] = [
  { id: "overview", name: "Overview", title: "A full-stack decision-support application", copy: "React dashboards connect to Django APIs, rules-based SKU scoring, and imported Spire ERP data." },
  { id: "interface", name: "Interfaces", title: "React dashboards", copy: "Interfaces for exploring SKU rankings, filtering results, reviewing pricing, and previewing CSV imports." },
  { id: "services", name: "Services", title: "Django APIs and application logic", copy: "Relational models, configurable scoring, filtering, and pricing connect the data to the interface." },
  { id: "data", name: "Data", title: "ETL and data integration", copy: "Spire ERP synchronization, pricing normalization, and validated CSV imports support the application’s data layer." },
];

export function ApplicationFigure() {
  const [active, setActive] = useState<ApplicationLayer>("overview");
  const layer = layers.find(layer => layer.id === active)!;
  return <figure className="v3-application-figure">
    <fieldset className="v3-layer-controls"><legend className="v3-sr-only">Explore the Snap Remedy application</legend>{layers.map(layer => <label key={layer.id} className={active === layer.id ? "is-selected" : ""}><input type="radio" name="application-layer" value={layer.id} checked={active === layer.id} onChange={() => setActive(layer.id)}/><span>{layer.name}</span></label>)}</fieldset>
    <ApplicationStudy active={active}/>
    <div className="v3-layer-description" aria-live="polite" aria-atomic="true"><h4>{layer.title}</h4><p>{layer.copy}</p></div>
    <figcaption>Conceptual application study, not a product screenshot.</figcaption>
  </figure>;
}

export function NetworkFigure() {
  const scope = useRef<HTMLElement>(null);
  const [traced, setTraced] = useState(false);
  const { contextSafe } = useGSAP({ scope });
  const trace = () => contextSafe(() => {
    setTraced(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.killTweensOf(scope.current?.querySelector(".v3-network-packet") ?? []);
    gsap.fromTo(".v3-network-packet", { strokeDashoffset: 710, opacity: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: "power1.inOut", onComplete: () => { gsap.set(".v3-network-packet", { opacity: 0 }); } });
  })();
  return <figure ref={scope} className="v3-network">
    <div className="v3-visual-title"><span>IRC-HAT</span><span>Distributed chat system</span></div>
    <NetworkStudy/>
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
