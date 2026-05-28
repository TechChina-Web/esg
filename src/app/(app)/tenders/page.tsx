  "use client";
import * as React from "react";
import { Topbar } from "@/components/app/topbar";
import { tenders, suppliers } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Search, Filter, ChevronRight, Calendar, Globe2, Plus, FileText, Sparkles, Zap, ChevronDown } from "lucide-react";
import Link from "next/link";

const TABS = ["All", "Open", "Evaluating", "Awarded", "Closed"] as const;

export default function TendersPage() {
  const [tab, setTab] = React.useState<(typeof TABS)[number]>("All");
  const [q, setQ] = React.useState("");
  const filtered = tenders.filter(
    (t) => (tab === "All" || t.status === tab) && (t.title.toLowerCase().includes(q.toLowerCase()) || t.reference.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <Topbar title="Tenders & Procurement" subtitle="ESG-gated bid management with AI-driven evaluation" />

      <div className="mt-6 flex flex-col lg:flex-row gap-3 items-start lg:items-center">
        <div className="flex flex-1 items-center gap-2 h-11 px-3 rounded-xl border bg-surface-overlay w-full lg:max-w-md">
          <Search className="size-4 text-content-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tenders, references, categories…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative h-9 px-3.5 text-sm rounded-full border transition ${
                tab === t ? "text-content" : "text-content-muted hover:text-content"
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="tender-tab"
                  className="absolute inset-0 rounded-full bg-surface-raised ring-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
          <Button variant="outline" size="md" className="gap-1.5">
            <Filter className="size-4" /> Filters
          </Button>
          <Button variant="primary" size="md" className="gap-1.5">
            <Plus className="size-4" /> New tender
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { k: "Total budget", v: formatCurrency(tenders.reduce((a, t) => a + t.budgetUSD, 0)) },
          { k: "Active tenders", v: tenders.filter((t) => t.status !== "Closed" && t.status !== "Awarded").length },
          { k: "Avg. ESG requirement", v: "AA" },
          { k: "Suppliers in pipeline", v: tenders.reduce((a, t) => a + t.suppliers, 0) }
        ].map((x) => (
          <div key={x.k} className="rounded-2xl border bg-surface-overlay p-4">
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">{x.k}</div>
            <div className="text-xl font-semibold tabular-nums mt-1">{x.v as React.ReactNode}</div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="mt-5 rounded-2xl border bg-surface-overlay overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 text-[10px] uppercase tracking-wider text-content-subtle border-b">
          <div className="col-span-5">Tender</div>
          <div className="col-span-2">Region</div>
          <div className="col-span-2">ESG req.</div>
          <div className="col-span-2 text-right">Budget</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <motion.div
              layout
              key={t.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 gap-3 px-4 py-4 border-b last:border-b-0 hover:bg-surface-raised/60 transition group"
            >
              <div className="col-span-12 lg:col-span-5">
                <Link href={`/tenders/${t.id}`} className="font-medium hover:text-brand-red flex items-center gap-2">
                  {t.title}
                  <ChevronRight className="size-3 opacity-0 group-hover:opacity-100 transition" />
                </Link>
                <div className="text-[11px] text-content-subtle mt-0.5 flex items-center gap-3">
                  <span className="font-mono">{t.reference}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="size-3" /> {t.deadline}</span>
                  <span>{t.suppliers} suppliers</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-surface-raised overflow-hidden max-w-md">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-esg-gradient"
                  />
                </div>
              </div>
              <div className="col-span-6 lg:col-span-2 text-sm text-content-muted flex items-center gap-1.5">
                <Globe2 className="size-3.5" /> {t.region}
              </div>
              <div className="col-span-6 lg:col-span-2 flex items-center">
                <Badge variant={t.esgRequirement === "AAA" ? "emerald" : t.esgRequirement === "AA" ? "teal" : "indigo"}>
                  {t.esgRequirement} required
                </Badge>
              </div>
              <div className="col-span-8 lg:col-span-2 text-right tabular-nums font-medium">{formatCurrency(t.budgetUSD)}</div>
              <div className="col-span-4 lg:col-span-1 text-right">
                <Badge
                  variant={
                    t.status === "Open" ? "teal" : t.status === "Evaluating" ? "amber" : t.status === "Awarded" ? "emerald" : "neutral"
                  }
                >
                  {t.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* AI Document Analysis demo */}
      <AIDocumentPanel />
    </div>
  );
}

function AIDocumentPanel() {
  const [running, setRunning] = React.useState(false);
  const [text, setText] = React.useState("");
  const [done, setDone] = React.useState(false);

  const sample = `ESG Summary — Nordic Green Logistics A/S

• Composite ESG Score: 92 / 100 (AAA)
• Scope 1+2 emissions reduced 23% YoY; verified by SBTi.
• ISO 14001, EcoVadis Platinum, CDP A-list confirmed.
• No material governance findings in last 36 months.
• Recommended action: prioritize for Pacific Q3 lane (T-9821).`;

  React.useEffect(() => {
    if (!running) return;
    setText("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 4 + Math.floor(Math.random() * 5);
      setText(sample.slice(0, i));
      if (i >= sample.length) {
        clearInterval(id);
        setDone(true);
        setRunning(false);
      }
    }, 35);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="mt-6 grid lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5 rounded-2xl border bg-surface-overlay p-5">
        <div className="flex items-center gap-2">
          <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">AI</span>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">Document analysis</div>
            <div className="text-sm font-semibold">ESG Audit Report.pdf</div>
          </div>
          <Badge variant="emerald" className="ml-auto">Verified</Badge>
        </div>
        <div className="mt-4 rounded-xl border bg-surface p-4">
          <div className="flex items-center gap-2 text-xs text-content-muted">
            <FileText className="size-4" />
            audit_2026_NGL.pdf · 2.4 MB · 38 pages
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Scope 1·2·3", "Compliance", "Governance"].map((x) => (
              <div key={x} className="rounded-lg border bg-surface-overlay p-2 text-[11px]">
                <div className="text-content-subtle">{x}</div>
                <div className="font-semibold">Detected ✓</div>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={() => setRunning(true)} disabled={running} className="mt-4 w-full gap-2" variant="gradient">
          {running ? (
            <>
              <Sparkles className="size-4 animate-pulse" /> AI analyzing…
            </>
          ) : (
            <>
              <Zap className="size-4" /> Run AI analysis
            </>
          )}
        </Button>
      </div>

      <div className="lg:col-span-7 rounded-2xl border bg-surface-overlay p-5 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-data-teal/10 blur-3xl" />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">Streaming output</div>
            <div className="text-sm font-semibold">AI-generated ESG summary</div>
          </div>
          <Badge variant={done ? "emerald" : "teal"}>{done ? "Complete" : running ? "Streaming" : "Idle"}</Badge>
        </div>
        <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-[12.5px] text-emerald-700 dark:text-emerald-300/95 min-h-[220px] whitespace-pre-wrap">
          {text || (
            <span className="text-zinc-500">Click &quot;Run AI analysis&quot; to stream a structured ESG summary…</span>
          )}
          {running && <span className="inline-block w-2 h-4 align-middle bg-emerald-600 dark:bg-emerald-300/80 ml-0.5 animate-pulse" />}
        </div>

        {/* Suggested actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {["Generate compliance report", "Compare to peers", "Flag exceptions", "Export to PDF"].map((x) => (
            <button key={x} className="text-xs px-2.5 py-1 rounded-full border hover:bg-surface-raised inline-flex items-center gap-1">
              <ChevronDown className="size-3" /> {x}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
