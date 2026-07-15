import NextImage from "next/image";
import portraitFront from "@/assets/portrait-front.png";

/**
 * Static single-screen hero.
 *
 * One portrait, no scroll animation. The image is statically imported so Next
 * generates a blur placeholder at build time — the reader sees an instant
 * low-res preview (no flash of black) that sharpens the moment the full image
 * arrives, instead of waiting on a black screen + fade. `preload` starts the
 * fetch in the document head since this is the LCP element.
 */
export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Single portrait — full-screen cover, centered */}
      <NextImage
        src={portraitFront}
        alt="Ashish Adhikari"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />

      {/* Name + designation — lower-middle on mobile, dead-center from md up */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-[13vh] text-center px-4 md:justify-center md:pb-0">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-4 drop-shadow-lg leading-[1.05]">
          {/* Stacks onto two lines on mobile, one line from md up */}
          <span className="block md:inline">Ashish</span>{" "}
          <span className="block md:inline">Adhikari.</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide drop-shadow-md max-w-2xl">
          Senior Data &amp; AI Engineer.
        </p>
      </div>
    </section>
  );
}
