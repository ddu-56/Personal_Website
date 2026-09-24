# Timeline Scroll Feature Implementation Plan

The goal is to implement a horizontal timeline scroll section where the user scrolls vertically, and the content moves horizontally to display key events. A "Skip to Projects" button will also be provided to bypass the timeline.

## File Structure & Proposed Changes

### 1. Timeline Component (`src/components/Timeline.tsx`)
This will be a new Client Component leveraging `framer-motion` for scroll-linked animations.

#### Structure
- **Outer Container**: An overarching `div` with a large height (e.g., `h-[300vh]`) to establish a scrollable area. The larger the height, the longer the user will need to scroll to complete the horizontal panning.
- **Sticky Inner Container**: An inner `div` sticky to the top of the viewport (`sticky top-0 h-screen overflow-hidden`). This container will lock into place as soon as it reaches the top of the screen and will remain visible for the entire duration of the scroll through the parent container's 300vh height.
- **Animated Track**: Inside the sticky container, a `motion.div` that behaves as a track containing the horizontal timeline items.

#### Animation Logic
- We will track the scroll progress of the outer container using `framer-motion`'s `useScroll` hook:
  ```tsx
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  ```
- Then, we transform this vertical progress `[0, 1]` into horizontal translation (e.g., `["0%", "-100%"]` or a pixel value depending on the track width):
  ```tsx
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  ```
- This `x` value is passed to the `motion.div` track inline style.

#### Content & UI Elements
- **Event Cards**: Statically sized cards (e.g., `w-[400px] h-[500px]`) laid out horizontally (`flex-row`) inside the track. They will represent milestones or key events.
- **Skip Button**: A statically positioned (or sticky) "Skip to Projects" button. It will use a simple anchor link `<a href="#projects">` or a programmatic scroll jump to bypass the timeline entirely.

### 2. Main Page Integration (`src/app/page.tsx`)
- Import the new `Timeline` component.
- Place `<Timeline />` between the existing `<About />` section and `<Projects />` sections.
- When the user scrolls past the `About` section, they will hit the `Timeline`. After scrolling through the timeline, the `Projects` section will naturally scroll into view from the bottom.

## Development & Verification Steps

1. **Setup Component Skeleton**: Create the barebones `src/components/Timeline.tsx` with the structure mentioned above.
2. **Implement Motion Hooks**: Integrate `useScroll` and `useTransform` and link it to the track's `style={{ x }}`.
3. **Populate Placeholder Data**: Add dummy cards inside the track so we have something physical to scroll through horizontally to verify the math is correct.
4. **Integration**: Add it to `src/app/page.tsx`.
5. **Testing & Tuning**: 
   - Verify that the outer container height feels right for the scroll speed.
   - Adjust the width of the animated track to perfectly match the number of item cards so it ends scrolling right when the last item arrives.
   - Click the "Skip to Projects" button to ensure it resolves smoothly to the `#projects` section ID.
