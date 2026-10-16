import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./editorial-v2.css";

const outfit = localFont({
  src: "../../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  variable: "--v2-sans",
  weight: "100 900",
  display: "swap",
});

export default function EditorialV2Layout({ children }: { children: ReactNode }) {
  return <div className={`${outfit.variable} editorial-v2`}>{children}</div>;
}
