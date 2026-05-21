"use client";
import * as React from "react";
import Link from "next/link";
import { Topbar } from "@/components/app/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Building2, Activity } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from "recharts";
import { formatCurrency } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { Supplier, Tender } from "@/lib/mock-data";

export default function TenderDetailClient({
  tender,
  candidates
}: {
  tender: Tender;
  candidates: Supplier[];
}) {
  const radarData = (s: Supplier) => [
    { axis: "Environmental", v: s.esgScore },
    { axis: "Compliance", v: s.compliance },
    { axis: "Financial", v: s.financial },
    { axis: "Logistics", v: s.logistics },
    { axis: "Carbon eff.", v: 100 - Math.min(100, Math.round(s.carbon / 2200)) }
  ];

  return (
    <div>
      <Topbar title={tender.title} subtitle={`${tender.reference} · ${tender.region} · ${tender.category}`} />

      <div className="mt-4">
        <Link href="/tenders" className="inline-flex items-center gap-1 text-xs text-content-muted hover:text-content">
          <ArrowLeft className="size-3.5" /> Back to tenders
        </Link>
      </div>

      <div className="mt-3 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border bg-surface-overlay p-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">Tender summary</div>
              <h2 className="text-xl font-semibold">{tender.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={tender.status === "Open" ? "teal" : tender.status === "Awarded" ? "emerald" : "amber"}>
                {tender.status}
              </Badge>
              <Badge variant="emerald">ESG ≥ {tender.esgRequirement}</Badge>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat k="Budget" v={formatCurrency(tender.budgetUSD)} />
            <Stat k="Suppliers" v={tender.suppliers} />
            <Stat k="Region" v={tender.region} />
            <Stat k="Deadline" v={tender.deadline} />
          </div>

          <div className="mt-4">
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">Evaluation progress</div>
            <div className="mt-1 h-1.5 rounded-full bg-surface-raised overflow-hidden">
              <div className="h-full bg-esg-gradient" style={{ width: `${tender.progress}%` }} />
            </div>
            <div className="mt-1 text-[11px] text-content-muted">{tender.progress}% complete</div>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5">
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">AI recommendation</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">AI</span>
            <div className="text-sm font-semibold">Top match: {candidates[0].name}</div>
          </div>
          <p className="mt-2 text-xs text-content-muted">
            Based on ESG score, route compatibility and financial stability, {candidates[0].name} ranks #1 with <b className="text-data-emerald">96.4% confidence</b>.
          </p>
          <Button className="mt-3 w-full" variant="primary">
            Award provisionally
          </Button>
        </div>
      </div>

      <h3 className="mt-8 text-sm font-semibold">Candidate suppliers</h3>
      <div className="mt-3 grid lg:grid-cols-2 gap-4">
        {candidates.map((s) => (
          <div key={s.id} className="rounded-2xl border bg-surface-overlay p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-content-muted" />
                  <div className="font-semibold">{s.name}</div>
                </div>
                <div className="text-[11px] text-content-subtle mt-0.5">
                  {s.id} · {s.country} · {s.industry}
                </div>
              </div>
              <Badge variant={s.esgScore >= 85 ? "emerald" : s.esgScore >= 75 ? "teal" : "amber"}>
                {s.rating} · {s.esgScore}
              </Badge>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-2 items-center">
              <div className="col-span-3 h-[170px]">
                <ResponsiveContainer>
                  <RadarChart data={radarData(s)} outerRadius={70}>
                    <PolarGrid stroke="rgba(127,127,127,0.18)" />
                    <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: "currentColor", opacity: 0.7 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, opacity: 0.4 }} />
                    <Radar dataKey="v" stroke="#0AD1C8" fill="#0AD1C8" fillOpacity={0.35} animationDuration={1000} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="col-span-2 space-y-2 text-xs">
                <KV k="Compliance" v={`${s.compliance}%`} />
                <KV k="Financial" v={`${s.financial}%`} />
                <KV k="Logistics" v={`${s.logistics}%`} />
                <KV k="Carbon" v={`${s.carbon.toLocaleString()} t`} />
                <KV k="Spend" v={formatCurrency(s.spendUSD)} />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.certifications.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] text-content-muted">
                  <Award className="size-3 text-data-teal" /> {c}
                </span>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="primary">Shortlist</Button>
              <Button size="sm" variant="outline">View profile</Button>
              <div className="ml-auto text-[11px] text-content-subtle inline-flex items-center gap-1">
                <Activity className="size-3" /> AI confidence {Math.round(80 + s.esgScore / 10)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-surface p-3">
      <div className="text-[10px] uppercase tracking-wider text-content-subtle">{k}</div>
      <div className="mt-1 text-sm font-semibold">{v}</div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-content-subtle">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
