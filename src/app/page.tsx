import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background relative overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Technologies />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
