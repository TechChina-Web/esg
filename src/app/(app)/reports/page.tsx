"use client";
import { Topbar } from "@/components/app/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";
import { EmissionsAreaChart } from "@/components/charts/emissions-area-chart";
import { Download, FileText, Mail, Printer, Share2 } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function ReportsPage() {
  return (
    <div>
      <Topbar title="Analytics & Reporting" subtitle="Audit-ready ESG, carbon, and supplier performance reports" />

      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5 h-fit">
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">Report library</div>
          <ul className="mt-3 space-y-2">
            {[
              { k: "ESG Annual Report 2026", t: "TCFD · CSRD" },
              { k: "Q2 Carbon Audit", t: "Verified" },
              { k: "Supplier Risk Snapshot", t: "AI-generated" },
              { k: "Net-Zero Roadmap", t: "Executive" }
            ].map((r, i) => (
              <li key={r.k} className={`p-2.5 rounded-xl border flex items-center gap-2 ${i === 0 ? "bg-surface-raised" : "hover:bg-surface-raised"}`}>
                <FileText className="size-4 text-content-muted" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.k}</div>
                  <div className="text-[11px] text-content-subtle">{r.t}</div>
                </div>
                <Badge variant="emerald">PDF</Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-1.5"><Mail className="size-4" /> Email</Button>
            <Button variant="primary" className="gap-1.5"><Download className="size-4" /> Export</Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 rounded-2xl border glass p-1 shadow-glow relative"
        >
          {/* Browser-like chrome */}
          <div className="flex items-center gap-1 px-3 py-2">
            <span className="size-2.5 rounded-full bg-brand-red" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-data-emerald" />
            <div className="ml-3 text-[11px] text-content-subtle">esg.hsbc.com / reports / annual-2026.pdf</div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="ghost" className="gap-1.5"><Printer className="size-4" /> Print</Button>
              <Button size="sm" variant="ghost" className="gap-1.5"><Share2 className="size-4" /> Share</Button>
            </div>
          </div>

          {/* Report viewer */}
          <div className="rounded-2xl bg-white text-[#0A0A0A] dark:bg-[#0e1116] dark:text-white p-6 lg:p-10 m-1 lg:m-2 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-md bg-white grid place-items-center">
                    <Image
                      src="/esg/bank-hsbc.svg"
                      alt="HSBC Logo"
                      width={32}
                      height={32}
                      className="size-8"
                    />
                  </div>
                  <div className="text-xs text-content-muted">HSBC Holdings plc · Group Sustainability</div>
                </div>
                <h1 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight">ESG Annual Report 2026</h1>
                <p className="mt-1 text-sm text-content-muted">Net-Zero supply chain performance, climate risk, and governance.</p>
              </div>
              <Badge variant="emerald">TCFD · CSRD · ISSB</Badge>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "ESG Composite", v: 86.4, suffix: "" },
                { k: "Carbon reduction", v: 18.7, suffix: "%" },
                { k: "Green capital", v: 2.84, prefix: "$", suffix: "B" }
              ].map((m) => (
                <div key={m.k} className="rounded-xl border p-3">
                  <div className="text-[10px] uppercase tracking-wider text-content-muted">{m.k}</div>
                  <div className="text-2xl font-semibold tabular-nums">
                    <AnimatedCounter value={m.v} prefix={(m as any).prefix || ""} suffix={m.suffix} decimals={(m.v % 1 ? 1 : 0)} />
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-7 text-sm font-semibold tracking-wider uppercase text-content-muted">Section 02 · Carbon performance</h2>
            <div className="mt-2 rounded-xl border p-3">
              <EmissionsAreaChart />
            </div>

            <h2 className="mt-7 text-sm font-semibold tracking-wider uppercase text-content-muted">Executive summary</h2>
            <p className="mt-2 text-sm leading-relaxed">
              FY26 marked a step-change in HSBC&apos;s sustainability operating model. Group emissions fell <b>18.7%</b> YoY,
              outpacing our internal target by 320 bps. AI-driven supplier evaluation increased AAA-rated supplier share by{" "}
              <b>+9pp</b>, while $2.84B of green capital was deployed across maritime, materials and renewable energy.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-3">
                <div className="text-[10px] uppercase tracking-wider text-content-muted">Highlights</div>
                <ul className="mt-1 text-xs space-y-1 text-content-muted list-disc pl-4">
                  <li>Pacific Q3 lane operating below 1.4 tCO₂e per TEU.</li>
                  <li>SBTi target validated for 2030 trajectory.</li>
                  <li>14 new ESG-linked products onboarded.</li>
                </ul>
              </div>
              <div className="rounded-xl border p-3">
                <div className="text-[10px] uppercase tracking-wider text-content-muted">Areas of focus</div>
                <ul className="mt-1 text-xs space-y-1 text-content-muted list-disc pl-4">
                  <li>Scope 3 transparency in textiles cluster.</li>
                  <li>LATAM cold chain electrification.</li>
                  <li>Renewable energy PPA in APAC manufacturing.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-[11px] text-content-muted flex items-center justify-between border-t pt-3">
              <span>Supplier Net Zero Accelerator · Confidential</span>
              <span>Page 1 of 86</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
