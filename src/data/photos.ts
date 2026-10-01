export interface Photograph {
  /** Path under /public, e.g. "/photos/14a.jpg". Leave empty for a placeholder. */
  src?: string;
  alt: string;
  /** Film-style frame number, shown in the caption and viewfinder label. */
  frame: string;
  caption: string;
  ratio: `${number}/${number}`;
}

// Order matters: the gallery layout in Photographs.tsx is positional.
export const photographs: Photograph[] = [
  {
    src: "/photos/alpine-lake.jpg",
    frame: "04A",
    caption: "Rachel Lake",
    alt: "Clear turquoise lake edged by a rocky shore and pine forest",
    ratio: "2/3",
  },
  {
    src: "/photos/fremont-bridge.jpg",
    frame: "07",
    caption: "Under the bridge",
    alt: "Steel arch bridge over a lake, with people sunbathing on a floating dock",
    ratio: "3/4",
  },
  {
    src: "/photos/shanghai-bund.jpg",
    frame: "11A",
    caption: "Shanghai",
    alt: "Shanghai skyline at night with a lit-up red ferry on the river",
    ratio: "3/4",
  },
  {
    src: "/photos/fog-lamps.jpg",
    frame: "15",
    caption: "Fog, after dark",
    alt: "Row of street lamps glowing through fog on an empty plaza at night",
    ratio: "9/16",
  },
  {
    src: "/photos/chongqing-night.jpg",
    frame: "22A",
    caption: "Chongqing",
    alt: "Tiered traditional buildings lit gold at night beneath modern towers",
    ratio: "9/16",
  },
  {
    src: "/photos/great-wall.jpg",
    frame: "31",
    caption: "Great Wall",
    alt: "The Great Wall winding over green mountain ridges",
    ratio: "9/16",
  },
  {
    src: "/photos/forest-light.jpg",
    frame: "36",
    caption: "Forest light",
    alt: "Sun rays falling through tall trees onto a forest path",
    ratio: "3/4",
  },
  {
    src: "/photos/shoreline-sunset.jpg",
    frame: "38A",
    caption: "Shoreline at dusk",
    alt: "Orange sunset over calm water from a pebble beach",
    ratio: "4/5",
  },
  {
    src: "/photos/coastline-sailboat.jpg",
    frame: "40",
    caption: "Coastline",
    alt: "Sailboat beached on a green coastline above turquoise water",
    ratio: "4/5",
  },
];
