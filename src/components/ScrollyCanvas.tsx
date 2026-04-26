"use client";

import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120;
const EAGER_FRAMES = 20;

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;

interface Props {
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollyCanvas({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>(Array(FRAME_COUNT).fill(null));
  const [ready, setReady] = useState(false);

  // Scope scroll progress to the 500vh container only.
  // offset ["start start", "end end"]:
  //   progress=0 → top of container at top of viewport
  //   progress=1 → bottom of container at bottom of viewport
  // This maps all 120 frames across the full sticky window.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  }, []);

  // Phase 1 — eagerly load first EAGER_FRAMES for fast first paint
  useEffect(() => {
    let eagerLoaded = 0;

    for (let i = 0; i < EAGER_FRAMES; i++) {
      const img = new Image();
      img.decoding = "sync";
      img.src = currentFrame(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        eagerLoaded++;
        if (i === 0) renderFrame(0);
        if (eagerLoaded === EAGER_FRAMES) {
          setReady(true);
          loadRemainingFrames();
        }
      };
    }

    // Phase 2 — load the rest in idle-time batches to avoid blocking
    function loadRemainingFrames() {
      let i = EAGER_FRAMES;
      const loadBatch = () => {
        const end = Math.min(i + 10, FRAME_COUNT);
        for (; i < end; i++) {
          const idx = i;
          const img = new Image();
          img.decoding = "async";
          img.src = currentFrame(idx);
          img.onload = () => { imagesRef.current[idx] = img; };
        }
        if (i < FRAME_COUNT) {
          if ("requestIdleCallback" in window) {
            requestIdleCallback(loadBatch, { timeout: 500 });
          } else {
            setTimeout(loadBatch, 50);
          }
        }
      };
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadBatch, { timeout: 500 });
      } else {
        setTimeout(loadBatch, 50);
      }
    }
  }, [renderFrame]);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!ready) return;
    requestAnimationFrame(() => renderFrame(Math.round(latest)));
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, renderFrame]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#000000]">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
