import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { apiGetCards } from '@/lib/mock-api';
import { CardArt, variantFor } from '@/components/tarot/CardArt';
import { SectionTitle } from '@/components/Layout';

type ArcanaFilter = 'all' | 'Major' | 'Minor';
type SuitFilter = 'all' | 'Cups' | 'Wands' | 'Swords' | 'Pentacles';

const ARCANA_FILTERS: { value: ArcanaFilter; label: string }[] = [
  { value: 'all', label: 'All Cards' },
  { value: 'Major', label: 'Major Arcana' },
  { value: 'Minor', label: 'Minor Arcana' },
];

const SUIT_FILTERS: SuitFilter[] = ['all', 'Cups', 'Wands', 'Swords', 'Pentacles'];

export default function LibraryPage() {
  const { data: cards = [], isLoading } = useQuery({ queryKey: ['cards'], queryFn: apiGetCards });
  const [filter, setFilter] = useState<ArcanaFilter>('all');
  const [suit, setSuit] = useState<SuitFilter>('all');
  const [q, setQ] = useState('');

  const normalizedQuery = q.trim().toLowerCase();
  const filtered = cards.filter((card) => {
    const matchesArcana = filter === 'all' || card.arcana === filter;
    const matchesSuit = suit === 'all' || card.suit === suit;
    const matchesQuery = normalizedQuery === '' ||
      card.name.toLowerCase().includes(normalizedQuery) ||
      card.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedQuery));

    return matchesArcana && matchesSuit && matchesQuery;
  });

  const selectArcana = (value: ArcanaFilter) => {
    setFilter(value);
    if (value === 'Major') setSuit('all');
  };

  const selectSuit = (value: SuitFilter) => {
    setSuit(value);
    if (value !== 'all') setFilter('Minor');
  };

  const clearFilters = () => {
    setFilter('all');
    setSuit('all');
    setQ('');
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionTitle eyebrow="The Deck" title="Card Library" subtitle="Every card in the deck, its meaning upright and reversed, ready to be studied." />

      <div className="my-10 space-y-5">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ARCANA_FILTERS.map((option) => (
          <button key={option.value} onClick={() => selectArcana(option.value)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.25em] border transition-colors ${
              filter === option.value ? 'bg-gradient-gold text-cream border-transparent' : 'border-[color-mix(in_oklab,var(--gold)_40%,transparent)] text-brown hover:bg-cream-deep'
            }`}>{option.label}</button>
          ))}
        </div>

        {filter !== 'Major' && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SUIT_FILTERS.map((option) => (
              <button key={option} onClick={() => selectSuit(option)}
                className={`rounded-full px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] transition-colors ${
                  suit === option ? 'bg-midnight text-cream' : 'text-brown-soft hover:bg-cream-deep hover:text-brown'
                }`}>
                {option === 'all' ? 'All Suits' : option}
              </button>
            ))}
          </div>
        )}

        <div className="mx-auto max-w-md">
          <label className="relative block">
            <span className="sr-only">Search the tarot library</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by card or keyword..."
              className="w-full rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-cream px-5 py-3 pr-11 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]" />
            {q && <button onClick={() => setQ('')} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-brown-soft hover:text-brown">×</button>}
          </label>
        </div>

        <p className="text-center text-xs uppercase tracking-[0.22em] text-brown-soft">
          Showing {filtered.length} of {cards.length} cards
        </p>
      </div>

      {isLoading ? <p className="text-center text-brown-soft">Shuffling the deck...</p> : (
        filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--gold)_35%,transparent)] px-6 py-14 text-center">
            <p className="font-display text-2xl text-brown">No cards found</p>
            <p className="mt-2 text-sm text-brown-soft">Try another card name, keyword, or filter.</p>
            <button onClick={clearFilters} className="mt-5 text-xs uppercase tracking-[0.22em] text-gold-deep hover:text-brown">Clear all filters</button>
          </div>
        ) : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
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
