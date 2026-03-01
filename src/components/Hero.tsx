"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

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
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:justify-between">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-center lg:text-left"
        >
          <h1 className="font-serif text-5xl leading-tight font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Darrin Du
            <br />
            <span className="text-accent">Computer Vision</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            Exploring the boundaries of Object Detection, Segmentation, and 3D
            Vision. Building systems that understand the visual world.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-light"
            >
              View Projects
            </a>
            <a
              href="#about"
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
            >
              About Me
            </a>
          </div>
        </motion.div>

        {/* Parallax visual */}
        <div className="relative hidden h-96 w-96 lg:block" aria-hidden="true">
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
