"use client";
import * as React from "react";
import { Topbar } from "@/components/app/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plane, Ship, Train, Truck, Zap, Leaf, Clock, DollarSign } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

type Mode = "Sea" | "Air" | "Rail" | "Truck";
const modeIcon: Record<Mode, any> = { Sea: Ship, Air: Plane, Rail: Train, Truck: Truck };
const modeColor: Record<Mode, string> = { Sea: "#0AD1C8", Air: "#DB0011", Rail: "#00C281", Truck: "#FFB020" };

type Profile = { mode: Mode; co2PerKm: number; usdPerKm: number; speedKmH: number };
const profiles: Record<Mode, Profile> = {
  Sea: { mode: "Sea", co2PerKm: 0.012, usdPerKm: 0.6, speedKmH: 32 },
  Air: { mode: "Air", co2PerKm: 0.55, usdPerKm: 4.2, speedKmH: 850 },
  Rail: { mode: "Rail", co2PerKm: 0.022, usdPerKm: 0.95, speedKmH: 95 },
  Truck: { mode: "Truck", co2PerKm: 0.085, usdPerKm: 1.4, speedKmH: 75 }
};

type Node = { id: string; x: number; y: number; label: string };
const initialNodes: Node[] = [
  { id: "n1", x: 80, y: 120, label: "Shanghai" },
  { id: "n2", x: 380, y: 80, label: "Singapore Hub" },
  { id: "n3", x: 700, y: 160, label: "Suez Transit" },
  { id: "n4", x: 980, y: 110, label: "Rotterdam" }
];

