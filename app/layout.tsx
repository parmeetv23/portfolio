import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = { themeColor: '#f1f3ed' };

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://parmeetvirdi.com",
  ),
  title: {
    default: "Parmeet Virdi | Portfolio",
    template: "%s | Parmeet Virdi",
  },
  description:
    "Portfolio of Parmeet Virdi - Software developer with full-stack experience in web applications, backend systems, data integration, distributed systems, and applied machine learning.",
  keywords: [
    "software development",
    "full-stack development",
    "backend engineering",
    "distributed systems",
    "machine learning",
    "fault tolerance",
    "systems engineering",
  ],
  authors: [{ name: "Parmeet Virdi" }],
  creator: "Parmeet Virdi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Parmeet Virdi",
    title: "Parmeet Virdi | Portfolio",
    description:
      "Portfolio of Parmeet Virdi - Software developer with full-stack experience in web applications, backend systems, data integration, distributed systems, and applied machine learning.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
