"use client";

import { useEffect } from "react";

/** Registers public/sw.js (production only), once the page is idle. */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    const register = () =>
      navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` }).catch(() => {});
    // Safari has no requestIdleCallback; a short delay does the same job.
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(register);
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(register, 2000);
    return () => clearTimeout(id);
  }, []);

  return null;
}
