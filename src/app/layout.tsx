import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parmeet Singh Virdi | Portfolio",
  description:
    "Backend / Distributed Systems / Applied ML — projects in fault-tolerant systems, computer vision, and optimization.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">{children}</body>
    </html>
  );
}
