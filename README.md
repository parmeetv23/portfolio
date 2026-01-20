# Portfolio Website

Personal portfolio website for Parmeet Singh Virdi, showcasing backend engineering, distributed systems, and applied machine learning projects.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
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

