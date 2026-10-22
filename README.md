# Portfolio Website

This repository contains my personal portfolio website. It’s a simple Next.js site where I document and showcase projects I’ve worked on across distributed systems, backend engineering, and applied machine learning.

The goal of this site is not to be flashy, but to clearly explain what I built, why I built it, and the tradeoffs involved.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Editorial CSS with Tailwind CSS
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The completed editorial design lives on `portfolio-redesign`, with `main` kept as
the stable production branch. See the [redesign workspace guide](docs/PORTFOLIO-REDESIGN.md)
for historical design decisions and local prototype routes, and the
[repository quality guide](docs/REPOSITORY-QUALITY.md) for current verification
commands, artifact policy, and remaining maintenance work.

### Build

```bash
npm run build
```

### Validation

```bash
npm run typecheck
npm run lint
npm run build
```

Application code and Tailwind configuration use TypeScript. Strict checking includes
array access, unused declarations, and consistent filename casing. ESLint checks
the application, data, and tooling configs, rejects explicit `any`, and enforces
type-only imports.

`next.config.js` and `postcss.config.js` remain JavaScript for compatibility with
the existing Next.js 14 and PostCSS loaders. TypeScript and the React/Node type
definitions are installed as development dependencies. Next.js generates
`next-env.d.ts` and route types in `.next/types` during development or a build.
Development output uses `.next-dev`; production builds use `.next`, so building
does not overwrite a running development server. `NEXT_DIST_DIR` can override
the output directory for an isolated local preview.

### Production

```bash
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── (site)/           # Public pages; route group does not affect URLs
│   │   ├── page.tsx      # Home
│   │   ├── experience/   # Professional experience and Snap Remedy case study
│   │   ├── projects/     # Listing and nine project-detail pages
│   │   └── resume/       # PDF preview and download
│   ├── components/       # Reusable components
│   ├── design-lab/       # Historical prototypes; production requests return 404
│   ├── fonts/            # Local Newsreader font and license
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── *.css             # Shared and feature-specific editorial styles
├── data/
│   ├── experiences.ts    # Professional experience
│   ├── project-case-studies.ts
│   └── projects.ts       # Project data, order, and types
├── docs/                 # Design decisions and professional-reference evidence
├── scripts/quality/      # Production browser regression checks
└── public/               # Static assets
```

## Adding New Projects

Add the project record to `data/projects.ts` and its narrative to
`data/project-case-studies.ts`, then reference that narrative in the record's
`caseStudy` field. Array order determines the listing and adjacent-project links.
The static detail route is generated automatically; add a figure or preview only
when it helps explain the project. Preserve the supporting evidence in `docs/`.

## Deployment

The project can be deployed on Vercel. Resolve the dependency security findings in
the [quality review](docs/REPOSITORY-QUALITY.md) and repeat production verification
before deployment. `NEXT_PUBLIC_SITE_URL` may override the canonical site origin.

## Design Philosophy

This portfolio emphasizes:

- **Technical depth** over flashy design
- **Systems thinking** and reliability
- **Clear communication** of technical concepts
- **Professional presentation** for engineering roles

The design uses Newsreader and Outfit typography, evergreen text, a light fog
background, and sage panels. Both fonts are served locally.
