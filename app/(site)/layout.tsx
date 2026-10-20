import type { ReactNode } from 'react';
import SiteShell from '@/app/components/SiteShell';
import '@/app/snap-remedy.css';
import '@/app/distributed-chat.css';
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
