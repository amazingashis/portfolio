import Navbar from "@/components/Navbar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Publications from "@/components/Publications";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#000000]">
      <Navbar />

      {/* 500vh container for the scroll sequence */}
      <div className="relative h-[500vh] w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <Experience />
      <Projects />
      <Publications />
      <Achievements />
      <Certifications />
    </main>
  );
}
