"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Antigravity = dynamic(() => import("./Antigravity"), { ssr: false });

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:px-12 lg:px-24">
      {/* Particle background – contained to this section */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Antigravity
          count={200}
          color="#2d5a8e"
          particleSize={1.8}
          magnetRadius={8}
          ringRadius={8}
          autoAnimate
          waveSpeed={0.3}
          waveAmplitude={0.8}
          rotationSpeed={0.1}
          particleShape="capsule"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-ink">
            About
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            <p>
              I am a Computer Science student specializing in Computer Vision,
              with a focus on Object Detection, Semantic Segmentation, and 3D
              Scene Understanding. My research explores how machines can
              perceive, interpret, and reconstruct the visual world.
            </p>
            <p>
              My work spans from real-time detection systems on edge devices to
              transformer-based architectures for dense prediction tasks. I am
              particularly interested in bridging the gap between 2D image
              understanding and 3D spatial reasoning.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                label: "Research Interests",
                items: [
                  "Object Detection & Tracking",
                  "Semantic & Instance Segmentation",
                  "Monocular & Stereo Depth Estimation",
                ],
              },
              {
                label: "Tools & Frameworks",
                items: [
                  "PyTorch / TorchVision",
                  "OpenCV",
                  "CUDA / TensorRT",
                ],
              },
              {
                label: "Education",
                items: [
                  "B.S. Computer Science",
                  "Specialization: Computer Vision",
                  "Expected Graduation: 2026",
                ],
              },
            ].map((col) => (
              <div key={col.label}>
                <h3 className="text-sm font-semibold tracking-wide text-accent uppercase">
                  {col.label}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
