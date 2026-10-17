import type { Metadata } from 'next';
import ResumeViewer from '@/app/components/ResumeViewer';
export const metadata: Metadata = { title: 'Résumé', description: 'View or download Parmeet Virdi’s résumé as a PDF.' };
export default function ResumePage() {
  return <main id="main-content" tabIndex={-1} className="v3-wrap">
    <header className="page-heading"><h1>Résumé</h1><div><p>My experience, education, and technical background in one document.</p><div className="resume-actions"><a className="action-link" href="/Parmeet_Virdi_Resume.pdf" download="Parmeet_Virdi_Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a><a className="text-link" href="/Parmeet_Virdi_Resume.pdf" target="_blank" rel="noopener noreferrer">Open PDF <span className="v3-sr-only">in a new tab</span><span aria-hidden="true">↗</span></a></div></div></header>
    <ResumeViewer/>
    <p className="resume-help">On a phone, opening the PDF directly usually offers the best reading experience. If your browser cannot display the preview, <a href="/Parmeet_Virdi_Resume.pdf" download>download a copy</a> to read in your PDF viewer.</p>
  </main>;
}
