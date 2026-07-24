import Link from 'next/link';
import { Ornament, SunMark } from '@/components/Layout';
import { CardArt } from '@/components/tarot/CardArt';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 opacity-20"><BigSun /></div>
        <div className="absolute -bottom-32 -right-16 opacity-20"><BigSun /></div>
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 grid md:grid-cols-2 gap-10 items-center relative">
          <div className="space-y-6">
            <p className="uppercase tracking-[0.4em] text-xs text-gold-deep">A Tarot Journal</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-brown">
              Turn the cards.<br />
              <span className="font-script text-gold-deep text-6xl md:text-7xl">Read the stars.</span>
            </h1>
            <p className="text-brown-soft max-w-md">
              Arcana Journey is a quiet place for tarot: explore the arcana, cast a spread, and keep a journal of every reading beneath the moon.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="/readings/new" className="rounded-full bg-gradient-gold text-cream px-6 py-3 text-sm uppercase tracking-widest shadow-[0_15px_30px_-15px_rgba(120,80,20,0.5)]">Draw a card</Link>
              <Link href="/library" className="rounded-full border border-brown/30 text-brown px-6 py-3 text-sm uppercase tracking-widest hover:bg-cream-deep">Browse library</Link>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative flex items-end gap-[-30px]">
              <div className="-mr-8 -rotate-12"><CardArt name="The Sun" variant="sun" /></div>
              <div className="z-10 translate-y-[-20px]"><CardArt name="The Moon" variant="moon" size="lg" /></div>
              <div className="-ml-8 rotate-12"><CardArt name="The Star" variant="star" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.35em] text-xs text-gold-deep mb-3">What awaits</p>
          <h2 className="font-display text-4xl text-brown">Rituals for the curious soul</h2>
          <div className="mt-4"><Ornament /></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-8 space-y-3">
              <div className="text-gold-deep"><SunMark /></div>
              <h3 className="font-display text-2xl text-brown">{f.title}</h3>
              <p className="text-brown-soft text-sm leading-relaxed">{f.body}</p>
              <Link href={f.href} className="inline-block text-xs uppercase tracking-[0.25em] text-gold-deep pt-2">{f.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="font-script text-4xl text-gold-deep">as above, so below</p>
        <p className="mt-6 text-brown-soft max-w-2xl mx-auto">Sign in to save your readings and favorite cards, or wander freely through the library.</p>
      </section>
    </>
  );
}

const FEATURES = [
  { title: "The Library", body: "A curated deck of major and minor arcana with upright and reversed meanings.", href: "/library", cta: "Enter the library" },
  { title: "Spreads", body: "From a single card to the Celtic Cross — pick a layout that suits your question.", href: "/spreads", cta: "See spreads" },
  { title: "The Journal", body: "Keep a record of every reading, your questions and the whispers you received.", href: "/readings", cta: "Open journal" },
] as const;

function BigSun() {
  return (
    <svg width="380" height="380" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="14" stroke="var(--gold-deep)" strokeWidth="0.4" />
      {Array.from({ length: 40 }).map((_, i) => {
        const a = (i / 40) * Math.PI * 2;
        const x1 = 50 + Math.cos(a) * 18, y1 = 50 + Math.sin(a) * 18;
        const x2 = 50 + Math.cos(a) * 46, y2 = 50 + Math.sin(a) * 46;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold-deep)" strokeWidth="0.4" />;
      })}
    </svg>
  );
}
