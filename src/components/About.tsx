import Photo from "./Photo";
import SectionHeader from "./SectionHeader";

const notes = [
  {
    label: "Focus",
    items: ["Computer vision", "AR applications"],
  },
  { label: "Tools", items: ["C++ / C# / Python", "OpenCV", "Unity"] },
  { label: "Education", items: ["B.S.E. Computer Science", "University of Michigan"] },
  { label: "Off hours", items: ["Hip-hop", "Photography", "Volleyball"] },
];

export default function About() {
  return (
    <section id="about" className="wrap section-y">
      <SectionHeader index="01" kicker="About" title="A little more" centered />

      <div className="mt-(--space-stack) grid grid-cols-12 gap-x-6 gap-y-12">
        <Photo
          className="col-span-8 sm:col-span-5 lg:col-span-3"
          src="/photos/off-the-clock.jpg"
          ratio="3/4"
          alt="Darrin, seen from behind, looking out over a mountain lake"
          note="Everyday life"
          caption="Fig. 2 — Off the clock"
          frame="person · 0.95"
          reveal
          sizes="(min-width: 1024px) 25vw, 60vw"
        />

        <div data-reveal className="col-span-12 space-y-5 text-lg leading-relaxed sm:col-span-7 lg:col-span-6 lg:col-start-4">
          <p>
            I’m a computer science student at the University of Michigan,
            specializing in computer vision and experimenting with what’s
            possible in VR and AR. I’m interested in how we can make
            experiences more immersive and interactive.
          </p>
          <p className="text-ink/80">
            I like building systems that see and respond to the world around
            them. At the HAIL Lab, that means real-time OpenCV tracking that
            keeps a patient’s eyes masked during procedures in a mobile clinic.
            With CLAWS, it means HoloLens interfaces that guided a former
            astronaut through lunar mission protocols. Lately I’m most
            interested in where the two meet: using vision to anchor digital
            interfaces in real, physical space.
          </p>
          <p className="text-ink/80">
            Photography and dance keep me looking at the world the way my work
            asks me to: carefully, and in motion.
          </p>
        </div>

        <dl data-reveal className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-6 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:border-t-0 lg:pt-1">
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
