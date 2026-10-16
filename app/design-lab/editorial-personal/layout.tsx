import type { ReactNode } from "react";
import EditorialV3Layout from "../editorial-v3/layout";
import "./personal.css";

export default function EditorialPersonalLayout({ children }: { children: ReactNode }) {
  return <EditorialV3Layout><div className="editorial-personal">{children}</div></EditorialV3Layout>;
}
