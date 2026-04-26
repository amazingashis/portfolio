"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // Trigger first render when all loaded
          if (canvasRef.current && loadedImages[0]) {
             renderFrame(0, loadedImages);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = imgArray[index];
    if (!img) return;

    // object-fit: cover logic
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length > 0) {
      requestAnimationFrame(() => renderFrame(Math.round(latest), images));
    }
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        if (images.length > 0) {
           renderFrame(Math.round(frameIndex.get()), images);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#000000]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </div>
  );
}
