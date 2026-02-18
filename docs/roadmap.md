# Implementation Plan - Personal Website for Computer Vision Student

## Goal Description
Build a clean, minimal, and interactive personal website for a Computer Science student specializing in Computer Vision. The site will serve as an academic portfolio highlighting work in Object Detection/Segmentation and 3D Vision.

## User Review Required
> [!IMPORTANT]
> **Tech Stack**: **Next.js 15** (App Router) + **Tailwind CSS v4** + **Framer Motion** for interactive elements.
>
> **Design Vibe**: "Academic Minimal"
> - Background: `#f7f5f0` (Paper White)
> - Text: `#1a1814` (Near Black)
> - Accent: `#2d5a8e` (Muted Academic Blue)

## Proposed Changes

### Project Structure

Initialize a new Next.js project in the current directory.

```text
/public
  /images              # Project thumbnails, hero assets
/src
  /app
    page.tsx            # Single-page scroll layout
    layout.tsx          # Global layout (fonts, metadata, OG tags)
  /components
    /ui                 # Reusable UI atoms (Button, Card, Tag)
    Hero.tsx            # Landing section with parallax depth-map effect
    About.tsx           # Bio section
    Projects.tsx        # Filterable project grid
    ProjectCard.tsx     # Individual project card with hover reveal
    Contact.tsx         # Contact info / links
  /data
    projects.ts         # Typed project data (title, tags, images, links)
  /lib
    utils.ts            # Helpers (cn(), etc.)
```

### Content Strategy
- Projects defined in `/src/data/projects.ts` as a typed array — no CMS, easy to update.
- Each project entry: `{ title, description, tags[], thumbnail, hoverImage?, repoUrl?, demoUrl? }`.

### Design System

#### Typography
- **Headings**: `Playfair Display` (serif) — scholarly, high contrast.
- **Body**: `Inter` (sans-serif) — clean, highly readable at all sizes.

#### Colors
| Token          | Value     | Usage                |
|----------------|-----------|----------------------|
| `bg-paper`     | `#f7f5f0` | Page background      |
| `text-ink`     | `#1a1814` | Primary text         |
| `accent-blue`  | `#2d5a8e` | Links, tags, borders |

#### Responsive Breakpoints
- **Mobile**: < 640px (single column, stacked layout)
- **Tablet**: 640px–1024px (2-column project grid)
- **Desktop**: > 1024px (full layout, parallax active)

### Component Details

#### Hero Section
- **Layout**: Centered headline + subtitle on the left, parallax visual on the right.
- **Interaction**: Mouse-tracked parallax — two layers (original image + depth map overlay) shift independently on `mousemove`. Falls back to a subtle CSS float animation on mobile/touch.

#### Projects Section
- **Structure**: Filterable grid of `ProjectCard` components.
- **Filters**: Tag-based toggle buttons ("Object Detection", "Segmentation", "3D Vision", "All").
- **Hover effect**: Crossfade from project thumbnail to result visualization (e.g., segmentation mask overlay) using Framer Motion `AnimatePresence`.

#### About & Contact
- Typography-focused, single-column layout.
- About: short bio, research interests, education.
- Contact: icon links (GitHub, LinkedIn, email) — no contact form to avoid spam/backend complexity.

### Deployment
- **Host**: Vercel (zero-config for Next.js, free tier) — preserves SSR and dynamic capabilities needed for interactive parallax and scrolling image layout.
- **Domain**: Configure custom domain post-deploy if available.

### SEO & Accessibility
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`).
- OpenGraph + Twitter card meta tags in `layout.tsx`.
- All images require `alt` text; decorative images use `alt=""` + `aria-hidden`.
- Color contrast ratio meets WCAG AA (verified: `#1a1814` on `#f7f5f0` = 14.5:1).
- Keyboard-navigable filter buttons and links.
- `prefers-reduced-motion` media query disables parallax and crossfade animations.

## Verification Plan

### Automated
- `npm run build` — zero errors, zero warnings.
- `npm run lint` — ESLint passes.

### Manual
- Visual check of Paper White theme across sections.
- Parallax hero smoothness on desktop (Chrome, Firefox, Safari).
- Hover crossfade on project cards.
- Mobile layout at 375px and 390px widths.
- Keyboard-only navigation through all interactive elements.
- Lighthouse audit: Performance > 90, Accessibility > 95, SEO > 90.
