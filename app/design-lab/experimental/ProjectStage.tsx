"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatIllustration, CompilerIllustration, PetIllustration } from "../Illustrations";

const studies = [
  { id: "chat", name: "IRC-HAT", category: "Distributed systems", slug: "distributed-chat-system", cover: <>One message.<br />Many moving parts.</>, title: "A chat system, beyond the chat window.", description: "Java NIO networking, capacity-aware discovery, peer forwarding, and indexed file-backed message history.", detail: "Clients discover a chat server; messages forward between peers. The course project explores registry coordination and specific reconnect paths, with documented recovery limitations.", illustration: ChatIllustration },
  { id: "pet", name: "Pet detection", category: "Applied machine learning", slug: "occluded-pet-detection", cover: <>Out of sight.<br />Still in the picture.</>, title: "What can a detector see when a pet is hidden?", description: "A study comparing clean and synthetic-occlusion training for pet detection in domestic environments.", detail: "YOLOv8n and EfficientDet-D0 were evaluated on clean and real-occlusion images. Synthetic augmentation produced mixed transfer results; the study documents those limitations.", illustration: PetIllustration },
  { id: "compiler", name: "J-- compiler", category: "Language & systems", slug: "j-minus-minus-mips-compiler", cover: <>A few words.<br />A different language.</>, title: "From source text to MIPS assembly.", description: "A Python compiler with ANTLR4 grammars, AST shaping, four semantic passes, and target-code generation.", detail: "Source passes through parsing, name and type resolution, then storage layout and code emission. Missing external course support blocked full pipeline execution during the source investigation.", illustration: CompilerIllustration },
];

export default function ProjectStage() {
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const study = studies[selected] ?? studies[0]!;
  const Illustration = study.illustration;

  return (
    <section className="ex-study" id="ex-projects" aria-labelledby="ex-study-heading">
      <div className="ex-study-intro"><h2 id="ex-study-heading">The parts behind<br />the projects.</h2><p>Three projects. A look at what’s underneath.</p></div>
      <div className="ex-study-layout">
        <fieldset className="ex-select"><legend>Choose a project</legend>{studies.map((item, index) => <label key={item.id} className={selected === index ? "ex-option selected" : "ex-option"}><input type="radio" name="project-study" value={item.id} checked={selected === index} onChange={() => { setSelected(index); setRevealed(false); }} /><span>{item.name}</span><span className="ex-option-symbol" aria-hidden="true">{selected === index ? "↗" : "+"}</span></label>)}<Link href="/projects" className="ex-all-projects">Browse all nine projects <span aria-hidden="true">↗</span></Link></fieldset>
        <div className={`ex-stage ex-stage-${study.id} ${revealed ? "is-revealed" : ""}`}>
          <div className="ex-stage-top"><span>{study.category}</span><span aria-hidden="true">↙</span></div>
          <div className="ex-stage-art"><Illustration /><div className="ex-stage-cover" aria-hidden="true"><p>{study.cover}</p><span className="ex-cover-shape" /></div></div>
          <div className="ex-stage-bottom"><span>Conceptual illustration<br />Not a running demo or project capture</span><button type="button" aria-expanded={revealed} aria-controls="project-mechanism" onClick={() => setRevealed(value => !value)}>{revealed ? "Close the layer" : "Look beneath"}<span aria-hidden="true">{revealed ? "−" : "+"}</span></button></div>
        </div>
        <div className="ex-study-copy" aria-live="polite"><p className="ex-study-category">{study.category}</p><h3>{study.title}</h3><p>{study.description}</p><div id="project-mechanism" hidden={!revealed} className="ex-mechanism"><p>{study.detail}</p></div><Link href={`/projects/${study.slug}`} className="ex-project-link">Read the project <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
