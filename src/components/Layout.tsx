import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/library", label: "Library" },
  { to: "/spreads", label: "Spreads" },
  { to: "/readings", label: "Journal" },
  { to: "/favorites", label: "Favorites" },
] as const;

export function AppShell({ children }: { children?: React.ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const path = router.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur bg-[color-mix(in_oklab,var(--cream)_85%,transparent)] border-b border-[color-mix(in_oklab,var(--gold)_30%,transparent)]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <SunMark />
            <div className="leading-tight">
              <div className="font-display text-xl text-brown tracking-[0.25em]">ARCANA</div>
              <div className="font-script text-gold-deep text-sm -mt-1">journey</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-5 ml-4 text-xs">
            {NAV.map((n) => {
              const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
              return (
                <Link key={n.to} href={n.to} className={`uppercase tracking-[0.25em] transition-colors ${active ? "text-gold-deep" : "text-brown-soft hover:text-brown"}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            {user ? (
              <>
                <Link href="/profile" className="text-brown hover:text-gold-deep">{user.name}</Link>
                <button onClick={logout} className="text-brown-soft hover:text-brown text-xs uppercase tracking-widest">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-brown hover:text-gold-deep">Sign in</Link>
                <Link href="/register" className="rounded-full bg-gradient-gold text-cream px-4 py-2 text-xs uppercase tracking-widest">Begin</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-[color-mix(in_oklab,var(--gold)_20%,transparent)] py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-brown-soft">
          <div className="flex items-center gap-2">
            <SunMark small />
            <span className="font-script text-lg text-gold-deep">arcana journey</span>
          </div>
          <p>Woven with moonlight · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export function SunMark({ small = false }: { small?: boolean }) {
  const s = small ? 20 : 30;
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="6" stroke="var(--gold-deep)" strokeWidth="1.2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 20 + Math.cos(a) * 8, y1 = 20 + Math.sin(a) * 8;
        const x2 = 20 + Math.cos(a) * 15, y2 = 20 + Math.sin(a) * 15;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--gold-deep)" strokeWidth="1.2" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold-deep">
      <span className="h-px w-16 bg-[color-mix(in_oklab,var(--gold-deep)_40%,transparent)]" />
      <SunMark small />
      <span className="h-px w-16 bg-[color-mix(in_oklab,var(--gold-deep)_40%,transparent)]" />
    </div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-3">
      {eyebrow && <p className="uppercase tracking-[0.35em] text-xs text-gold-deep">{eyebrow}</p>}
      <h1 className="font-display text-4xl md:text-5xl text-brown">{title}</h1>
      {subtitle && <p className="text-brown-soft max-w-2xl mx-auto">{subtitle}</p>}
      <div className="pt-2"><Ornament /></div>
    </div>
  );
}