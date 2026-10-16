import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "./lab.css";

const newsreader = localFont({ src: "./fonts/newsreader-latin.woff2", variable: "--lab-serif", weight: "400 500", display: "swap" });
const publicSans = localFont({ src: "./fonts/public-sans-latin.woff2", variable: "--lab-sans", weight: "400 600", display: "swap" });
const bricolage = localFont({ src: "./fonts/bricolage-latin.woff2", variable: "--lab-display", weight: "400 700", display: "swap" });

export const metadata: Metadata = {
  title: "Private design exploration | Parmeet Virdi",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function DesignLabLayout({ children }: { children: ReactNode }) {
  // Prototypes are available locally in development, never as production pages.
  if (process.env.NODE_ENV === "production") notFound();
  return <div className={`${newsreader.variable} ${publicSans.variable} ${bricolage.variable} design-lab`}>{children}</div>;
}
