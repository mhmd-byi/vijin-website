import { SplitText } from "@/components/fx/SplitText";

type Props = { eyebrow: string; title: string; text?: string; className?: string; center?: boolean };

export function SectionHeading({ eyebrow, title, text, className, center }: Props) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className ?? ""}`}>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent-ink">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
        <SplitText text={title} inView />
      </h2>
      {text ? <p className="mt-5 text-lg text-ink-muted">{text}</p> : null}
    </div>
  );
}
