"use client";
import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Leaf,
  Bot,
  ShieldCheck,
  Truck,
  LineChart,
  Banknote,
  Globe2,
  Sparkles,
  ChevronRight,
  Command as CmdIcon,
} from "lucide-react";
import { AnimatedGlobe } from "@/components/visuals/animated-globe";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { KPIs } from "@/lib/mock-data";
import { EmissionsAreaChart } from "@/components/charts/emissions-area-chart";
import { ESGScoreRing } from "@/components/charts/esg-score-ring";
import { useCommandPalette } from "@/components/command-palette";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface">
      <Background />
      <Nav />
      <Hero />
      <KPIStrip />
      <Features />
      <DashboardPreview />
      <GlobalNetwork />
      <CTA />
      <Footer />
    </div>
  );
}

function Background() {
  return (
    <>
      <div className="aurora-bg" />
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 20%, transparent 65%)",
        }}
      />
    </>
  );
}

function Nav() {
  const { setOpen } = useCommandPalette();
  return (
    <header className="sticky top-0 z-50 border-b border-edge backdrop-blur-xl bg-surface/70">
      <div className="container flex items-center h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="size-10 rounded-lg bg-white grid place-items-center">
            <Image
              src="/esg/bank-hsbc.svg"
              alt="HSBC Logo"
              width={32}
              height={32}
              className="size-8"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">HSBC</div>
            <div className="text-[10px] text-content-subtle tracking-wider uppercase">
              Net Zero Accelerator
            </div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-10 text-[13px] text-content-muted">
          {["Platform", "Solutions", "AI Copilot", "Finance", "Customers"].map(
            (x) => (
              <a
                key={x}
                className="px-3 py-1.5 rounded-md hover:text-content hover:bg-surface-raised transition-colors"
                href="#"
              >
                {x}
              </a>
            )
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-edge text-xs text-content-muted hover:bg-surface-raised transition-colors"
          >
            <CmdIcon className="size-3" />K
          </button>
          <ThemeToggle />
          <Link href="/dashboard">
            <Button size="sm" variant="primary" className="gap-1.5 rounded-lg">
              Launch Accelerator <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="container relative pt-14 sm:pt-20 pb-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Badge variant="teal" className="mb-5 gap-1.5">
            <Sparkles className="size-3" /> HSBC ESG Copilot · v2.6
          </Badge>
          <h1 className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] font-semibold tracking-tight leading-[1.06] text-content">
            AI-powered{" "}
            <span className="text-gradient-brand">Sustainable</span>
            <br className="hidden sm:block" /> Supply Chain Intelligence.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-content-muted max-w-xl leading-relaxed">
            Net-Zero supply chain orchestration for global enterprises.
            Real-time ESG risk monitoring, carbon transparency, and AI-driven
            procurement — engineered on HSBC&apos;s trust fabric.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button size="lg" variant="primary" className="gap-2 rounded-lg">
                Open Accelerator <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/copilot">
              <Button size="lg" variant="outline" className="gap-2 rounded-lg">
                Try AI Copilot <Bot className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-content-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-data-emerald" /> ISO
              14064 · TCFD aligned
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="size-3.5 text-data-teal" /> Active in 64
              markets
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="size-3.5 text-data-emerald" /> SBTi validated
            </span>
          </div>
        </motion.div>

        {/* Globe + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid place-items-center"
        >
          <div className="hidden sm:block">
            <AnimatedGlobe size={500} />
          </div>
          <div className="sm:hidden">
            <AnimatedGlobe size={300} />
          </div>

          {/* Floating card — carbon */}
          <motion.div
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute left-0 top-6 sm:top-8 glass rounded-xl p-3 w-[190px] animate-float shadow-elevated"
          >
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">
              Carbon flow · live
            </div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-content">
              <AnimatedCounter value={1248} suffix=" tCO₂e" />
            </div>
            <div className="mt-1 text-[11px] text-data-emerald font-medium">
              ▼ 12.4% vs. last 24h
            </div>
            <div className="mt-2 h-1 rounded-full bg-surface overflow-hidden">
              <motion.div
                className="h-full bar-esg"
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1.4 }}
              />
            </div>
          </motion.div>

          {/* Floating card — AI insight */}
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute right-0 top-20 glass rounded-xl p-3 w-[210px] shadow-elevated"
          >
            <div className="flex items-center gap-2">
              <span className="size-6 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">
                AI
              </span>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                Copilot insight
              </div>
            </div>
            <p className="mt-2 text-[12px] leading-snug text-content-muted">
              Reroute <b className="text-content">Mumbai → London</b> via
              Rail+Sea to save{" "}
              <b className="text-data-emerald">184 tCO₂e</b>.
            </p>
            <button className="mt-2 text-[11px] text-brand-red font-medium inline-flex items-center gap-1">
              Apply suggestion <ChevronRight className="size-3" />
            </button>
          </motion.div>

          {/* Floating card — ESG Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass rounded-xl p-3 w-[240px] shadow-elevated"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-content-subtle">
              <span>ESG Score</span>
              <Badge variant="emerald">AAA</Badge>
            </div>
            <div className="mt-1 flex items-end justify-between">
              <div className="text-3xl font-semibold tabular-nums text-gradient-esg">
                <AnimatedCounter value={86.4} decimals={1} />
              </div>
              <div className="text-[11px] text-content-muted">
                confidence 94%
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[64, 82, 92].map((v, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full bg-surface overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ duration: 1.2, delay: 0.1 * i }}
                    className="h-full bar-esg"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function KPIStrip() {
  const items = [
    { label: "Suppliers monitored", value: KPIs.monitoredSuppliers, suffix: "+" },
    {
      label: "Carbon reduction YoY",
      value: KPIs.carbonReduction,
      suffix: "%",
      decimals: 1,
    },
    {
      label: "Green finance issued",
      value: 2.84,
      suffix: "B USD",
      decimals: 2,
      prefix: "$",
    },
    { label: "Markets covered", value: KPIs.countriesCovered, suffix: "" },
    { label: "Active tenders", value: KPIs.activeTenders, suffix: "" },
    { label: "Net-Zero progress", value: KPIs.netZeroProgress, suffix: "%" },
  ];
  return (
    <section className="container py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-edge bg-surface-overlay p-4 hover:border-edge-strong transition-colors"
          >
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">
              {it.label}
            </div>
            <div className="mt-1 text-xl font-semibold tabular-nums text-content">
              <AnimatedCounter
                value={it.value as number}
                prefix={(it as any).prefix || ""}
                suffix={it.suffix}
                decimals={(it as any).decimals ?? 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Bot,
    title: "AI ESG Scoring",
    desc: "Explainable ESG ratings on 1,200+ suppliers with confidence intervals.",
    accent: "data-teal",
  },
  {
    icon: Truck,
    title: "Sustainable Logistics",
    desc: "Multi-modal routing optimized for carbon, cost and SLA.",
    accent: "data-indigo",
  },
  {
    icon: Leaf,
    title: "Carbon Tracking",
    desc: "Scope 1·2·3 ledger with TCFD/CSRD-ready exports.",
    accent: "data-emerald",
  },
  {
    icon: Banknote,
    title: "Green Financing",
    desc: "ESG-linked loans, carbon credit forecasting, eligibility AI.",
    accent: "data-teal",
  },
  {
    icon: ShieldCheck,
    title: "Supplier Risk Intel",
    desc: "Real-time risk signals from 40+ external data feeds.",
    accent: "data-amber",
  },
  {
    icon: LineChart,
    title: "Smart Procurement",
    desc: "AI bid evaluation with built-in ESG compliance gating.",
    accent: "data-sky",
  },
] as const;

function Features() {
  return (
    <section className="container py-16">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-2xl"
      >
        <Badge variant="teal">Platform capabilities</Badge>
        <h2 className="mt-3 text-3xl sm:text-[2.5rem] font-semibold tracking-tight text-content leading-[1.12]">
          One operating system for{" "}
          <span className="text-gradient-esg">sustainable trade</span>.
        </h2>
        <p className="mt-4 text-content-muted text-base max-w-xl">
          From procurement to port-to-port logistics, HSBC ESG unifies your
          sustainability stack — with AI as your co-pilot at every step.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          const accentClass =
            f.accent === "data-teal"
              ? "text-data-teal bg-data-teal/10 group-hover:bg-data-teal/16"
              : f.accent === "data-emerald"
              ? "text-data-emerald bg-data-emerald/10 group-hover:bg-data-emerald/16"
              : f.accent === "data-indigo"
              ? "text-data-indigo bg-data-indigo/10 group-hover:bg-data-indigo/16"
              : f.accent === "data-amber"
              ? "text-data-amber bg-data-amber/10 group-hover:bg-data-amber/16"
              : "text-data-sky bg-data-sky/10 group-hover:bg-data-sky/16";
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, duration: 0.55 }}
              className="group relative rounded-xl border border-edge bg-surface-overlay p-5 hover:border-edge-strong transition-all duration-200"
            >
              <div className="relative">
                <div
                  className={`size-10 rounded-lg border border-edge grid place-items-center mb-4 transition-colors ${accentClass}`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="text-base font-semibold text-content">
                  {f.title}
                </div>
                <p className="mt-1.5 text-sm text-content-muted leading-relaxed">
                  {f.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-content-muted group-hover:text-brand-red transition-colors">
                  Learn more <ChevronRight className="size-3" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="container py-16">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="lg:col-span-4"
        >
          <Badge variant="emerald">Live dashboard</Badge>
          <h2 className="mt-3 text-3xl sm:text-[2.25rem] font-semibold tracking-tight text-content leading-[1.12]">
            Bloomberg-grade clarity for ESG.
          </h2>
          <p className="mt-4 text-content-muted leading-relaxed">
            Real-time emissions, supplier risk, and tender performance — all in
            one floating dashboard. Designed with the rigor of a trading
            terminal and the calm of a banking app.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              "Sub-second data refresh with optimistic UI",
              "Explainable AI insights & action proposals",
              "Export to TCFD, CSRD, ISSB-aligned PDF",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 rounded-full bg-data-emerald shadow-[0_0_8px_rgba(16,185,129,0.4)] shrink-0" />
                <span className="text-content-muted">{x}</span>
              </li>
            ))}
          </ul>
          <Link href="/dashboard" className="mt-6 inline-block">
            <Button variant="primary" className="gap-2 rounded-lg">
              Explore the dashboard <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-8"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-3xl bg-esg-gradient opacity-[0.08] blur-2xl" />
            <div className="relative glass rounded-2xl border border-edge p-4 lg:p-5 shadow-card">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="size-2.5 rounded-full bg-brand-red/60" />
                <span className="size-2.5 rounded-full bg-data-amber/60" />
                <span className="size-2.5 rounded-full bg-data-emerald/60" />
                <div className="ml-3 text-[11px] text-content-subtle">
                  esg.hsbc.com / dashboard
                </div>
                <Badge variant="teal" className="ml-auto">
                  LIVE
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 rounded-xl border border-edge bg-surface-overlay p-3 grid place-items-center">
                  <ESGScoreRing size={190} />
                </div>
                <div className="md:col-span-2 rounded-xl border border-edge bg-surface-overlay p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                        Carbon emissions
                      </div>
                      <div className="text-sm font-semibold text-content">
                        Scope 1·2·3 — Trailing 12M
                      </div>
                    </div>
                    <Badge variant="teal">tCO₂e</Badge>
                  </div>
                  <EmissionsAreaChart />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GlobalNetwork() {
  return (
    <section className="container py-16">
      <div className="rounded-2xl border border-edge bg-surface-overlay p-6 lg:p-10 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-[380px] rounded-full bg-data-teal/[0.03] blur-3xl" />
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <Badge variant="indigo">Global network</Badge>
            <h2 className="mt-3 text-3xl sm:text-[2.25rem] font-semibold tracking-tight text-content leading-[1.12]">
              Trade routes, alive.
            </h2>
            <p className="mt-4 text-content-muted leading-relaxed">
              Visualize port-to-port flows, carbon density and risk heatmaps
              across 64 markets — powered by HSBC&apos;s trade finance footprint.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "Ports", v: 412 },
                { k: "Lanes", v: 1860 },
                { k: "Carriers", v: 138 },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-xl border border-edge bg-surface p-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-content-subtle">
                    {x.k}
                  </div>
                  <div className="text-xl font-semibold tabular-nums text-content">
                    <AnimatedCounter value={x.v} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid place-items-center">
            <AnimatedGlobe size={440} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container py-16">
      <div className="relative rounded-2xl overflow-hidden border border-edge bg-brand-gradient text-white p-10 lg:p-14">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 20% 10%, rgba(255,255,255,0.5), transparent 55%), radial-gradient(50% 60% at 80% 80%, rgba(255,255,255,0.35), transparent 55%)",
          }}
        />
        <div className="relative max-w-2xl">
          <Badge className="bg-white/12 text-white border-white/15">
            For global enterprises
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-semibold tracking-tight leading-[1.12]">
            Operationalize your Net-Zero. Today.
          </h2>
          <p className="mt-3 text-white/80 max-w-lg leading-relaxed">
            Join HSBC&apos;s ESG ecosystem — and turn sustainability from a
            compliance cost into an operating advantage.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-brand-red hover:bg-white/90 rounded-lg"
              >
                Launch Accelerator <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/8 rounded-lg"
            >
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-edge mt-6">
      <div className="container py-10 grid sm:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-md bg-white grid place-items-center">
              <Image
                src="/esg/bank-hsbc.svg"
                alt="HSBC Logo"
                width={64}
                height={64}
                className="size-16"
              />
            </div>
            <div className="font-semibold text-content">Supplier Net Zero Accelerator</div>
          </div>
          <p className="mt-2 text-content-subtle text-xs">
            © 2026 HSBC Holdings plc. For demonstration purposes only.
          </p>
        </div>
        {[
          {
            h: "Platform",
            l: ["Dashboard", "Tenders", "Simulator", "Copilot"],
          },
          { h: "Company", l: ["About", "Customers", "Newsroom", "Careers"] },
          {
            h: "Resources",
            l: ["Documentation", "Security", "Status", "Contact"],
          },
        ].map((g) => (
          <div key={g.h}>
            <div className="text-[11px] uppercase tracking-wider text-content-subtle font-medium">
              {g.h}
            </div>
            <ul className="mt-2.5 space-y-1.5">
              {g.l.map((x) => (
                <li key={x}>
                  <a
                    className="text-content-muted hover:text-content transition-colors"
                    href="#"
                  >
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}