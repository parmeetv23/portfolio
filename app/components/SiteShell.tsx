import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import Link from 'next/link';
import Nav from './Nav';
import '../editorial.css';
import '../portfolio.css';

const newsreader = localFont({ src: '../fonts/newsreader-latin.woff2', variable: '--lab-serif', weight: '400 500', display: 'swap' });
const outfit = localFont({ src: '../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2', variable: '--v3-sans', weight: '100 900', display: 'swap' });

export default function SiteShell({ children }: { children: ReactNode }) {
  return <div className={`${newsreader.variable} ${outfit.variable} editorial-v3 editorial-personal portfolio`} id="top">
    <a className="site-skip" href="#main-content">Skip to content</a>
    <Nav/>
    {children}
    <footer id="contact" className="v3-footer">
      <div className="v3-wrap">
        <div className="v3-contact">
          <div><p>Have a role or project in mind?</p><h2>Let’s talk.</h2></div>
          <div className="v3-contact-details"><a href="mailto:parmeetv1@gmail.com">parmeetv1@gmail.com <span aria-hidden="true">↗</span></a><p>Full-stack applications, web interfaces,<br/>backend systems, and data integration.</p></div>
        </div>
        <div className="v3-footer-bottom"><span>Parmeet Virdi / Calgary, Alberta</span><nav aria-label="Social and resume links"><a href="https://github.com/parmeetv23">GitHub</a><a href="https://www.linkedin.com/in/parmeet-virdi/">LinkedIn</a><Link href="/resume">Resume</Link><a href="#top">Back to top <span aria-hidden="true">↑</span></a></nav></div>
      </div>
    </footer>
  </div>;
}
