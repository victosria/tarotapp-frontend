import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Ornament } from "@/components/Layout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Arcana Journey" },
      { name: "description", content: "Return to your tarot journal and continue your journey." },
      { property: "og:title", content: "Sign In — Arcana Journey" },
      { property: "og:description", content: "Return to your tarot journal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("victoria@email.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <div className="text-center space-y-3 mb-8">
        <p className="uppercase tracking-[0.35em] text-xs text-gold-deep">Welcome back</p>
        <h1 className="font-display text-4xl text-brown">Sign in</h1>
        <Ornament />
      </div>
      <form
        className="space-y-5 bg-card border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] rounded-2xl p-8 shadow-[0_20px_50px_-30px_rgba(120,80,20,0.4)]"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null); setLoading(true);
          try { await login(email, password); nav({ to: "/readings" }); }
          catch (er: any) { setErr(er.message); }
          finally { setLoading(false); }
        }}>
        <Field label="Email"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></Field>
        <Field label="Password"><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></Field>
        {err && <p className="text-destructive text-sm">{err}</p>}
        <button disabled={loading} className="w-full rounded-full bg-gradient-gold text-cream py-3 uppercase tracking-widest text-sm disabled:opacity-60">
          {loading ? "Consulting the cards..." : "Enter"}
        </button>
      </form>
      <p className="text-center text-sm text-brown-soft mt-6">
        New here? <Link to="/register" className="text-gold-deep">Begin your journey</Link>
      </p>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-cream px-4 py-2.5 text-brown focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="uppercase tracking-[0.2em] text-xs text-brown-soft">{label}</span>
      {children}
    </label>
  );
}