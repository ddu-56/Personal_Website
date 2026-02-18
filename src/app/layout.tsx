import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Computer Vision Researcher",
  description:
    "Academic portfolio showcasing work in Object Detection, Segmentation, and 3D Vision.",
  openGraph: {
    title: "Portfolio | Computer Vision Researcher",
    description:
      "Academic portfolio showcasing work in Object Detection, Segmentation, and 3D Vision.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Computer Vision Researcher",
    description:
      "Academic portfolio showcasing work in Object Detection, Segmentation, and 3D Vision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
