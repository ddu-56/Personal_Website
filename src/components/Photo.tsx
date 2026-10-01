import Image from "next/image";

interface PhotoProps {
  /** Omit to render a labelled placeholder until the real photo is added. */
  src?: string;
  alt: string;
  ratio: `${number}/${number}`;
  /** Describes the shot we're waiting on; only shown on the placeholder. */
  note?: string;
  caption?: string;
  /** Viewfinder label. Setting it makes this photo a frame target. */
  frame?: string;
  groove?: boolean;
  sizes?: string;
  className?: string;
}

export default function Photo({
  src,
  alt,
  ratio,
  note,
  caption,
  frame,
  groove,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: PhotoProps) {
  return (
    <figure className={className}>
      <div
        data-frame={frame}
        data-frame-groove={groove ? "" : undefined}
        className="relative overflow-hidden bg-plate"
        style={{ aspectRatio: ratio }}
      >
        {src ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}${src}`}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="eyebrow absolute inset-0 flex items-end p-3 text-[10px] text-muted"
          >
            {note ?? "Photo"} · {ratio.replace("/", ":")}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="eyebrow mt-3 text-[10px] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
