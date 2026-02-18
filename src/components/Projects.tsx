"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { projects, type ProjectTag } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const ALL_TAGS: ("All" | ProjectTag)[] = [
  "All",
  "Object Detection",
  "Segmentation",
  "3D Vision",
];

export default function Projects() {
  const [activeTag, setActiveTag] = useState<"All" | ProjectTag>("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="px-6 py-24 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif text-4xl font-bold tracking-tight text-ink">
          Projects
        </h2>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Filter projects by category">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTag === tag
                  ? "bg-accent text-paper"
                  : "border border-ink/15 text-muted hover:border-ink/30"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
