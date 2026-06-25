import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ScrollProgress } from "../components/layout/ScrollProgress";
import { Hero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import { Now } from "../components/sections/Now";
import { Experience } from "../components/sections/Experience";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Now />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
