import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";

/** Scroll to a #hash target after client-side navigation (e.g. detail → /#projects). */
function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Aller au contenu
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}
