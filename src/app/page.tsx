import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import YoursSherpa from "@/components/YoursSherpa";
import CertifiedEngineer from "@/components/CertifiedEngineer";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      <Hero />

      <Experience />
      <YoursSherpa />
      <CertifiedEngineer />
      <Projects />
      <Publications />
      <Achievements />
      <Certifications />
    </main>
  );
}
