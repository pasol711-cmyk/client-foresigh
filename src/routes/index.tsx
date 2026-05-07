import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { opportunities } from "@/lib/mock-data";
import { OpportunityCard } from "@/components/OpportunityCard";
import { VoiceButton } from "@/components/VoiceButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sales AI — Рекомендации продаж" },
      { name: "description", content: "Интеллектуальный помощник менеджера по продажам" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [search, setSearch] = useState("");

  const handleVoice = useCallback((transcript: string) => {
    setSearch(transcript);
  }, []);

  const filtered = opportunities.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.company.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.industry.toLowerCase().includes(q)
    );
  });

  const totalRevenue = filtered.reduce((s, o) => s + o.estimatedRevenue, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight">Sales AI</h1>
            <p className="text-[11px] text-muted-foreground">{filtered.length} возможностей · {(totalRevenue / 1_000_000).toFixed(1)} млн ₽</p>
          </div>
          <VoiceButton onTranscript={handleVoice} />
        </div>

        {/* Search */}
        <div className="mt-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по компании, продукту..."
            className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </header>

      {/* Cards */}
      <main className="p-4 space-y-3">
        {filtered.map((opp) => (
          <OpportunityCard key={opp.id} opp={opp} />
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">Ничего не найдено</p>
        )}
      </main>
    </div>
  );
}
