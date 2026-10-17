'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

const pages = [{ href: '/', label: 'Home' }, { href: '/experience', label: 'Experience' }, { href: '/projects', label: 'Projects' }, { href: '/resume', label: 'Resume' }];
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="v3-navigation site-navigation" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    <div className="v3-header v3-wrap">
      <Link href="/" className="v3-monogram" aria-label="Parmeet Virdi — Home" onClick={() => setOpen(false)}>pv<span aria-hidden="true">.</span></Link>
      <p className="v3-header-role">Software developer<span>Calgary, Alberta</span></p>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <nav id="site-menu" className={open ? 'is-open' : ''} aria-label="Primary navigation">
        {pages.map(({ href, label }) => <Link key={href} href={href} aria-current={(href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
        <a href="#contact" onClick={() => setOpen(false)}>Contact <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
