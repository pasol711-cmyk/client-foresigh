import { Link } from "@tanstack/react-router";
import type { Opportunity } from "@/lib/mock-data";
import { InsightBadge } from "./InsightBadge";

function formatRevenue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} млн ₽`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} тыс ₽`;
  return `${value} ₽`;
}

export function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <Link
      to="/opportunity/$id"
      params={{ id: opp.id }}
      className="block rounded-lg border border-border bg-card p-4 transition-colors active:bg-secondary"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-card-foreground">{opp.company}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{opp.industry} · {opp.segment === "enterprise" ? "Крупный" : "Средний"}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-bold text-revenue">{formatRevenue(opp.estimatedRevenue)}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{opp.probability}% вер.</p>
        </div>
      </div>

      <div className="mt-3 rounded bg-secondary/50 px-3 py-2">
        <p className="text-xs font-medium text-card-foreground">{opp.product}</p>
      </div>

      <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {opp.insightSummary}
      </p>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {opp.insights.map((ins, i) => (
          <InsightBadge key={i} type={ins.type} />
        ))}
      </div>
    </Link>
  );
}
