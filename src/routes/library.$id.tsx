import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGetCard, apiGetFavorites, apiAddFavorite, apiRemoveFavorite } from "@/lib/mock-api";
import { CardArt, variantFor } from "@/components/tarot/CardArt";
import { Ornament } from "@/components/Layout";

export const Route = createFileRoute("/library/$id")({
  head: () => ({
    meta: [
      { title: "Card — Arcana Journey" },
      { name: "description", content: "The meaning and symbolism of a tarot card." },
      { property: "og:title", content: "Card — Arcana Journey" },
      { property: "og:description", content: "The meaning and symbolism of a tarot card." },
    ],
  }),
  component: CardDetailPage,
});

function CardDetailPage() {
  const { id } = useParams({ from: "/library/$id" });
  const cardId = Number(id);
  const qc = useQueryClient();
  const { data: card, isLoading } = useQuery({ queryKey: ["card", cardId], queryFn: () => apiGetCard(cardId) });
  const { data: favs = [] } = useQuery({ queryKey: ["favorites"], queryFn: apiGetFavorites });
  const isFav = favs.some((f) => f.tarotCardId === cardId);

  const toggle = useMutation({
    mutationFn: () => (isFav ? apiRemoveFavorite(cardId) : apiAddFavorite(cardId)),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["favorites"] }),
  });

  if (isLoading || !card) return <p className="text-center py-24 text-brown-soft">Turning the card...</p>;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link to="/library" className="text-xs uppercase tracking-[0.25em] text-brown-soft hover:text-gold-deep">← Back to Library</Link>
      <div className="grid md:grid-cols-[auto_1fr] gap-12 mt-8 items-start">
        <div className="flex justify-center">
          <CardArt name={card.name} variant={variantFor(card.name)} size="lg" />
        </div>
        <div className="space-y-6">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs text-gold-deep">{card.arcana} Arcana{card.suit ? ` · ${card.suit}` : ""}</p>
            <h1 className="font-display text-5xl text-brown mt-2">{card.name}</h1>
            <p className="font-script text-2xl text-gold-deep mt-1">element of {card.element.toLowerCase()}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {card.keywords.map((k) => (
              <span key={k} className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[color-mix(in_oklab,var(--gold)_40%,transparent)] text-brown">{k}</span>
            ))}
          </div>
          <button
            onClick={() => toggle.mutate()}
            className={`rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.25em] transition ${
              isFav ? "bg-midnight text-cream" : "bg-gradient-gold text-cream"
            }`}>
            {isFav ? "♥ In your favorites" : "☾ Save to favorites"}
          </button>

          <div className="pt-4"><Ornament /></div>

          <Meaning title="Upright" body={card.uprightMeaning} />
          <Meaning title="Reversed" body={card.reversedMeaning} reversed />
          <div>
            <h3 className="font-display text-2xl text-brown mb-1">Symbolism</h3>
            <p className="text-brown-soft leading-relaxed">{card.symbolism}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meaning({ title, body, reversed }: { title: string; body: string; reversed?: boolean }) {
  return (
    <div className={`rounded-xl p-5 border ${reversed ? "bg-midnight/5 border-midnight/20" : "bg-cream-deep border-[color-mix(in_oklab,var(--gold)_25%,transparent)]"}`}>
      <h3 className="font-display text-xl text-brown mb-1">{title}</h3>
      <p className="text-brown-soft leading-relaxed">{body}</p>
    </div>
  );
}