"use client";
import { Topbar } from "@/components/app/topbar";
import { motion } from "framer-motion";
import { ESGScoreRing } from "@/components/charts/esg-score-ring";
import { EmissionsAreaChart } from "@/components/charts/emissions-area-chart";
import { RatingDistributionChart } from "@/components/charts/rating-distribution";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPIs, suppliers, aiInsights, routes } from "@/lib/mock-data";
import {
  ArrowUpRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  Plane,
  Ship,
  Train,
  Truck,
  ChevronRight,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { AnimatedGlobe } from "@/components/visuals/animated-globe";

export default function DashboardPage() {
  return (
    <div>
      <Topbar
        title="ESG Operations Overview"
        subtitle="Real-time sustainability intelligence across your global supply chain"
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <KPIGrid />

        {/* ESG Score */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 rounded-xl border border-edge bg-surface-overlay p-5 relative overflow-hidden"
        >
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-data-teal/[0.04] blur-3xl" />
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                ESG Composite
              </div>
              <div className="text-sm font-semibold text-content">
                Group sustainability rating
              </div>
            </div>
            <Badge variant="emerald">AAA</Badge>
          </div>
          <div className="mt-2 grid place-items-center">
            <ESGScoreRing
              score={KPIs.esgScore}
              confidence={KPIs.esgConfidence}
              size={200}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { k: "Environmental", v: 88 },
              { k: "Social", v: 84 },
              { k: "Governance", v: 87 },
            ].map((x) => (
              <div
                key={x.k}
                className="rounded-lg border border-edge bg-surface p-2"
              >
                <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                  {x.k}
                </div>
                <div className="text-sm font-semibold tabular-nums text-content">
                  <AnimatedCounter value={x.v} />
                </div>
                <div className="mt-1 h-1 rounded-full bg-surface overflow-hidden">
                  <motion.div
                    className="h-full bar-esg"
                    initial={{ width: 0 }}
                    animate={{ width: `${x.v}%` }}
                    transition={{ duration: 1.4 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Emissions */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04 }}
          className="lg:col-span-8 rounded-xl border border-edge bg-surface-overlay p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                Carbon emissions
              </div>
              <div className="text-sm font-semibold text-content">
                Scope 1 · 2 · 3 — last 12 months
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="teal">tCO₂e</Badge>
              <Badge variant="emerald">▼ 18.7% YoY</Badge>
            </div>
          </div>
          <EmissionsAreaChart />
        </motion.section>

        {/* Rating distribution */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="lg:col-span-5 rounded-xl border border-edge bg-surface-overlay p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                Supplier ESG ratings
              </div>
              <div className="text-sm font-semibold text-content">
                Distribution across 1,284 active suppliers
              </div>
            </div>
          </div>
          <RatingDistributionChart />
          <div className="mt-3 flex items-center gap-4 text-[11px] text-content-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-data-emerald" /> Pass rate
              86%
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-data-amber" /> Watchlist
              22
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-data-rose" /> Non-compliant
              4
            </span>
          </div>
        </motion.section>

        {/* Top emitters */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 rounded-xl border border-edge bg-surface-overlay p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                Top suppliers by carbon footprint
              </div>
              <div className="text-sm font-semibold text-content">
                Q2 2026 · ranked by tCO₂e
              </div>
            </div>
            <a
              className="text-xs text-content-muted hover:text-content flex items-center gap-1 transition-colors"
              href="/tenders"
            >
              View all <ChevronRight className="size-3" />
            </a>
          </div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-content-subtle">
                  <th className="px-2 py-2 font-medium">Supplier</th>
                  <th className="px-2 py-2 font-medium">Country</th>
                  <th className="px-2 py-2 font-medium">ESG</th>
                  <th className="px-2 py-2 font-medium">Carbon (tCO₂e)</th>
                  <th className="px-2 py-2 font-medium">Risk</th>
                  <th className="px-2 py-2 text-right font-medium">Spend</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.slice(0, 6).map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="border-t border-edge hover:bg-surface transition-colors"
                  >
                    <td className="px-2 py-2.5">
                      <div className="font-medium text-content">{s.name}</div>
                      <div className="text-[11px] text-content-subtle">
                        {s.id} · {s.industry}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-content-muted">
                      {s.country}
                    </td>
                    <td className="px-2 py-2.5">
                      <Badge
                        variant={
                          s.esgScore >= 85
                            ? "emerald"
                            : s.esgScore >= 75
                            ? "teal"
                            : s.esgScore >= 65
                            ? "amber"
                            : "rose"
                        }
                      >
                        {s.rating} · {s.esgScore}
                      </Badge>
                    </td>
                    <td className="px-2 py-2.5 tabular-nums text-content">
                      {s.carbon.toLocaleString()}
                    </td>
                    <td className="px-2 py-2.5">
                      <Badge
                        variant={
                          s.risk === "Low"
                            ? "emerald"
                            : s.risk === "Medium"
                            ? "amber"
                            : "rose"
                        }
                      >
                        {s.risk}
                      </Badge>
                    </td>
                    <td className="px-2 py-2.5 text-right tabular-nums text-content-muted">
                      {formatCurrency(s.spendUSD)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Globe */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="lg:col-span-7 rounded-xl border border-edge glass p-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                Global supply chain
              </div>
              <div className="text-sm font-semibold text-content">
                Live trade flows · 412 ports
              </div>
            </div>
            <Badge variant="teal">Real-time</Badge>
          </div>
          <div className="grid place-items-center">
            <div className="hidden md:block">
              <AnimatedGlobe size={400} />
            </div>
            <div className="md:hidden">
              <AnimatedGlobe size={260} />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {routes.slice(0, 4).map((r) => {
              const Icon =
                r.mode === "Sea"
                  ? Ship
                  : r.mode === "Air"
                  ? Plane
                  : r.mode === "Rail"
                  ? Train
                  : Truck;
              return (
                <div
                  key={r.id}
                  className="rounded-lg border border-edge bg-surface-overlay p-3"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-3.5 text-content-muted" />
                    <Badge
                      variant={
                        r.status === "On Time"
                          ? "emerald"
                          : r.status === "Delayed"
                          ? "amber"
                          : "rose"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                  <div className="mt-1 text-[12px] font-medium text-content truncate">
                    {r.from} → {r.to}
                  </div>
                  <div className="text-[10px] text-content-subtle">
                    {r.days}d · {r.carbon} tCO₂e
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* AI Insights */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="lg:col-span-5 rounded-xl border border-edge bg-surface-overlay p-5 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-data-teal/[0.04] blur-3xl" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">
                AI
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                  Sustainability Copilot
                </div>
                <div className="text-sm font-semibold text-content">
                  Insights · last 24h
                </div>
              </div>
            </div>
            <Badge variant="teal">
              <Sparkles className="size-3" /> Live
            </Badge>
          </div>
          <div className="space-y-2.5">
            {aiInsights.map((it, i) => {
              const Icon =
                it.tone === "warn"
                  ? AlertTriangle
                  : it.tone === "good"
                  ? CheckCircle2
                  : Info;
              const color =
                it.tone === "warn"
                  ? "text-data-amber"
                  : it.tone === "good"
                  ? "text-data-emerald"
                  : "text-data-teal";
              return (
                <motion.div
                  key={it.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="rounded-lg border border-edge bg-surface p-3 hover:bg-surface-raised transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`size-4 ${color}`} />
                    <div className="text-sm font-medium text-content">
                      {it.title}
                    </div>
                  </div>
                  <p className="mt-1.5 text-[12px] text-content-muted leading-snug">
                    {it.body}
                  </p>
                  <div className="mt-2.5 flex gap-3">
                    <Button size="sm" variant="tonal">
                      Apply
                    </Button>
                    <button className="text-[11px] text-content-subtle hover:text-content transition-colors">
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

function KPIGrid() {
  const items = [
    {
      k: "Net-Zero progress",
      v: KPIs.netZeroProgress,
      suffix: "%",
      trend: 4.2,
      barW: "62%",
    },
    {
      k: "Carbon reduction YoY",
      v: KPIs.carbonReduction,
      suffix: "%",
      decimals: 1,
      trend: 2.3,
      barW: "82%",
    },
    {
      k: "Active tenders",
      v: KPIs.activeTenders,
      suffix: "",
      trend: 6,
      barW: "74%",
    },
    {
      k: "Green finance issued",
      v: 2.84,
      prefix: "$",
      suffix: "B",
      decimals: 2,
      trend: 12.1,
      barW: "90%",
    },
  ];
  return (
    <>
      {items.map((it, i) => (
        <motion.div
          key={it.k}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i }}
          className="lg:col-span-3 rounded-xl border border-edge bg-surface-overlay p-4 hover:border-edge-strong transition-colors relative overflow-hidden"
        >
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">
            {it.k}
          </div>
          <div className="mt-1 text-[1.75rem] font-semibold tabular-nums text-content leading-tight">
            <AnimatedCounter
              value={it.v as number}
              prefix={(it as any).prefix || ""}
              suffix={it.suffix}
              decimals={(it as any).decimals ?? 0}
            />
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs text-data-emerald font-medium">
            <ArrowUpRight className="size-3" />
            {it.trend}% vs. prev. period
          </div>
          <div className="mt-3 h-1 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: it.barW }}
              transition={{ duration: 1.3, delay: 0.04 * i }}
              className="h-full bar-esg"
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}