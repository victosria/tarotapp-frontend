import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { apiGetCards } from '@/lib/mock-api';
import { CardArt, variantFor } from '@/components/tarot/CardArt';
import { SectionTitle } from '@/components/Layout';

export default function LibraryPage() {
  const { data: cards = [], isLoading } = useQuery({ queryKey: ['cards'], queryFn: apiGetCards });
  const [filter, setFilter] = useState<'all' | 'Major' | 'Minor'>('all');
  const [q, setQ] = useState('');

  const filtered = cards.filter((c) =>
    (filter === 'all' || c.arcana === filter) &&
    (q === '' || c.name.toLowerCase().includes(q.toLowerCase()) || c.keywords.some(k => k.includes(q.toLowerCase())))
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle eyebrow="The Deck" title="Card Library" subtitle="Every card in the deck, its meaning upright and reversed, ready to be studied." />

      <div className="flex flex-wrap items-center gap-3 justify-center my-10">
        {(['all', 'Major', 'Minor'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.25em] border transition-colors ${
              filter === f ? 'bg-gradient-gold text-cream border-transparent' : 'border-[color-mix(in_oklab,var(--gold)_40%,transparent)] text-brown hover:bg-cream-deep'
            }`}>{f === 'all' ? 'All Arcana' : f + ' Arcana'}</button>
        ))}
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards..."
          className="ml-2 rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-cream px-4 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]" />
      </div>

      {isLoading ? <p className="text-center text-brown-soft">Shuffling the deck...</p> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filtered.map((c) => (
            <Link key={c.id} href={`/library/${c.id}`} className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1">
              <CardArt name={c.name} variant={variantFor(c.name)} />
              <div className="text-center">
                <p className="font-display text-lg text-brown">{c.name}</p>
                <p className="text-xs uppercase tracking-widest text-brown-soft">{c.suit ?? c.arcana}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
