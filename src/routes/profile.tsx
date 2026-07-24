import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { apiUpdateUser } from "@/lib/mock-api";
import { SectionTitle } from "@/components/Layout";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Profile — Arcana Journey" },
      { name: "description", content: "Manage your account information and preferences." },
      { property: "og:title", content: "Your Profile — Arcana Journey" },
      { property: "og:description", content: "Manage your account." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionTitle eyebrow="Your Account" title="Profile" subtitle="Update your information or manage your journey." />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <section className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-6 md:col-span-2">
          <h2 className="font-display text-2xl text-brown mb-4">Account information</h2>
          <form className="space-y-4" onSubmit={async (e) => {
            e.preventDefault();
            const u = await apiUpdateUser({ name, email });
            updateUser(u);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}>
            <Field label="Name"><input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></Field>
            <Field label="Email"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></Field>
            <div className="flex items-center gap-3">
              <button className="rounded-full bg-gradient-gold text-cream px-5 py-2 text-xs uppercase tracking-widest">Save changes</button>
              {saved && <p className="text-xs text-gold-deep">Saved ✨</p>}
            </div>
          </form>
        </section>
        <PrefBlock title="Change Password" desc="Rotate your password to keep your journal safe.">
          <button className="rounded-full border border-brown/30 px-5 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream-deep">Send reset link</button>
        </PrefBlock>
        <PrefBlock title="Preferences" desc="Reading defaults, theme and moon-cycle nudges.">
          <button className="rounded-full border border-brown/30 px-5 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream-deep">Coming soon</button>
        </PrefBlock>
        <PrefBlock title="Sign out" desc="Step away from your journal.">
          <button onClick={logout} className="rounded-full border border-brown/30 px-5 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream-deep">Sign out</button>
        </PrefBlock>
        <PrefBlock title="Delete Account" desc="This will erase your entire journey." destructive>
          <button className="rounded-full border border-destructive/40 px-5 py-2 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10">Delete account</button>
        </PrefBlock>
      </div>
    </div>
  );
}

function PrefBlock({ title, desc, children, destructive }: { title: string; desc: string; children: React.ReactNode; destructive?: boolean }) {
  return (
    <div className={`rounded-2xl bg-card p-6 border ${destructive ? "border-destructive/30" : "border-[color-mix(in_oklab,var(--gold)_25%,transparent)]"}`}>
      <h3 className="font-display text-xl text-brown">{title}</h3>
      <p className="text-sm text-brown-soft mt-1 mb-4">{desc}</p>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-md border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-cream px-3 py-2 text-sm text-brown focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklab,var(--gold)_45%,transparent)]";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="uppercase tracking-[0.2em] text-xs text-brown-soft">{label}</span>{children}</label>;
}