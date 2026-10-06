"use client";

import { useEffect, useState } from "react";

// Fades out as soon as the page is scrolled, and back in at the very top.
export default function ScrollHint() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setHidden(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <a
      href="#about"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`eyebrow absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted transition-[opacity,color] duration-300 hover:text-ink ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Inner span carries the opening's fade, so it can't fight the
          scroll-driven opacity on the link itself. */}
      <span data-intro="hint" className="inline-block">
        Scroll down ↓
      </span>
    </a>
  );
}
