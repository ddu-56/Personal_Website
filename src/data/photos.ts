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
  { frame: "04A", caption: "Untitled", alt: "Photograph", ratio: "4/5" },
  { frame: "07", caption: "Untitled", alt: "Photograph", ratio: "3/2" },
  { frame: "11A", caption: "Untitled", alt: "Photograph", ratio: "3/2" },
  { frame: "15", caption: "Untitled", alt: "Photograph", ratio: "4/5" },
  { frame: "22A", caption: "Untitled", alt: "Photograph", ratio: "1/1" },
  { frame: "31", caption: "Untitled", alt: "Photograph", ratio: "4/5" },
];
