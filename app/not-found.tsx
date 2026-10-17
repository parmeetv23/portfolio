import Link from 'next/link';
import SiteShell from './components/SiteShell';
export default function NotFound() {
  return <SiteShell><main id="main-content" tabIndex={-1} className="v3-wrap not-found"><header className="page-heading"><h1>Page not found.</h1><div><p>This page may have moved, or the address may be incomplete.</p><Link className="text-link" href="/">Return home <span aria-hidden="true">↗</span></Link></div></header></main></SiteShell>;
}
