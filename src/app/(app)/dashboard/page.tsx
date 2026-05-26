"use client";
import { useState } from "react";
import { Topbar } from "@/components/app/topbar";
import { motion, AnimatePresence } from "framer-motion";
import { ESGScoreRing } from "@/components/charts/esg-score-ring";
import { EmissionsAreaChart } from "@/components/charts/emissions-area-chart";
import { EnergyWaterChart } from "@/components/charts/energy-water-chart";
import { SupplyDamageChart } from "@/components/charts/supply-damage-chart";
import { GlobePolaroids } from "@/components/ui/globe-polaroids";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KPIs,
  facilityKPIs,
  cityRoutes,
  buildingStats,
  cafeteriaMonthly,
  cafeteriaMenu,
  unionDepts,
  unionSatisfactionTrend,
  unionEvents,
  facilityInsights,
} from "@/lib/mock-data";
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Info,
  Plane,
  Train,
  Truck,
  Building2,
  UtensilsCrossed,
  Package,
  Users,
  LayoutGrid,
  Zap,
  Droplets,
  Star,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
type DashTab = "overview" | "buildings" | "cafeteria" | "supplies" | "union";

const TOOLTIP_STYLE = {
  background: "rgba(8,10,16,0.92)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

function statusVariant(s: string) {
  return s === "On Time" ? "emerald" : s === "Delayed" ? "amber" : "rose";
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState<DashTab>("overview");
  return (
    <div>
      <Topbar
        title="Facility Operations Overview"
        subtitle="Buildings · Cafeteria · Office Supplies · Union — real-time intelligence"
      />
      <TabNav tab={tab} setTab={setTab} />
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "overview"   && <OverviewTab />}
          {tab === "buildings"  && <BuildingsTab />}
          {tab === "cafeteria"  && <CafeteriaTab />}
          {tab === "supplies"   && <SuppliesTab />}
          {tab === "union"      && <UnionTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Tab navigation ───────────────────────────────────────────────────────────
const TAB_DEFS = [
  { id: "overview",   label: "Overview",          Icon: LayoutGrid      },
  { id: "buildings",  label: "Buildings & Energy", Icon: Building2       },
  { id: "cafeteria",  label: "Cafeteria",          Icon: UtensilsCrossed },
  { id: "supplies",   label: "Office Supplies",    Icon: Package         },
  { id: "union",      label: "Union",              Icon: Users           },
] as const;

function TabNav({ tab, setTab }: { tab: DashTab; setTab: (t: DashTab) => void }) {
  return (
    <div className="mt-4 flex items-center gap-0.5 border-b border-edge overflow-x-auto">
      {TAB_DEFS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors",
            tab === id
              ? "border-data-teal text-content"
              : "border-transparent text-content-muted hover:text-content"
          )}
        >
          <Icon className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Shared components ────────────────────────────────────────────────────────
interface KPICardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend: string;
  trendUp?: boolean;
  barW?: string;
  delay?: number;
}

function KPICard({ label, value, prefix = "", suffix = "", decimals = 0, trend, trendUp = true, barW = "75%", delay = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="lg:col-span-3 rounded-xl border border-edge bg-surface-overlay p-4 hover:border-edge-strong transition-colors relative overflow-hidden"
    >
      <div className="text-[10px] uppercase tracking-wider text-content-subtle">{label}</div>
      <div className="mt-1 text-[1.75rem] font-semibold tabular-nums text-content leading-tight">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium", trendUp ? "text-data-emerald" : "text-data-rose")}>
        {trendUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
        {trend}
      </div>
      <div className="mt-3 h-1 rounded-full bg-surface overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: barW }}
          transition={{ duration: 1.3, delay }}
          className="h-full bar-esg"
        />
      </div>
    </motion.div>
  );
}

function SectionLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-content-subtle">{eyebrow}</div>
      <div className="text-sm font-semibold text-content">{title}</div>
    </div>
  );
}

function InsightsPanel({ insights }: { insights: typeof facilityInsights }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.16 }}
      className="lg:col-span-5 rounded-xl border border-edge bg-surface-overlay p-5 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 size-40 rounded-full bg-data-teal/[0.04] blur-3xl" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">AI</span>
          <SectionLabel eyebrow="Facility Copilot" title="Insights · last 24h" />
        </div>
        <Badge variant="teal"><Sparkles className="size-3" /> Live</Badge>
      </div>
      <div className="space-y-2.5">
        {insights.map((it, i) => {
          const Icon = it.tone === "warn" ? AlertTriangle : it.tone === "good" ? CheckCircle2 : Info;
          const color = it.tone === "warn" ? "text-data-amber" : it.tone === "good" ? "text-data-emerald" : "text-data-teal";
          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="rounded-lg border border-edge bg-surface p-3 hover:bg-surface-raised transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("size-4", color)} />
                <div className="text-sm font-medium text-content">{it.title}</div>
              </div>
              <p className="mt-1.5 text-[12px] text-content-muted leading-snug">{it.body}</p>
              <div className="mt-2.5 flex gap-3">
                <Button size="sm" variant="tonal">Apply</Button>
                <button className="text-[11px] text-content-subtle hover:text-content transition-colors">Dismiss</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* KPI row */}
      <KPICard label="kWh per Occupant"     value={facilityKPIs.kwhPerOccupant}    suffix=" kWh" decimals={2} trend="-2.1% vs. prev. month" trendUp={false} barW="43%" delay={0}    />
      <KPICard label="Water per Occupant"   value={facilityKPIs.waterPerOccupant}  suffix=" m³"  decimals={2} trend="-3.4% vs. prev. month" trendUp={false} barW="34%" delay={0.04} />
      <KPICard label="Union Members"        value={facilityKPIs.unionMembers}                                  trend="+1.8% vs. prev. quarter" trendUp={true} barW="72%" delay={0.08} />
      <KPICard label="Cafeteria Rating"     value={facilityKPIs.cafeteriaRating}   suffix="★"   decimals={1} trend="+0.2 pts vs. prev. month"  trendUp={true} barW="92%" delay={0.12} />

      {/* ESG Composite */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="lg:col-span-4 rounded-xl border border-edge bg-surface-overlay p-5 relative overflow-hidden"
      >
        <div className="absolute -right-16 -top-16 size-44 rounded-full bg-data-teal/[0.04] blur-3xl" />
        <div className="flex items-start justify-between">
          <SectionLabel eyebrow="ESG Composite" title="Group sustainability rating" />
          <Badge variant="emerald">AAA</Badge>
        </div>
        <div className="mt-2 grid place-items-center">
          <ESGScoreRing score={KPIs.esgScore} confidence={KPIs.esgConfidence} size={200} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[{ k: "Environmental", v: 88 }, { k: "Social", v: 84 }, { k: "Governance", v: 87 }].map((x) => (
            <div key={x.k} className="rounded-lg border border-edge bg-surface p-2">
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">{x.k}</div>
              <div className="text-sm font-semibold tabular-nums text-content"><AnimatedCounter value={x.v} /></div>
              <div className="mt-1 h-1 rounded-full bg-surface overflow-hidden">
                <motion.div className="h-full bar-esg" initial={{ width: 0 }} animate={{ width: `${x.v}%` }} transition={{ duration: 1.4 }} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Energy & Water chart */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 }}
        className="lg:col-span-8 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Energy & Water usage" title="kWh & m³ per occupant — last 12 months" />
          <div className="flex items-center gap-2">
            <Badge variant="teal"><Zap className="size-3" /> Energy</Badge>
            <Badge variant="amber"><Droplets className="size-3" /> Anomaly Jul</Badge>
          </div>
        </div>
        <EnergyWaterChart />
      </motion.section>

      {/* Supply damage histogram */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
        className="lg:col-span-5 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Office supplies" title="Damage rate by category" />
          <div className="flex items-center gap-3 text-[11px] text-content-muted">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-emerald" />Low</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-amber" />Med</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-rose" />High</span>
          </div>
        </div>
        <SupplyDamageChart />
      </motion.section>

      {/* City routes */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-7 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Logistics routes" title="Inter-city & within-city dispatches" />
        </div>
        <CityRoutesTable />
      </motion.section>

      {/* Office globe */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
        className="lg:col-span-7 rounded-xl border border-edge glass p-5 relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <SectionLabel eyebrow="Office network" title="Domestic locations · 58 offices" />
          <Badge variant="teal"><MapPin className="size-3" /> 10 cities</Badge>
        </div>
        <div className="grid place-items-center">
          <div className="hidden md:block"><GlobePolaroids className="w-[380px]" /></div>
          <div className="md:hidden"><GlobePolaroids className="w-[260px]" /></div>
        </div>
      </motion.section>

      <InsightsPanel insights={facilityInsights} />
    </div>
  );
}

function CityRoutesTable() {
  const interCity  = cityRoutes.filter((r) => r.scope === "inter-city");
  const intraCity  = cityRoutes.filter((r) => r.scope === "intra-city");
  const modeIcon   = (m: string) => m === "Air" ? Plane : m === "Rail" ? Train : Truck;

  const RouteRow = ({ r }: { r: (typeof cityRoutes)[0] }) => {
    const Icon = modeIcon(r.mode);
    return (
      <tr className="border-t border-edge hover:bg-surface transition-colors">
        <td className="px-2 py-2 flex items-center gap-1.5">
          <Icon className="size-3.5 text-content-muted shrink-0" />
          <span className="text-[12px] font-medium text-content">{r.from} → {r.to}</span>
        </td>
        <td className="px-2 py-2"><Badge variant={statusVariant(r.status) as any}>{r.status}</Badge></td>
        <td className="px-2 py-2 tabular-nums text-[12px] text-content-muted">{r.distanceKm} km</td>
        <td className="px-2 py-2 tabular-nums text-[12px] text-content-muted">{r.durationH}h</td>
        <td className="px-2 py-2 tabular-nums text-[12px] text-content-muted">{r.carbon} tCO₂e</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto -mx-2 space-y-3">
      <div>
        <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-content-subtle font-medium">Inter-city</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-content-subtle">
              <th className="px-2 py-1.5 font-medium">Route</th>
              <th className="px-2 py-1.5 font-medium">Status</th>
              <th className="px-2 py-1.5 font-medium">Distance</th>
              <th className="px-2 py-1.5 font-medium">Time</th>
              <th className="px-2 py-1.5 font-medium">Carbon</th>
            </tr>
          </thead>
          <tbody>{interCity.map((r) => <RouteRow key={r.id} r={r} />)}</tbody>
        </table>
      </div>
      <div>
        <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-content-subtle font-medium">Within-city</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-content-subtle">
              <th className="px-2 py-1.5 font-medium">Route</th>
              <th className="px-2 py-1.5 font-medium">Status</th>
              <th className="px-2 py-1.5 font-medium">Distance</th>
              <th className="px-2 py-1.5 font-medium">Time</th>
              <th className="px-2 py-1.5 font-medium">Carbon</th>
            </tr>
          </thead>
          <tbody>{intraCity.map((r) => <RouteRow key={r.id} r={r} />)}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Buildings & Energy tab ───────────────────────────────────────────────────
function BuildingsTab() {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <KPICard label="Buildings"          value={facilityKPIs.buildingCount}        suffix=""    trend="+2 new this year"         trendUp={true}  barW="58%" delay={0}    />
      <KPICard label="Occupancy Rate"     value={facilityKPIs.occupancyRate}         suffix="%"   trend="+3.1% vs. prev. quarter"  trendUp={true}  barW="87%" delay={0.04} />
      <KPICard label="Avg HVAC Efficiency"value={facilityKPIs.avgHVACEfficiency}     suffix="%"   decimals={1} trend="+1.2% this month"          trendUp={true}  barW="88%" delay={0.08} />
      <KPICard label="Total Offices"      value={facilityKPIs.totalOffices}          suffix=""    trend="+4 opened Q2"             trendUp={true}  barW="76%" delay={0.12} />

      {/* Building energy chart */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 }}
        className="lg:col-span-7 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Energy consumption" title="Daily kWh by building" />
          <Badge variant="teal"><Zap className="size-3" /> kWh/day</Badge>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer>
            <BarChart data={buildingStats} margin={{ top: 8, right: 8, left: -8, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 10, opacity: 0.5 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="energyKwh" radius={[4, 4, 0, 0]} animationDuration={1200}>
                {buildingStats.map((b) => (
                  <Cell key={b.name} fill={b.energyKwh > 2800 ? "#F59E0B" : "#14B8A6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Globe */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
        className="lg:col-span-5 rounded-xl border border-edge glass p-5"
      >
        <div className="flex items-center justify-between mb-2">
          <SectionLabel eyebrow="Office network" title="10 cities · 58 offices" />
        </div>
        <div className="grid place-items-center">
          <div className="hidden md:block"><GlobePolaroids className="w-[300px]" /></div>
          <div className="md:hidden"><GlobePolaroids className="w-[220px]" /></div>
        </div>
      </motion.section>

      {/* Building stats table */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
        className="lg:col-span-12 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Building inventory" title="Performance overview — all sites" />
        </div>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-content-subtle">
                <th className="px-2 py-2 font-medium">Building</th>
                <th className="px-2 py-2 font-medium">City</th>
                <th className="px-2 py-2 font-medium">Floors</th>
                <th className="px-2 py-2 font-medium">Occupancy</th>
                <th className="px-2 py-2 font-medium">Energy (kWh/day)</th>
                <th className="px-2 py-2 font-medium">HVAC Score</th>
                <th className="px-2 py-2 font-medium">Solar Coverage</th>
              </tr>
            </thead>
            <tbody>
              {buildingStats.map((b, i) => (
                <motion.tr key={b.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }} className="border-t border-edge hover:bg-surface transition-colors">
                  <td className="px-2 py-2.5 font-medium text-content">{b.name}</td>
                  <td className="px-2 py-2.5 text-content-muted">{b.city}</td>
                  <td className="px-2 py-2.5 text-content-muted">{b.floors}</td>
                  <td className="px-2 py-2.5"><Badge variant={b.occupancy >= 90 ? "emerald" : b.occupancy >= 80 ? "teal" : "amber"}>{b.occupancy}%</Badge></td>
                  <td className="px-2 py-2.5 tabular-nums text-content">{b.energyKwh.toLocaleString()}</td>
                  <td className="px-2 py-2.5"><Badge variant={b.hvacScore >= 90 ? "emerald" : b.hvacScore >= 85 ? "teal" : "amber"}>{b.hvacScore}%</Badge></td>
                  <td className="px-2 py-2.5 tabular-nums text-content-muted">{b.solarPct}%</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Carbon emissions history */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14 }}
        className="lg:col-span-12 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Carbon emissions" title="Scope 1 · 2 · 3 — last 12 months" />
          <div className="flex items-center gap-2">
            <Badge variant="teal">tCO₂e</Badge>
            <Badge variant="emerald">▼ 18.7% YoY</Badge>
          </div>
        </div>
        <EmissionsAreaChart />
      </motion.section>
    </div>
  );
}

// ─── Cafeteria tab ────────────────────────────────────────────────────────────
function CafeteriaTab() {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <KPICard label="Daily Meals Served"  value={facilityKPIs.dailyMeals}                          trend="+4.2% vs. prev. week"   trendUp={true}  barW="62%" delay={0}    />
      <KPICard label="Food Waste Rate"     value={facilityKPIs.foodWasteRate}      suffix="%"        decimals={1} trend="-0.8% vs. prev. month"  trendUp={false} barW="34%" delay={0.04} />
      <KPICard label="Satisfaction Rating" value={facilityKPIs.cafeteriaRating}    suffix="★"        decimals={1} trend="+0.2 pts vs. prev. month" trendUp={true}  barW="92%" delay={0.08} />
      <KPICard label="Avg Cost / Meal"     value={28.4}                            prefix="¥"        decimals={1} trend="-1.8% vs. prev. month"  trendUp={false} barW="57%" delay={0.12} />

      {/* Monthly meals + satisfaction */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 }}
        className="lg:col-span-8 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Cafeteria performance" title="Monthly meals served & satisfaction score" />
          <Badge variant="emerald"><Star className="size-3" /> Avg 4.6★</Badge>
        </div>
        <div className="h-[260px]">
          <ResponsiveContainer>
            <ComposedChart data={cafeteriaMonthly} margin={{ top: 8, right: 28, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <YAxis yAxisId="right" orientation="right" domain={[4, 5]} tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} tickFormatter={(v) => `${v}★`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, opacity: 0.6 }} />
              <Bar yAxisId="left" dataKey="meals" fill="#14B8A6" opacity={0.6} radius={[3, 3, 0, 0]} animationDuration={1200} name="Meals Served" />
              <Line yAxisId="right" type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3, fill: "#F59E0B" }} animationDuration={1400} name="Rating" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Menu categories */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
        className="lg:col-span-4 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="mb-3">
          <SectionLabel eyebrow="Today's menu" title="Category breakdown" />
        </div>
        <div className="space-y-2">
          {cafeteriaMenu.map((m) => (
            <div key={m.category} className="rounded-lg border border-edge bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-content">{m.category}</div>
                <div className="flex items-center gap-1.5">
                  {m.vegan && <Badge variant="emerald">Vegan</Badge>}
                  <Badge variant="teal">{m.items} items</Badge>
                </div>
              </div>
              <div className="mt-1 text-[11px] text-content-muted">Avg {m.avgCal} kcal/serving</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Food waste trend */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
        className="lg:col-span-12 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Food waste" title="Monthly waste (kg) — reduction trend" />
          <Badge variant="emerald">▼ 22.8% YoY</Badge>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer>
            <BarChart data={cafeteriaMonthly} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v.toLocaleString()} kg`, "Waste"]} />
              <Bar dataKey="wasteKg" fill="url(#wasteGrad)" radius={[4, 4, 0, 0]} animationDuration={1200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>
    </div>
  );
}

// ─── Office Supplies tab ──────────────────────────────────────────────────────
function SuppliesTab() {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <KPICard label="Supply Damage Rate"   value={facilityKPIs.supplyDamageRate}  suffix="%" decimals={1} trend="+2.1% vs. prev. quarter" trendUp={false} barW="31%" delay={0}    />
      <KPICard label="Monthly Spend"        value={facilityKPIs.monthlySupplySpend / 1000} prefix="¥" suffix="k" decimals={1} trend="-4.3% vs. budget" trendUp={false} barW="61%" delay={0.04} />
      <KPICard label="Total Tracked Items"  value={9074}                                               trend="+184 items added this month" trendUp={true}  barW="74%" delay={0.08} />
      <KPICard label="Replacements (MTD)"   value={286}                                                trend="+18 vs. prev. month"         trendUp={false} barW="29%" delay={0.12} />

      {/* Damage histogram */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 }}
        className="lg:col-span-7 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Office supplies" title="Damage rate by item category" />
          <div className="flex items-center gap-3 text-[11px] text-content-muted">
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-emerald" />&lt;15%</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-amber" />15–25%</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-data-rose" />&gt;25%</span>
          </div>
        </div>
        <SupplyDamageChart />
      </motion.section>

      {/* Top damaged items info */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
        className="lg:col-span-5 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="mb-3">
          <SectionLabel eyebrow="Action required" title="High-damage items" />
        </div>
        <div className="space-y-2">
          {[
            { item: "Printers",  rate: 31.8, action: "Schedule maintenance", urgency: "rose" },
            { item: "Mice",      rate: 25.3, action: "Bulk replacement order", urgency: "rose" },
            { item: "Keyboards", rate: 22.7, action: "Review usage policy", urgency: "amber" },
          ].map((x) => (
            <div key={x.item} className="rounded-lg border border-edge bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-content">{x.item}</div>
                <Badge variant={x.urgency as any}>{x.rate}% damage</Badge>
              </div>
              <div className="mt-1 text-[11px] text-content-muted">{x.action}</div>
              <div className="mt-2.5 flex gap-2">
                <Button size="sm" variant="tonal">Raise Ticket</Button>
                <button className="text-[11px] text-content-subtle hover:text-content transition-colors">Defer</button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Procurement status table */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
        className="lg:col-span-12 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Procurement" title="Current stock & reorder status" />
        </div>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-content-subtle">
                <th className="px-2 py-2 font-medium">Item</th>
                <th className="px-2 py-2 font-medium">Total Units</th>
                <th className="px-2 py-2 font-medium">Damage Rate</th>
                <th className="px-2 py-2 font-medium">Est. Damaged</th>
                <th className="px-2 py-2 font-medium">Reorder Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { supply: "Printers",    damageRate: 31.8, total: 214  },
                { supply: "Mice",        damageRate: 25.3, total: 1860 },
                { supply: "Keyboards",   damageRate: 22.7, total: 1840 },
                { supply: "Desk Chairs", damageRate: 18.4, total: 2480 },
                { supply: "Headsets",    damageRate: 14.6, total: 920  },
                { supply: "Whiteboards", damageRate: 9.4,  total: 380  },
                { supply: "Monitors",    damageRate: 8.2,  total: 1620 },
                { supply: "Laptops",     damageRate: 6.1,  total: 1580 },
              ].map((s, i) => (
                <motion.tr key={s.supply} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }} className="border-t border-edge hover:bg-surface transition-colors">
                  <td className="px-2 py-2.5 font-medium text-content">{s.supply}</td>
                  <td className="px-2 py-2.5 tabular-nums text-content-muted">{s.total.toLocaleString()}</td>
                  <td className="px-2 py-2.5"><Badge variant={s.damageRate >= 25 ? "rose" : s.damageRate >= 15 ? "amber" : "emerald"}>{s.damageRate}%</Badge></td>
                  <td className="px-2 py-2.5 tabular-nums text-content-muted">{Math.round(s.total * s.damageRate / 100)}</td>
                  <td className="px-2 py-2.5"><Badge variant={s.damageRate >= 25 ? "rose" : s.damageRate >= 15 ? "amber" : "teal"}>{s.damageRate >= 25 ? "Urgent" : s.damageRate >= 15 ? "Soon" : "Adequate"}</Badge></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </div>
  );
}

// ─── Union tab ────────────────────────────────────────────────────────────────
function UnionTab() {
  return (
    <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
      <KPICard label="Union Members"       value={facilityKPIs.unionMembers}       suffix=""    trend="+52 members this quarter" trendUp={true}  barW="72%" delay={0}    />
      <KPICard label="Membership Rate"     value={facilityKPIs.membershipRate}     suffix="%"   decimals={1} trend="+1.4% vs. last year" trendUp={true}  barW="91%" delay={0.04} />
      <KPICard label="Satisfaction Score"  value={facilityKPIs.unionSatisfaction}  suffix="★"   decimals={1} trend="+0.3 pts this year"  trendUp={true}  barW="88%" delay={0.08} />
      <KPICard label="Events This Month"   value={3}                               suffix=""    trend="+1 vs. prev. month"      trendUp={true}  barW="60%" delay={0.12} />

      {/* Satisfaction trend */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 }}
        className="lg:col-span-8 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Member satisfaction" title="12-month trend — satisfaction score" />
          <Badge variant="emerald"><Star className="size-3" /> 4.4 avg</Badge>
        </div>
        <div className="h-[240px]">
          <ResponsiveContainer>
            <LineChart data={unionSatisfactionTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} />
              <YAxis domain={[3.8, 5]} tickLine={false} axisLine={false} tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }} tickFormatter={(v) => `${v}★`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${v}★`, "Score"]} />
              <Line type="monotone" dataKey="score" stroke="#14B8A6" strokeWidth={2} dot={{ r: 3, fill: "#14B8A6" }} activeDot={{ r: 5 }} animationDuration={1200} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Dept breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
        className="lg:col-span-4 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="mb-3">
          <SectionLabel eyebrow="By department" title="Members & satisfaction" />
        </div>
        <div className="space-y-2">
          {unionDepts.map((d) => (
            <div key={d.dept} className="flex items-center gap-3">
              <div className="w-20 text-[11px] text-content-muted truncate shrink-0">{d.dept}</div>
              <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
                <motion.div
                  className="h-full bg-data-teal"
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.members / 734) * 100}%` }}
                  transition={{ duration: 1.2 }}
                />
              </div>
              <div className="text-[11px] tabular-nums text-content-muted w-10 text-right">{d.members}</div>
              <Badge variant={d.satisfaction >= 4.7 ? "emerald" : d.satisfaction >= 4.4 ? "teal" : "amber"} >{d.satisfaction}★</Badge>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming events */}
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
        className="lg:col-span-12 rounded-xl border border-edge bg-surface-overlay p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <SectionLabel eyebrow="Union calendar" title="Upcoming events" />
          <Badge variant="teal"><CalendarDays className="size-3" /> 5 events</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {unionEvents.map((ev, i) => {
            const typeColor: Record<string, "teal" | "emerald" | "amber" | "rose"> = {
              Assembly: "teal", Activity: "emerald", Wellness: "teal", Legal: "amber", Training: "emerald",
            };
            return (
              <motion.div key={ev.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }} className="rounded-lg border border-edge bg-surface p-3 hover:bg-surface-raised transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-content leading-snug">{ev.title}</div>
                  <Badge variant={typeColor[ev.type] ?? "teal"}>{ev.type}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-content-muted">
                  <span className="flex items-center gap-1"><CalendarDays className="size-3" />{ev.date}</span>
                  <span className="flex items-center gap-1"><Users className="size-3" />{ev.attendees.toLocaleString()}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}