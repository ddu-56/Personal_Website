export interface Experience {
  org: string;
  role: string;
  location: string;
  dates: string;
  stack: string[];
  /** Doubles as the viewfinder's class label. */
  label: string;
  /** The one-line takeaway shown before the entry is expanded. */
  summary: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    org: "HAIL Lab — University of Michigan",
    role: "Undergraduate Research Assistant, Software",
    location: "Ann Arbor, MI",
    dates: "May 2026 – Sept. 2026",
    stack: ["Python", "OpenCV", "ROSBAGs", "Git/GitHub"],
    label: "research",
    summary:
      "Building real-time OpenCV guidance and patient-safety tracking for VIGIL, a **$26.4M ARPA-H-backed** mobile clinic bringing healthcare to rural areas.",
    bullets: [
      "Expand a real-time visual display system in Python and OpenCV, supplying task guidance with ROS sensor data to improve procedural accuracy for clinicians using VIGIL, a **$26.4M ARPA-H-backed** mobile clinic expanding rural healthcare access.",
      "**Benchmark** different implementation approaches in 3 core parameters (RealSense positioning, spatial placement, jitter safeguards) to engineer a production design based on measured accuracy and latency tradeoffs rather than assumptions.",
      "Engineer a dynamic facial overlay and shoulder-anchored tracking system using OpenCV and segmentation algorithms to maintain eye-protection masking during procedures, **incorporating fallback redundancy** for continuous patient safety.",
      "Partner with hardware and clinical stakeholders to translate ambiguous requirements into concrete technical specs; rapidly prototyped interactive HTML/web concepts using **AI-assisted generation** workflows before hand-off to production engineers.",
    ],
  },
  {
    org: "NASA SUITS — Collaborative Lab for Advancing Work in Space (CLAWS)",
    role: "AR Director",
    location: "Ann Arbor, MI",
    dates: "Mar. 2026 – Present",
    stack: ["Unity", "C#", "Mixed Reality Toolkit (MRTK)"],
    label: "leadership",
    summary:
      "Co-directing a 12-person AR subteam competing nationally in the NASA SUITS Challenge, cutting feature integration time from **14 to 5 days**.",
    bullets: [
      "Co-directed a 12-person engineering subteam selected to compete nationally in the NASA SUITS Challenge, overseeing the architecture of an AR astronaut interface and backend.",
      "Established Git branching standards and mandatory pull-request review across the 12-person subteam, cutting cross-team feature integration time from 14 to 5 days.",
      "Managed a **2-month onboarding protocol** to teach 4 new members HoloLens 2 deployment workflows and Unity best practices to independently build and see their work within 1 week.",
    ],
  },
];
