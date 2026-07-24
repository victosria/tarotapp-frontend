import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiGetReading, apiDeleteReading, apiGetCards, apiGetSpreads } from '@/lib/mock-api';
import { CardArt, variantFor } from '@/components/tarot/CardArt';
import { Ornament } from '@/components/Layout';

export default function ReadingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const readingId = Number(id);
  const qc = useQueryClient();
  const { data: reading, isLoading } = useQuery({ queryKey: ['reading', readingId], queryFn: () => apiGetReading(readingId) });
  const { data: cards = [] } = useQuery({ queryKey: ['cards'], queryFn: apiGetCards });
  const { data: spreads = [] } = useQuery({ queryKey: ['spreads'], queryFn: apiGetSpreads });
  const del = useMutation({
    mutationFn: () => apiDeleteReading(readingId),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['readings'] }); router.push('/readings'); },
  });

  if (isLoading || !reading) return <p className="text-center py-24 text-brown-soft">Opening the page...</p>;
  const spread = spreads.find((s) => s.id === reading.spreadId);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Link href="/readings" className="text-xs uppercase tracking-[0.25em] text-brown-soft hover:text-gold-deep">← Back to Journal</Link>
      <div className="text-center space-y-2 mt-6">
        <p className="uppercase text-xs tracking-[0.35em] text-gold-deep">{spread?.name} · {new Date(reading.createdAt).toLocaleDateString()}</p>
        <h1 className="font-display text-4xl md:text-5xl text-brown">{reading.title || reading.question}</h1>
        <p className="font-script text-2xl text-gold-deep">{reading.question}</p>
        <div className="pt-3"><Ornament /></div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 my-12">
        {reading.cards.map((rc) => {
          const card = cards.find((c) => c.id === rc.tarotCardId);
          if (!card) return null;
          return (
            <div key={rc.id} className="flex flex-col items-center gap-3">
              <CardArt name={card.name} variant={variantFor(card.name)} reversed={rc.isReversed} />
              <div className="text-center max-w-40">
                <p className="uppercase text-xs tracking-widest text-gold-deep">{rc.position}</p>
                <p className="font-display text-lg text-brown">{card.name}{rc.isReversed && ' (rev)'}</p>
                {rc.note && <p className="text-xs text-brown-soft mt-1 italic">"{rc.note}"</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-8">
        <h2 className="font-display text-2xl text-brown mb-3">Your interpretation</h2>
        <p className="text-brown-soft leading-relaxed whitespace-pre-wrap">{reading.interpretation}</p>
      </div>
      <div className="flex justify-end mt-8">
        <button onClick={() => { if (confirm('Delete this reading?')) del.mutate(); }} className="rounded-full border border-destructive/40 px-5 py-2 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10">Delete reading</button>
      </div>
    </div>
  );
}
