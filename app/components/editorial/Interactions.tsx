"use client";

import { useRef } from "react";
import Link from "next/link";

export function ProjectStrip() {
  const strip = useRef<HTMLDivElement>(null);
  return <div className="v3-project-strip"><div className="v3-strip-heading"><p>More projects</p><button type="button" onClick={() => strip.current?.scrollBy({ left: 340, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} aria-label="Scroll more projects">Browse <span aria-hidden="true">→</span></button></div><div className="v3-strip-track" ref={strip} tabIndex={0} role="region" aria-label="More projects, scroll horizontally"><Link href="/projects/genetic-algorithm-hyperparameter-finder">Genetic hyperparameter search <span>Python / scikit-learn</span></Link><Link href="/projects/ai-scheduling-hard-constraints">Soccer scheduling <span>Python / Constraint search</span></Link><Link href="/projects/fullstack-restaurant-system">Restaurant reservations <span>React / Express / MySQL</span></Link><Link href="/projects/raspberry-pi-bare-metal">Bare-metal controller <span>C / GPIO / UART</span></Link><Link href="/projects/climate-control-simulation">Greenhouse simulation <span>Java / Swing</span></Link><Link href="/projects/family-streaming-interface">Family streaming interface <span>React / MUI</span></Link></div></div>;
}
