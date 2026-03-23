import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      {/* Resume button — fixed top-right */}
      <a
        href="/images/Darrin_Du_Resume(1).pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 right-6 z-50 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper shadow-md transition-colors hover:bg-accent-light"
      >
        Resume
      </a>

      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="border-t border-ink/10 px-6 py-8 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} — Built with Next.js
      </footer>
    </main>
  );
}
