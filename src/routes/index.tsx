import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

function formatRevenueSpeech(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} миллионов рублей`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} тысяч рублей`;
  return `${value} рублей`;
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ru-RU";
  utter.rate = 1.05;
  window.speechSynthesis.speak(utter);
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^а-яёa-z0-9 ]/gi, "").trim();
}

function DashboardPage() {
  const [search, setSearch] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = opportunities.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.company.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.industry.toLowerCase().includes(q)
    );
  });

  const handleVoice = useCallback(
    (transcript: string) => {
      const raw = transcript.trim();
      const cmd = raw.toLowerCase();
      setHint(`«${raw}»`);

      // Команда: перейти к <название>
      const goMatch = cmd.match(/^(?:перейти к|открыть|открой|перейди к|зайти к)\s+(.+)$/);
      if (goMatch) {
        const target = normalize(goMatch[1]);
        const found = opportunities.find((o) => {
          const n = normalize(o.company);
          return n.includes(target) || target.includes(n);
        });
        if (found) {
          speak(`Открываю ${found.company}`);
          navigate({ to: "/opportunity/$id", params: { id: found.id } });
        } else {
          speak(`Организация ${goMatch[1]} не найдена`);
        }
        return;
      }

      // Команда: прочитай / читай
      if (/^(прочитай|прочти|читай|зачитай)/.test(cmd)) {
        const list = filtered.length ? filtered : opportunities;
        const text =
          `Найдено ${list.length} возможностей. ` +
          list
            .map(
              (o, i) =>
                `${i + 1}. ${o.company}, ${o.industry}. Продукт: ${o.product}. ` +
                `Оценка выручки: ${formatRevenueSpeech(o.estimatedRevenue)}, вероятность ${o.probability} процентов. ` +
                `${o.insightSummary}`,
            )
            .join(" ");
        speak(text);
        return;
      }

      // Команда: стоп / остановить чтение
      if (/^(стоп|остановить|тишина)/.test(cmd)) {
        if (typeof window !== "undefined") window.speechSynthesis?.cancel();
        return;
      }

      // Команда: сброс / очистить
      if (/^(сброс|очистить|очисти)/.test(cmd)) {
        setSearch("");
        return;
      }

      // По умолчанию — поиск
      setSearch(raw);
    },
    [filtered, navigate],
  );

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
            placeholder="Поиск или скажите: «прочитай», «перейти к ...»"
            className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {hint && (
            <p className="mt-1.5 text-[10px] text-muted-foreground">Распознано: {hint}</p>
          )}
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
