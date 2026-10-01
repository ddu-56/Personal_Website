import About from "@/components/About";
import Contact from "@/components/Contact";
import Dance from "@/components/Dance";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Masthead from "@/components/Masthead";
import Photographs from "@/components/Photographs";
import Viewfinder from "@/components/Viewfinder";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main className="relative">
      <Viewfinder />
      <Masthead />
      <Intro />
      <About />
      <Experience />
      <Work />
      <Photographs />
      <Dance />
      <Contact />
    </main>
  );
}
