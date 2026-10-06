import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Darrin Du";
const description =
  "Computer vision student at the University of Michigan. Hip-hop dancer and photographer.";

const LITE_CHECK = `(() => {
  const html = document.documentElement;
  html.classList.replace("js-off", "js");
  const n = navigator;
  let lite = n.connection?.saveData || n.deviceMemory <= 2 || n.hardwareConcurrency <= 2;
  try { lite ||= sessionStorage.getItem("lite") === "1"; } catch {}
  if (lite) html.classList.add("lite");
})()`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The inline script tags <html> before first paint, so animated pieces can
    // start hidden without hiding anything from visitors who have JS off. It
    // also marks weak or data-saving devices "lite" (see ContactSheet.tsx).
    <html lang="en" className="js-off" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: LITE_CHECK,
          }}
        />
      </head>
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
      >
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
