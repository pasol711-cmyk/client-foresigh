import { createFileRoute, Link } from "@tanstack/react-router";
import { opportunities } from "@/lib/mock-data";
import { InsightBadge } from "@/components/InsightBadge";

export const Route = createFileRoute("/opportunity/$id")({
  head: () => ({
    meta: [
      { title: "Детали клиента — Sales AI" },
      { name: "description", content: "Подробная информация о клиенте и рекомендации" },
    ],
  }),
  component: OpportunityDetailPage,
});

function formatRevenue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} млн ₽`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} тыс ₽`;
  return `${value} ₽`;
}

function OpportunityDetailPage() {
  const { id } = Route.useParams();
  const opp = opportunities.find((o) => o.id === id);

  if (!opp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Возможность не найдена</p>
          <Link to="/" className="mt-4 inline-block text-sm text-primary underline">Назад</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-foreground">{opp.company}</h1>
            <p className="text-[11px] text-muted-foreground">{opp.industry} · {opp.location}</p>
          </div>
        </div>
      </header>

      <main className="px-4 space-y-5 mt-4">
        {/* Company Info */}
        <Section title="О компании">
          <p className="text-xs leading-relaxed text-muted-foreground">{opp.companyDescription}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <InfoCell label="Сотрудники" value={opp.employeeCount.toLocaleString("ru")} />
            <InfoCell label="Выручка" value={opp.annualRevenue} />
            <InfoCell label="Сегмент" value={opp.segment === "enterprise" ? "Крупный" : "Средний"} />
          </div>
        </Section>

        {/* Recommended Product */}
        <Section title="Рекомендуемый продукт">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
            <p className="text-sm font-semibold text-foreground">{opp.product}</p>
            <div className="mt-2 flex items-baseline gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Выручка</p>
                <p className="text-lg font-bold text-revenue">{formatRevenue(opp.estimatedRevenue)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Вероятность</p>
                <p className="text-lg font-bold text-foreground">{opp.probability}%</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Contacts */}
        <Section title="Контактные лица">
          <div className="space-y-2">
            {opp.contacts.map((c, i) => (
              <div key={i} className="rounded-md bg-secondary p-3">
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{c.role}</p>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-primary">
                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Past Products */}
        <Section title="История продуктов">
          <div className="space-y-1.5">
            {opp.pastProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between rounded-md bg-secondary px-3 py-2.5">
                <div>
                  <p className="text-sm text-foreground">{p.name}</p>
                  <p className="text-[10px] text-muted-foreground">{p.purchaseDate}</p>
                </div>
                <div className="text-right">
                  {p.status === "active" && (
                    <p className="text-xs font-medium text-revenue">{formatRevenue(p.annualRevenue)}/год</p>
                  )}
                  <StatusLabel status={p.status} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Insights */}
        <Section title="Инсайты">
          <div className="space-y-3">
            {opp.insights.map((ins, i) => (
              <div key={i} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{ins.title}</p>
                  <InsightBadge type={ins.type} />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{ins.detail}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{ins.source}</span>
                  <span>{ins.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-secondary px-2 py-2 text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-foreground">{value}</p>
    </div>
  );
}

function StatusLabel({ status }: { status: "active" | "declined" | "expired" }) {
  const styles = {
    active: "text-revenue",
    declined: "text-destructive",
    expired: "text-muted-foreground",
  };
  const labels = { active: "Активен", declined: "Отказ", expired: "Истёк" };
  return <p className={`text-[10px] font-medium ${styles[status]}`}>{labels[status]}</p>;
}
