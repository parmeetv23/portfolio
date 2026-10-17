'use client';
import { useEffect, useState } from 'react';

export default function ResumeViewer() {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (settled) return;
    // PDF plugins do not consistently dispatch iframe load events. The delayed
    // message offers a fallback without claiming that the document has loaded.
    const timeout = window.setTimeout(() => setSettled(true), 6000);
    return () => window.clearTimeout(timeout);
  }, [settled]);

  return <div className="resume-viewer">
    <details open>
      <summary>Preview résumé on this page</summary>
      <p className="pdf-status" role="status">{settled ? 'If the preview is blank, use Open PDF or Download PDF above.' : 'Loading PDF preview… You can also open or download the file directly.'}</p>
      <iframe src="/Parmeet_Virdi_Resume.pdf#view=FitH&navpanes=0" title="Parmeet Virdi résumé PDF" onLoad={() => setSettled(true)}/>
    </details>
  </div>;
}
