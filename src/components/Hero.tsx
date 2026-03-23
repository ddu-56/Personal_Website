"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

const PixelBlast = dynamic(() => import("./PixelBlast"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(smoothX, [0, 1], [-20, 20]);
  const bgY = useTransform(smoothY, [0, 1], [-15, 15]);
  const fgX = useTransform(smoothX, [0, 1], [30, -30]);
  const fgY = useTransform(smoothY, [0, 1], [20, -20]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-12 lg:px-24"
    >
      {/* PixelBlast background – only covers this hero section */}
      <div className="pointer-events-none absolute inset-0">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#2d5a8e"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples={false}
          antialias={false}
          liquid={false}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        {/* Text – backdrop so it reads over PixelBlast */}
        <div className="max-w-xl rounded-3xl bg-paper/95 p-6 text-center shadow-[0_0_80px_40px_rgba(247,245,240,0.95)] lg:text-left">
          {/* Stage 1: Name splits in first */}
          <SplitText
            text="Darrin Du"
            tag="h1"
            className="font-serif text-5xl leading-tight font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
            delay={60}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="0px"
            textAlign="left"
            onLetterAnimationComplete={() => setStage(1)}
          />

          {/* Stage 2: Subtitle blurs in after name */}
          {stage >= 1 && (
            <BlurText
              text="Computer Vision"
              delay={120}
              animateBy="words"
              direction="bottom"
              className="font-serif text-5xl leading-tight font-bold tracking-tight text-accent sm:text-6xl lg:text-7xl"
              onAnimationComplete={() => setStage(2)}
            />
          )}

          {/* Stage 3: Description blurs in after subtitle */}
          {stage >= 2 && (
            <BlurText
              text="Exploring the boundaries of Object Detection, Segmentation, and 3D Vision. Building systems that understand the visual world."
              delay={80}
              animateBy="words"
              direction="top"
              className="mt-6 text-lg leading-relaxed text-muted sm:text-xl"
              onAnimationComplete={() => setStage(3)}
            />
          )}

          {/* Stage 4: Buttons fade in last */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-light"
            >
              View Projects
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              About Me
            </a>
          </motion.div>
        </div>

        {/* Parallax visual – frosted backdrop so it reads over PixelBlast */}
        <div className="relative z-20 hidden h-96 w-96 lg:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-3xl bg-paper/95 shadow-[0_0_80px_40px_rgba(247,245,240,0.95)]" />
          <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0">
            <Image
              src="/images/hero-layer-bg.svg"
              alt=""
              fill
              className="object-contain opacity-90"
              priority
            />
          </motion.div>
          <motion.div style={{ x: fgX, y: fgY }} className="absolute inset-0">
            <Image
              src="/images/hero-layer-fg.svg"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