export default function SimulatorPage() {
  const [nodes, setNodes] = React.useState(initialNodes);
  const [legs, setLegs] = React.useState<Mode[]>(["Sea", "Sea", "Sea"]);
  const [tons, setTons] = React.useState(2400);
  const [distanceFactor, setDistanceFactor] = React.useState(1);
  const [drag, setDrag] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const distance = (a: Node, b: Node) => Math.round(Math.hypot(a.x - b.x, a.y - b.y) * 14 * distanceFactor);

  const totals = React.useMemo(() => {
    let co2 = 0, usd = 0, hours = 0;
    for (let i = 0; i < legs.length; i++) {
      const a = nodes[i], b = nodes[i + 1];
      if (!a || !b) continue;
      const km = distance(a, b);
      const p = profiles[legs[i]];
      co2 += km * p.co2PerKm * (tons / 1000);
      usd += km * p.usdPerKm + tons * 0.4;
      hours += km / p.speedKmH;
    }
    return { co2: Math.round(co2), usd: Math.round(usd), hours: Math.round(hours) };
  }, [legs, nodes, tons, distanceFactor]);

  // baseline = all sea
  const baseline = React.useMemo(() => {
    let co2 = 0, usd = 0, hours = 0;
    for (let i = 0; i < legs.length; i++) {
      const a = nodes[i], b = nodes[i + 1];
      if (!a || !b) continue;
      const km = distance(a, b);
      const p = profiles.Sea;
      co2 += km * p.co2PerKm * (tons / 1000);
      usd += km * p.usdPerKm + tons * 0.4;
      hours += km / p.speedKmH;
    }
    return { co2: Math.round(co2), usd: Math.round(usd), hours: Math.round(hours) };
  }, [legs.length, nodes, tons, distanceFactor]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
    setNodes((prev) => prev.map((n) => (n.id === drag ? { ...n, x, y } : n)));
  };

  return (
    <div onMouseMove={onMouseMove} onMouseUp={() => setDrag(null)}>
      <Topbar title="Carbon Simulation Studio" subtitle="Drag nodes, swap modes, see impact in real time" />

      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-2xl border bg-surface-overlay p-3 lg:p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">Route canvas</div>
              <div className="text-sm font-semibold">{nodes.length} nodes · {legs.length} legs</div>
            </div>
            <div className="flex items-center gap-1">
              {(Object.keys(profiles) as Mode[]).map((m) => {
                const Icon = modeIcon[m];
                return (
                  <span key={m} className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px]">
                    <Icon className="size-3" /> {m}
                  </span>
                );
              })}
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative h-[360px] lg:h-[420px] rounded-xl border bg-[radial-gradient(circle_at_30%_20%,rgba(10,209,200,0.08),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(219,0,17,0.08),transparent_60%)] overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(127,127,127,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(127,127,127,0.07) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          >
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              {nodes.slice(0, -1).map((a, i) => {
                const b = nodes[i + 1];
                const mode = legs[i];
                const stroke = modeColor[mode];
                const path = `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y - 60}, ${(a.x + b.x) / 2} ${b.y + 60}, ${b.x} ${b.y}`;
                return (
                  <g key={i}>
                    <path d={path} fill="none" stroke={stroke} strokeOpacity={0.35} strokeWidth={3} />
                    <path d={path} fill="none" stroke={stroke} strokeWidth={1.4} strokeDasharray="6 6">
                      <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="0.8s" repeatCount="indefinite" />
                    </path>
                    <circle r={4} fill={stroke}>
                      <animateMotion dur={`${3 + i * 0.5}s`} repeatCount="indefinite" path={path} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {nodes.map((n) => (
              <div
                key={n.id}
                onMouseDown={() => setDrag(n.id)}
                style={{ left: n.x, top: n.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
              >
                <div className="relative grid place-items-center">
                  <div className="size-3.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(10,209,200,0.55),0_0_24px_2px_rgba(10,209,200,0.4)]" />
                  <div className="mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-surface-overlay border whitespace-nowrap">
                    {n.label}
                  </div>
                </div>
              </div>
            ))}

            {/* leg mode pickers */}
            {nodes.slice(0, -1).map((a, i) => {
              const b = nodes[i + 1];
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2 - 28;
              return (
                <div key={`pick-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: mx, top: my }}>
                  <div className="flex items-center rounded-full border bg-surface-overlay/90 backdrop-blur px-1 py-0.5 shadow-card">
                    {(Object.keys(profiles) as Mode[]).map((m) => {
                      const Icon = modeIcon[m];
                      const active = legs[i] === m;
                      return (
                        <button
                          key={m}
                          onClick={() =>
                            setLegs((prev) => prev.map((x, idx) => (idx === i ? m : x)))
                          }
                          className={`size-7 grid place-items-center rounded-full ${active ? "text-white" : "text-content-muted hover:text-content"}`}
                          style={active ? { background: modeColor[m] } : undefined}
                        >
                          <Icon className="size-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border p-3">
              <div className="text-[11px] text-content-subtle">Cargo weight (tons)</div>
              <input
                type="range"
                min={500}
                max={6000}
                step={100}
                value={tons}
                onChange={(e) => setTons(Number(e.target.value))}
                className="w-full accent-brand-red"
              />
              <div className="text-sm font-medium tabular-nums">{tons.toLocaleString()} t</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="text-[11px] text-content-subtle">Distance scaling</div>
              <input
                type="range"
                min={0.5}
                max={1.6}
                step={0.05}
                value={distanceFactor}
                onChange={(e) => setDistanceFactor(Number(e.target.value))}
                className="w-full accent-data-teal"
              />
              <div className="text-sm font-medium tabular-nums">{distanceFactor.toFixed(2)}x</div>
            </div>
          </div>
        </div>

        {/* Side Comparison */}
        <div className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-data-emerald/10 blur-3xl" />
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">Live impact</div>
          <div className="text-sm font-semibold">Scenario vs. all-sea baseline</div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <Metric
              icon={<Leaf className="size-4 text-data-emerald" />}
              label="Carbon"
              value={totals.co2}
              suffix=" tCO₂e"
              baseline={baseline.co2}
              betterLow
            />
            <Metric
              icon={<DollarSign className="size-4 text-brand-red" />}
              label="Cost"
              value={totals.usd}
              prefix="$"
              baseline={baseline.usd}
              betterLow
            />
            <Metric
              icon={<Clock className="size-4 text-data-teal" />}
              label="Transit"
              value={totals.hours}
              suffix=" h"
              baseline={baseline.hours}
              betterLow
            />
          </div>

          <div className="mt-5 rounded-xl border bg-surface p-3">
            <div className="text-[11px] text-content-subtle inline-flex items-center gap-1">
              <Zap className="size-3 text-data-teal" /> AI suggestion
            </div>
            <p className="mt-1 text-xs">
              Switch leg 2 to <b>Rail</b> to cut <b className="text-data-emerald">{Math.round(totals.co2 * 0.18)} tCO₂e</b> with
              only <b>+{Math.round(baseline.hours * 0.04)}h</b> added transit time.
            </p>
            <Button size="sm" variant="gradient" className="mt-2 w-full">Apply suggestion</Button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge variant="emerald">ESG Score impact +1.4</Badge>
            <Badge variant="teal">Net-Zero +0.6%</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  baseline,
  prefix = "",
  suffix = "",
  betterLow
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  baseline: number;
  prefix?: string;
  suffix?: string;
  betterLow?: boolean;
}) {
  const diff = value - baseline;
  const pct = baseline ? (diff / baseline) * 100 : 0;
  const better = betterLow ? diff < 0 : diff > 0;
  return (
    <motion.div layout className="rounded-xl border p-3 bg-surface">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-[11px] uppercase tracking-wider text-content-subtle">{label}</div>
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className={`text-[11px] ${better ? "text-data-emerald" : "text-brand-red"}`}>
        {diff >= 0 ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}% vs baseline
      </div>
    </motion.div>
  );
}
