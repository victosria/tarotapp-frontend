interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  reversed?: boolean;
  variant?: "sun" | "moon" | "star" | "eye";
}

export function CardArt({ name, size = "md", reversed, variant = "eye" }: Props) {
  const dims = size === "sm" ? "h-40 w-28" : size === "lg" ? "h-96 w-64" : "h-64 w-44";
  const rot = reversed ? "rotate-180" : "";
  return (
    <div className={`relative ${dims} shrink-0 rounded-lg overflow-hidden border shadow-[0_10px_30px_-10px_rgba(184,132,42,0.35)]`}
      style={{ backgroundColor: "var(--cream)", borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)" }}>
      <div className="absolute inset-2 rounded-md" style={{ border: "1px solid color-mix(in oklab, var(--gold) 60%, transparent)" }} />
      <div className="absolute inset-3 rounded-md" style={{ border: "1px dashed color-mix(in oklab, var(--gold) 40%, transparent)" }} />
      <svg viewBox="0 0 100 140" className={`absolute inset-0 h-full w-full ${rot}`}>
        <g fill="none" stroke="var(--gold-deep)" strokeWidth="0.7" strokeLinecap="round">
          {variant === "sun" && (
            <>
              <circle cx="50" cy="60" r="12" />
              {Array.from({ length: 16 }).map((_, i) => {
                const a = (i / 16) * Math.PI * 2;
                const x1 = 50 + Math.cos(a) * 16, y1 = 60 + Math.sin(a) * 16;
                const x2 = 50 + Math.cos(a) * 26, y2 = 60 + Math.sin(a) * 26;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
              <circle cx="46" cy="58" r="0.8" fill="var(--gold-deep)" />
              <circle cx="54" cy="58" r="0.8" fill="var(--gold-deep)" />
            </>
          )}
          {variant === "moon" && (
            <>
              <circle cx="50" cy="60" r="18" />
              <path d="M56 45 A18 18 0 0 1 56 75 A14 14 0 0 0 56 45 Z" fill="var(--gold-soft)" opacity="0.6" />
            </>
          )}
          {variant === "star" && (
            <path d="M50 40 L54 58 L72 60 L57 68 L62 86 L50 76 L38 86 L43 68 L28 60 L46 58 Z" />
          )}
          {variant === "eye" && (
            <>
              <path d="M30 62 Q50 45 70 62 Q50 79 30 62 Z" />
              <circle cx="50" cy="62" r="5" fill="var(--gold-deep)" />
            </>
          )}
          {Array.from({ length: 18 }).map((_, i) => {
            const x = (i * 37) % 90 + 5;
            const y = ((i * 23) % 120) + 10;
            return <circle key={i} cx={x} cy={y} r="0.5" fill="var(--gold-deep)" />;
          })}
        </g>
        <text x="50" y="128" textAnchor="middle" fontSize="6" fill="var(--brown)" style={{ fontFamily: "var(--font-display)", letterSpacing: 1 }}>
          {name.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}

export function variantFor(name: string): "sun" | "moon" | "star" | "eye" {
  const n = name.toLowerCase();
  if (n.includes("sun")) return "sun";
  if (n.includes("moon") || n.includes("priestess") || n.includes("cups")) return "moon";
  if (n.includes("star")) return "star";
  return "eye";
}