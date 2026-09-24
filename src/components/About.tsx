import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

const notes = [
  {
    label: "Focus",
    items: [
      "Object detection & tracking",
      "Semantic & instance segmentation",
      "Monocular & stereo depth",
    ],
  },
  { label: "Tools", items: ["PyTorch / TorchVision", "OpenCV", "CUDA / TensorRT"] },
  { label: "Education", items: ["B.S. Computer Science", "University of Michigan"] },
  { label: "Off hours", items: ["Hip-hop", "Photography"] },
];

export default function About() {
  return (
    <section id="about" className="wrap py-24 sm:py-32">
      <SectionHeader index="05" kicker="About" title="A little more" />

      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12">
        <Photo
          className="col-span-8 sm:col-span-5 lg:col-span-3"
          ratio="3/4"
          alt="Candid photo of Darrin"
          note="Everyday life"
          caption="Fig. 3 — Off the clock"
          frame="person · 0.95"
          sizes="(min-width: 1024px) 25vw, 60vw"
        />

        <div className="col-span-12 space-y-5 text-lg leading-relaxed sm:col-span-7 lg:col-span-5 lg:col-start-5">
          <p>
            I’m a computer science student at the University of Michigan,
            specializing in computer vision and experimenting with what’s
            possible in VR and AR. I’m interested in how AI can make
            experiences more immersive and interactive.
          </p>
          <p className="text-ink/80">
            I like building systems that understand and interact with the world
            around them, from real-time detection on edge devices to
            transformer-based models for dense prediction. Lately I’m most
            interested in bridging 2D image understanding and 3D spatial
            reasoning.
          </p>
          <p className="text-ink/80">
            Photography and dance keep me looking at the world the way my work
            asks me to: carefully, and in motion.
          </p>
        </div>

        <dl className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-6 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:border-t-0 lg:pt-1">
          {notes.map((note) => (
            <div key={note.label}>
              <dt className="eyebrow text-[10px] text-muted">{note.label}</dt>
              {note.items.map((item) => (
                <dd key={item} className="mt-1.5 text-sm">
                  {item}
                </dd>
              ))}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
