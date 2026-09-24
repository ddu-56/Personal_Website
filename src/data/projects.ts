export interface Project {
  title: string;
  role: string;
  dates: string;
  stack: string[];
  /** Doubles as the viewfinder's class label. */
  label: string;
  /** The one-line takeaway shown before the entry is expanded. */
  summary: string;
  bullets: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "Clerse",
    role: "Frontend Developer",
    dates: "Jan. 2026 – Feb. 2026",
    stack: ["Next.js 15", "React Flow", "TypeScript", "Liveblocks", "Tailwind CSS"],
    label: "web",
    summary:
      "A **1st-place** spatial AI canvas built in 24 hours at a Claude hackathon, using **Claude and parallel subagents**.",
    bullets: [
      "Co-developed a **1st-place** spatial AI canvas platform for a 24-hour Claude hackathon, utilizing **Claude and parallel subagents**.",
      "Developed an interactive “branching” UI module, allowing users to right-click message threads, fork conversation nodes, and visually track independent contextual branches via animated river edges.",
      "Executed end-to-end integration testing across 4 UI modules, delivering a flawless live presentation.",
    ],
  },
  {
    title: "GEMINI",
    role: "Mixed Reality Developer · CLAWS Sub-System / NASA SUITS",
    dates: "Nov. 2025 – May 2026",
    stack: ["Unity", "C#", "Mixed Reality Toolkit (MRTK)", "GitHub"],
    label: "mixed reality",
    summary:
      "A HoloLens AR interface that guided **a past astronaut** (Anne McClain) through **5 complex lunar mission protocols**.",
    bullets: [
      "Designed and integrated a cohesive end-to-end Augmented Reality (AR) interface in Unity with MRTK, guiding **a past astronaut** (Anne McClain) and engineers through **5 complex lunar mission protocols**.",
      "Engineered dynamic UI/UX screen workflows tailored for head-mounted displays (HMDs), **lowering cognitive load** and ensuring stable spatial anchoring under simulated extravehicular activity (EVA) constraints.",
      "**Bridged the gap between AI and UX** sub-teams, successfully embedding a localized AI agent into the spatial environment of the HoloLens to automate task dispatch and stream **real-time** telemetry.",
    ],
  },
  {
    title: "Synced In",
    role: "Solo Developer",
    dates: "Sept. 2022 – Dec. 2022",
    stack: ["C#", "Unity", "2D Design", "Game Development"],
    label: "game",
    summary:
      "A puzzle game I built solo in C# and published to Unity Play: 6 levels, **370+ plays**.",
    bullets: [
      "Architected core game logic, player mechanics, and interactive systems from scratch in C#; published to Unity Play.",
      "Prototyped **20+ puzzle designs** and refined difficulty curves to ship 6 production levels as sole developer, earning **370+ plays**.",
    ],
  },
];
