import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetFavorites, apiRemoveFavorite } from '@/lib/mock-api';
import { CardArt, variantFor } from '@/components/tarot/CardArt';
import { SectionTitle } from '@/components/Layout';

export default function FavoritesPage() {
  const qc = useQueryClient();
  const { data: favs = [], isLoading } = useQuery({ queryKey: ['favorites'], queryFn: apiGetFavorites });
  const remove = useMutation({ mutationFn: (id: number) => apiRemoveFavorite(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['favorites'] }) });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle eyebrow="Beloved" title="Favorite Cards" subtitle="Cards you've marked to return to whenever you need their guidance." />
      {isLoading ? <p className="text-center text-brown-soft mt-10">Gathering...</p> : favs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--gold)_35%,transparent)] mt-10">
          <p className="font-script text-3xl text-gold-deep">No favorites yet</p>
          <p className="text-brown-soft mt-2">Browse the <Link href="/library" className="text-gold-deep underline decoration-dotted">library</Link> and save the cards that call to you.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-12">
          {favs.map((f) => (
            <div key={f.id} className="flex flex-col items-center gap-3">
              <Link href={`/library/${f.card.id}`}>
                <a>
                  <CardArt name={f.card.name} variant={variantFor(f.card.name)} />
                </a>
              </Link>
              <div className="text-center">
                <p className="font-display text-lg text-brown">{f.card.name}</p>
                <button onClick={() => remove.mutate(f.card.id)} className="text-xs uppercase tracking-widest text-brown-soft hover:text-destructive mt-1">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
