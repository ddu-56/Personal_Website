import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Contact />
      <footer className="border-t border-ink/10 px-6 py-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} — Built with Next.js
      </footer>
    </main>
  );
}
