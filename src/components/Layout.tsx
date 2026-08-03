import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("arcana.theme");
    const shouldUseDark = savedTheme === "dark";
    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("arcana.theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className="app-shell min-h-screen bg-background text-foreground">
      <aside className="desktop-sidebar fixed inset-y-0 left-0 z-50 w-72 flex-col border-r border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-cream-deep/95 px-6 py-8">
        <SidebarContent path={path} user={user} logout={logout} darkMode={darkMode} toggleTheme={toggleTheme} />
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-midnight/30 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <aside className="relative flex h-full w-[min(84vw,20rem)] flex-col bg-cream-deep px-6 py-7 shadow-2xl">
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="absolute right-5 top-5 text-2xl text-brown-soft hover:text-brown">×</button>
            <SidebarContent path={path} user={user} logout={logout} darkMode={darkMode} toggleTheme={toggleTheme} />
          </aside>
        </div>
      )}

      <header className="mobile-header sticky top-0 z-40 items-center justify-between border-b border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[color-mix(in_oklab,var(--cream)_90%,transparent)] px-5 py-4 backdrop-blur">
        <button aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] text-brown">
          <MenuIcon />
        </button>
        <Brand compact />
        <Link href="/profile" aria-label="Open profile" className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-sm font-semibold text-cream">
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </Link>
      </header>

      <main>{children}</main>
      <footer className="mt-24 border-t border-[color-mix(in_oklab,var(--gold)_20%,transparent)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-brown-soft md:flex-row">
          <div className="flex items-center gap-2">
            <SunMark small />
            <span className="font-script text-lg text-gold-deep">Arcana Journey</span>
          </div>
          <p>Woven with moonlight · © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

function SidebarContent({ path, user, logout, darkMode, toggleTheme }: {
  path: string;
  user: ReturnType<typeof useAuth>["user"];
  logout: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}) {
  return (
    <>
      <Brand />
      <p className="mt-8 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">Your tarot space</p>
      <nav className="mt-5 flex flex-col gap-2">
        {NAV.map((item) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          return (
            <Link key={item.to} href={item.to} className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm transition ${active ? "bg-card text-brown shadow-sm" : "text-brown-soft hover:bg-card/60 hover:text-brown"}`}>
              <span className="uppercase tracking-[0.18em]">{item.label}</span>
              <span className={`text-gold-deep transition ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>✦</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-4 border-t border-[color-mix(in_oklab,var(--gold)_25%,transparent)] pt-5">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-card/50 px-4 py-3 text-sm text-brown transition hover:bg-card"
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          <span className="uppercase tracking-[0.16em]">{darkMode ? "Light mode" : "Dark mode"}</span>
          <span aria-hidden="true" className="text-lg text-gold-deep">{darkMode ? "☀" : "☾"}</span>
        </button>
        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/profile" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-gold text-sm font-semibold text-cream">{user.name.charAt(0).toUpperCase()}</Link>
            <div className="min-w-0">
              <Link href="/profile" className="block truncate text-sm text-brown hover:text-gold-deep">{user.name}</Link>
              <button onClick={logout} className="text-[0.65rem] uppercase tracking-[0.2em] text-brown-soft hover:text-brown">Sign out</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-brown hover:text-gold-deep">Sign in</Link>
            <Link href="/register" className="rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-widest text-cream">Begin</Link>
          </div>
        )}
      </div>
    </>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <SunMark />
      <div className="leading-tight">
        <div className={`${compact ? "text-base" : "text-xl"} font-display tracking-[0.2em] text-brown`}>ARCANA</div>
        <div className="font-script text-sm text-gold-deep">journey</div>
      </div>
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
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
