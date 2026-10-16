# Portfolio Website

This repository contains my personal portfolio website. It’s a simple Next.js site where I document and showcase projects I’ve worked on across distributed systems, backend engineering, and applied machine learning.

The goal of this site is not to be flashy, but to clearly explain what I built, why I built it, and the tradeoffs involved.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
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

### Production

```bash
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── components/       # Reusable components
│   ├── projects/         # Projects pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── data/
│   └── projects.ts       # Project data and types
└── public/               # Static assets
```

## Adding New Projects

Edit `data/projects.ts` and add a new project object following the `Project` interface. The project will automatically appear on the projects page and can be accessed via `/projects/[slug]`.

## Deployment

This site is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically build and deploy.

## Design Philosophy

This portfolio emphasizes:

- **Technical depth** over flashy design
- **Systems thinking** and reliability
- **Clear communication** of technical concepts
- **Professional presentation** for engineering roles

The design is minimal, dark-themed, and optimized for fast loading and readability.
