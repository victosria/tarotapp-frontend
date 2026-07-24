import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { apiGetSpreads, apiGetCards, apiCreateReading } from '@/lib/mock-api';
import { CardArt, variantFor } from '@/components/tarot/CardArt';
import { SectionTitle } from '@/components/Layout';

export default function NewReadingPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const { data: spreads = [] } = useQuery({ queryKey: ['spreads'], queryFn: apiGetSpreads });
  const { data: cards = [] } = useQuery({ queryKey: ['cards'], queryFn: apiGetCards });

  const searchSpreadId = typeof router.query.spreadId === 'string' ? Number(router.query.spreadId) : undefined;
  const [selectedSpreadId, setSelectedSpreadId] = useState<number | null>(searchSpreadId ?? null);
  const spread = useMemo(() => spreads.find((s) => s.id === selectedSpreadId) ?? spreads[0], [spreads, selectedSpreadId]);

  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [picks, setPicks] = useState<Record<number, { cardId: number | null; reversed: boolean; note: string }>>({});

  const positions = spread?.positions ?? [];
  const setPick = (idx: number, patch: Partial<{ cardId: number | null; reversed: boolean; note: string }>) => {
    setPicks((p) => {
      const prev = p[idx] ?? { cardId: null, reversed: false, note: '' };
      return { ...p, [idx]: { ...prev, ...patch } };
    });
  };

  const create = useMutation({
    mutationFn: () => apiCreateReading({
      spreadId: spread!.id, title, question, interpretation,
      cards: positions.map((pos, i) => {
        const p = picks[i] ?? { cardId: null, reversed: false, note: '' };
        return { tarotCardId: p.cardId ?? cards[i % cards.length]?.id ?? 1, position: pos, isReversed: p.reversed, note: p.note };
      }),
    }),
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ['readings'] });
      router.push(`/readings/${r.id}`);
    },
  });

  if (!spread) return null;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTitle eyebrow="New Reading" title="Cast the cards" subtitle="Choose a spread, name the cards you drew, and write what they whisper to you." />
      <form className="space-y-8 mt-12" onSubmit={(e) => { e.preventDefault(); create.mutate(); }}>
        <section className="space-y-3">
          <p className="uppercase text-xs tracking-[0.3em] text-brown-soft">Spread</p>
          <div className="flex flex-wrap gap-2">
            {spreads.map((s) => (
              <button type="button" key={s.id} onClick={() => setSelectedSpreadId(s.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border ${spread.id === s.id ? 'bg-gradient-gold text-cream border-transparent' : 'border-[color-mix(in_oklab,var(--gold)_35%,transparent)] text-brown hover:bg-cream-deep'}`}>{s.name}</button>
            ))}
          </div>
        </section>
        <section className="grid md:grid-cols-2 gap-5">
          <Field label="Title (optional)"><input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Morning card, new moon..." /></Field>
          <Field label="Your question"><input required value={question} onChange={(e) => setQuestion(e.target.value)} className={inputCls} placeholder="What should I focus on this month?" /></Field>
        </section>
        <section>
          <p className="uppercase text-xs tracking-[0.3em] text-brown-soft mb-3">Cards drawn</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {positions.map((pos, i) => {
              const p = picks[i] ?? { cardId: null, reversed: false, note: '' };
              const chosen = cards.find((c) => c.id === p.cardId);
              return (
                <div key={i} className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-4 space-y-3">
                  <p className="uppercase text-xs tracking-[0.25em] text-gold-deep">{pos}</p>
                  <div className="flex justify-center">
                    {chosen ? <CardArt name={chosen.name} variant={variantFor(chosen.name)} reversed={p.reversed} size="sm" /> : <div className="h-40 w-28 rounded-lg border border-dashed border-[color-mix(in_oklab,var(--gold)_40%,transparent)] flex items-center justify-center text-brown-soft text-xs">Add card</div>}
                  </div>
                  <select value={p.cardId ?? ''} onChange={(e) => setPick(i, { cardId: e.target.value ? Number(e.target.value) : null })} className={inputCls}>
                    <option value="">Choose a card...</option>
                    {cards.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <label className="flex items-center gap-2 text-xs text-brown-soft">
                    <input type="checkbox" checked={p.reversed} onChange={(e) => setPick(i, { reversed: e.target.checked })} /> Reversed
                  </label>
                  <textarea value={p.note} onChange={(e) => setPick(i, { note: e.target.value })} placeholder="Notes..." className={inputCls + ' min-h-16'} />
                </div>
              );
            })}
          </div>
        </section>
        <Field label="Your interpretation">
          <textarea required value={interpretation} onChange={(e) => setInterpretation(e.target.value)} className={inputCls + ' min-h-32'} placeholder="Write your interpretation..." />
        </Field>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => router.push('/readings')} className="rounded-full border border-brown/30 px-6 py-3 text-xs uppercase tracking-widest text-brown hover:bg-cream-deep">Cancel</button>
          <button disabled={create.isPending} className="rounded-full bg-gradient-gold text-cream px-6 py-3 text-xs uppercase tracking-widest disabled:opacity-60">{create.isPending ? 'Saving...' : 'Save reading'}</button>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-cream px-3 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="uppercase tracking-[0.2em] text-xs text-brown-soft">{label}</span>{children}</label>;
}
