import type { InsightType } from "@/lib/mock-data";

const config: Record<InsightType, { label: string; className: string }> = {
  market: { label: "Рынок", className: "bg-insight-market/15 text-insight-market" },
  crm: { label: "CRM", className: "bg-insight-crm/15 text-insight-crm" },
  usage: { label: "Потребление", className: "bg-insight-usage/15 text-insight-usage" },
};

export function InsightBadge({ type }: { type: InsightType }) {
  const c = config[type];
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase ${c.className}`}>
      {c.label}
    </span>
  );
}
