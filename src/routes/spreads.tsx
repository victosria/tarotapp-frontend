import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiGetSpreads } from "@/lib/mock-api";
import { SectionTitle, SunMark } from "@/components/Layout";

export const Route = createFileRoute("/spreads")({
  head: () => ({
    meta: [
      { title: "Spreads — Arcana Journey" },
      { name: "description", content: "Choose from tarot spreads: single card, three-card, Celtic Cross and more." },
      { property: "og:title", content: "Spreads — Arcana Journey" },
      { property: "og:description", content: "Choose a tarot spread and begin your reading." },
    ],
  }),
  component: SpreadsPage,
});

function SpreadsPage() {
  const { data: spreads = [] } = useQuery({ queryKey: ["spreads"], queryFn: apiGetSpreads });
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle eyebrow="Layouts" title="Tarot Spreads" subtitle="A spread is the shape of a question. Pick one and let the cards fall." />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {spreads.map((s) => (
          <div key={s.id} className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-8 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="uppercase text-xs tracking-[0.3em] text-gold-deep">{s.numberOfCards} card{s.numberOfCards > 1 ? "s" : ""}</p>
                <h2 className="font-display text-2xl text-brown mt-1">{s.name}</h2>
              </div>
              <div className="text-gold-deep"><SunMark /></div>
            </div>
            <p className="text-brown-soft text-sm">{s.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.positions.map((p) => (
                <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-cream-deep border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] text-brown">{p}</span>
              ))}
            </div>
            <Link to="/readings/new" search={{ spreadId: s.id }} className="inline-block mt-2 rounded-full bg-gradient-gold text-cream px-5 py-2 text-xs uppercase tracking-widest">Cast this spread</Link>
          </div>
        ))}
      </div>
    </div>
  );
}