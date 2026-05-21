"use client";
import { Topbar } from "@/components/app/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, Leaf, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const products = [
  {
    name: "HSBC Green Trade Loan",
    tag: "ESG-linked",
    rate: "SOFR + 1.20%",
    cap: "$250M",
    desc: "Working capital tied to verified carbon intensity reductions.",
    perks: ["−25 bps for AA suppliers", "−45 bps for AAA suppliers", "TCFD-aligned reporting"]
  },
  {
    name: "Sustainability-Linked Revolver",
    tag: "Multi-currency",
    rate: "Base + 0.95%",
    cap: "$1.2B",
    desc: "Pricing ratchet linked to Scope 1·2 emission KPIs.",
    perks: ["Annual KPI verification", "Step-down on Net-Zero milestones"]
  },
  {
    name: "Carbon Credit Forwards",
    tag: "Hedging",
    rate: "Market",
    cap: "Unlimited",
    desc: "Hedge future Scope 3 exposure with verified carbon offsets.",
    perks: ["VCS · Gold Standard credits", "Auto-rebalancing portfolio"]
  }
];

const eligibility = [
  { month: "Jan", v: 62 },
  { month: "Feb", v: 65 },
  { month: "Mar", v: 68 },
  { month: "Apr", v: 70 },
  { month: "May", v: 74 },
  { month: "Jun", v: 78 },
  { month: "Jul", v: 81 },
  { month: "Aug", v: 84 },
  { month: "Sep", v: 86 },
  { month: "Oct", v: 88 },
  { month: "Nov", v: 90 },
  { month: "Dec", v: 92 }
];

export default function FinancingPage() {
  return (
    <div>
      <Topbar title="ESG Financing" subtitle="HSBC sustainable finance products powered by AI eligibility" />

      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border bg-brand-gradient text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30"
               style={{ backgroundImage: "radial-gradient(60% 80% at 20% 10%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(50% 60% at 80% 80%, rgba(255,255,255,0.2), transparent 60%)" }} />
          <div className="relative">
            <Badge className="bg-white/15 text-white border-white/20">Pre-qualified</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">$420M green facility available</h2>
            <p className="mt-2 text-white/80 max-w-xl text-sm">
              Based on your ESG composite score of 86.4 and improving carbon trajectory, you qualify for HSBC's premium green-loan tier.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4 max-w-md">
              <Big label="Indicative APR" value="4.32%" />
              <Big label="Tenor" value="5 yr" />
              <Big label="Rate saving" value="−45 bps" />
            </div>
            <div className="mt-5 flex gap-2">
              <Button className="bg-white text-brand-red hover:bg-white/90">Apply now <ArrowRight className="size-4" /></Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Download term sheet</Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5">
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">Eligibility trajectory</div>
          <div className="text-sm font-semibold">AI-projected qualification score</div>
          <div className="h-[180px] mt-3">
            <ResponsiveContainer>
              <LineChart data={eligibility}>
                <defs>
                  <linearGradient id="lg" x1="0" x2="1">
                    <stop offset="0%" stopColor="#0AD1C8" />
                    <stop offset="100%" stopColor="#00C281" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(127,127,127,0.15)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 10, opacity: 0.6 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, opacity: 0.6 }} />
                <Tooltip contentStyle={{ background: "rgba(10,12,16,0.85)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "white", fontSize: 12 }} />
                <Line type="monotone" dataKey="v" stroke="url(#lg)" strokeWidth={2.5} dot={false} animationDuration={1400} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-content-subtle">Current</span>
            <span className="font-semibold tabular-nums">92 / 100</span>
          </div>
        </div>

        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5 relative overflow-hidden hover:shadow-glow transition"
          >
            <div className="absolute -right-12 -top-12 size-36 rounded-full bg-data-teal/10 blur-3xl" />
            <div className="flex items-center justify-between">
              <Badge variant="teal">{p.tag}</Badge>
              <Banknote className="size-4 text-content-muted" />
            </div>
            <div className="mt-3 text-base font-semibold">{p.name}</div>
            <p className="mt-1 text-xs text-content-muted">{p.desc}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border bg-surface p-2">
                <div className="text-[10px] text-content-subtle">Pricing</div>
                <div className="text-sm font-medium">{p.rate}</div>
              </div>
              <div className="rounded-lg border bg-surface p-2">
                <div className="text-[10px] text-content-subtle">Facility cap</div>
                <div className="text-sm font-medium">{p.cap}</div>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {p.perks.map((x) => (
                <li key={x} className="text-xs text-content-muted flex items-center gap-1.5">
                  <Leaf className="size-3 text-data-emerald" /> {x}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-3 w-full">View details</Button>
          </motion.div>
        ))}

        <div className="lg:col-span-12 rounded-2xl border bg-surface-overlay p-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">AI</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-content-subtle">AI Recommendation Engine</div>
                <div className="text-sm font-semibold">Suggested capital stack</div>
              </div>
            </div>
            <Badge variant="emerald"><Sparkles className="size-3" /> Optimal</Badge>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { k: "Green Trade Loan", v: 250, c: "bg-data-emerald" },
              { k: "Sustainability Revolver", v: 120, c: "bg-data-teal" },
              { k: "Carbon Forwards", v: 50, c: "bg-brand-red" }
            ].map((x) => (
              <div key={x.k} className="rounded-xl border bg-surface p-3">
                <div className="text-[11px] text-content-subtle">{x.k}</div>
                <div className="mt-1 text-xl font-semibold tabular-nums">
                  <AnimatedCounter value={x.v} prefix="$" suffix="M" />
                </div>
                <div className="mt-2 h-1 rounded-full bg-surface-raised overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${x.v / 4}%` }} transition={{ duration: 1.4 }} className={`h-full ${x.c}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Big({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
