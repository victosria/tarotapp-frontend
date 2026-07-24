import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGetReadings, apiDeleteReading, apiGetSpreads } from "@/lib/mock-api";
import { SectionTitle } from "@/components/Layout";

export const Route = createFileRoute("/readings")({
  head: () => ({
    meta: [
      { title: "Journal — Arcana Journey" },
      { name: "description", content: "Your personal tarot journal, keeping every reading you have cast." },
      { property: "og:title", content: "Journal — Arcana Journey" },
      { property: "og:description", content: "Your personal tarot journal." },
    ],
  }),
  component: ReadingsLayout,
});

function ReadingsLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/readings") return <Outlet />;
  return <ReadingsIndex />;
}

function ReadingsIndex() {
  const qc = useQueryClient();
  const { data: readings = [], isLoading } = useQuery({ queryKey: ["readings"], queryFn: apiGetReadings });
  const { data: spreads = [] } = useQuery({ queryKey: ["spreads"], queryFn: apiGetSpreads });
  const del = useMutation({
    mutationFn: (id: number) => apiDeleteReading(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["readings"] }),
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <SectionTitle eyebrow="Your Journal" title="Readings" subtitle="Every whisper the cards have shared with you, gathered in one quiet place." />
      <div className="flex justify-end mt-8">
        <Link to="/readings/new" className="rounded-full bg-gradient-gold text-cream px-5 py-2.5 text-xs uppercase tracking-widest">+ New reading</Link>
      </div>
      {isLoading ? <p className="text-center text-brown-soft mt-10">Gathering your journal...</p> : readings.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--gold)_35%,transparent)] mt-8">
          <p className="font-script text-3xl text-gold-deep">The pages are blank</p>
          <p className="text-brown-soft mt-2">Cast your first reading to begin your journal.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-8">
          {readings.map((r) => {
            const spread = spreads.find((s) => s.id === r.spreadId);
            return (
              <div key={r.id} className="rounded-2xl bg-card border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <p className="uppercase text-xs tracking-[0.3em] text-gold-deep">{spread?.name ?? "Reading"} · {new Date(r.createdAt).toLocaleDateString()}</p>
                  <h3 className="font-display text-2xl text-brown mt-1">{r.title || r.question}</h3>
                  <p className="text-brown-soft text-sm mt-1 line-clamp-2">{r.interpretation}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link to="/readings/$id" params={{ id: String(r.id) }} className="rounded-full border border-brown/30 px-4 py-2 text-xs uppercase tracking-widest text-brown hover:bg-cream-deep">Open</Link>
                  <button onClick={() => { if (confirm("Delete this reading?")) del.mutate(r.id); }} className="rounded-full border border-destructive/40 px-4 py-2 text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}