"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { Topbar } from "@/components/app/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, Reorder, useDragControls } from "framer-motion";
import {
  Plane, Ship, Train, Truck, Zap, Leaf, Clock, DollarSign,
  GripVertical, Search, X, RotateCcw,
  Route, Plus, ChevronRight, ChevronDown
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useTheme } from "next-themes";

const ChinaMap = dynamic(() => import("./ChinaMap"), { ssr: false });

type Mode = "Sea" | "Air" | "Rail" | "Truck";
const modeIcon: Record<Mode, any> = { Sea: Ship, Air: Plane, Rail: Train, Truck: Truck };
const modeColor: Record<Mode, string> = { Sea: "#0AD1C8", Air: "#DB0011", Rail: "#00C281", Truck: "#FFB020" };

type Profile = { mode: Mode; co2PerKm: number; usdPerKm: number; speedKmH: number };
const profiles: Record<Mode, Profile> = {
  Sea:   { mode: "Sea",   co2PerKm: 0.012, usdPerKm: 0.6,  speedKmH: 32  },
  Air:   { mode: "Air",   co2PerKm: 0.55,  usdPerKm: 4.2,  speedKmH: 850 },
  Rail:  { mode: "Rail",  co2PerKm: 0.022, usdPerKm: 0.95, speedKmH: 95  },
  Truck: { mode: "Truck", co2PerKm: 0.085, usdPerKm: 1.4,  speedKmH: 75  },
};

// Cities stored as real WGS-84 coordinates; pixel positions computed via ECharts convertToPixel
type GeoCity = { id: string; lon: number; lat: number; label: string };
type PixelNode = GeoCity & { x: number; y: number };

const initialCities: GeoCity[] = [
  { id: "n0", lon: 108.95, lat: 34.27, label: "Xi'an"     },
  { id: "n1", lon: 112.98, lat: 28.20, label: "Changsha"  },
  { id: "n2", lon: 113.26, lat: 23.13, label: "Guangzhou" },
  { id: "n3", lon: 121.47, lat: 31.23, label: "Shanghai"  },
];

const CITY_PRESETS: GeoCity[] = [
  { id: "p-bj",  lon: 116.41, lat: 39.91, label: "Beijing"   },
  { id: "p-tj",  lon: 117.19, lat: 39.13, label: "Tianjin"   },
  { id: "p-sy",  lon: 123.43, lat: 41.79, label: "Shenyang"  },
  { id: "p-jn",  lon: 117.00, lat: 36.67, label: "Jinan"     },
  { id: "p-sh",  lon: 121.47, lat: 31.23, label: "Shanghai"  },
  { id: "p-nb",  lon: 121.55, lat: 29.87, label: "Ningbo"    },
  { id: "p-xa",  lon: 108.95, lat: 34.27, label: "Xi'an"     },
  { id: "p-zz",  lon: 113.63, lat: 34.75, label: "Zhengzhou" },
  { id: "p-wh",  lon: 114.31, lat: 30.52, label: "Wuhan"     },
  { id: "p-cs",  lon: 112.98, lat: 28.20, label: "Changsha"  },
  { id: "p-gz",  lon: 113.26, lat: 23.13, label: "Guangzhou" },
  { id: "p-sz",  lon: 114.06, lat: 22.54, label: "Shenzhen"  },
  { id: "p-cq",  lon: 106.55, lat: 29.56, label: "Chongqing" },
  { id: "p-cd",  lon: 104.07, lat: 30.67, label: "Chengdu"   },
  { id: "p-gy",  lon: 106.63, lat: 26.65, label: "Guiyang"   },
  { id: "p-km",  lon: 102.83, lat: 25.04, label: "Kunming"   },
  { id: "p-uru", lon:  87.61, lat: 43.79, label: "Ürümqi"    },
  { id: "p-lz",  lon: 103.82, lat: 36.06, label: "Lanzhou"   },
];


// ── CityRow ──────────────────────────────────────────────────────────────────
type CityRowProps = {
  city: GeoCity;
  idx: number;
  totalCities: number;
  legs: Mode[];
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onAddAfter: () => void;
  isDark: boolean;
  nextCity?: GeoCity;
};

function CityRow({ city, idx, totalCities, legs, onMoveUp, onMoveDown, onRemove, onAddAfter, isDark, nextCity }: CityRowProps) {
  const dragControls = useDragControls();
  const isOrigin = idx === 0;
  const isDestination = idx === totalCities - 1;

  return (
    <Reorder.Item
      value={city}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-2"
      style={{ listStyle: "none" }}
    >
      {/* Timeline dot + connector */}
      <div className="flex flex-col items-center w-8 shrink-0 select-none">
        <div
          className="size-3 rounded-full border-2"
          style={{
            background: isOrigin ? "#DB0011" : isDestination ? "#00C281" : "#0AD1C8",
            borderColor: "white",
            boxShadow: `0 0 8px ${isOrigin ? "rgba(219,0,17,0.5)" : isDestination ? "rgba(0,194,129,0.5)" : "rgba(10,209,200,0.5)"}`,
          }}
        />
        {!isDestination && <div className="w-px h-6 bg-gradient-to-b from-data-teal/50 to-transparent" />}
      </div>

      {/* City card */}
      <div className="flex-1 flex items-center gap-2 p-2 rounded-lg border bg-surface">
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing touch-none select-none"
          title="Drag to reorder"
        >
          <GripVertical className="size-3.5 text-content-muted hover:text-content transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium">
            {city.label}
            {isOrigin && <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-brand-red/10 text-brand-red">ORIGIN</span>}
            {isDestination && <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-data-emerald/10 text-data-emerald">DEST</span>}
            {!isOrigin && !isDestination && <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-data-teal/10 text-data-teal">VIA</span>}
          </div>
          {idx < legs.length && nextCity && (
            <div className="text-[10px] text-content-subtle inline-flex items-center gap-1">
              {React.createElement(modeIcon[legs[idx]], { className: "size-3", style: { color: modeColor[legs[idx]] } })}
              <span style={{ color: modeColor[legs[idx]] }}>{legs[idx]}</span>
              <ChevronRight className="size-3 text-content-muted" />
              {haversineKm(city, nextCity).toLocaleString()} km
            </div>
          )}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {!isOrigin && (
            <button onClick={onMoveUp} className="size-6 grid place-items-center rounded hover:bg-surface-raised text-content-muted hover:text-content text-xs" title="Move up">↑</button>
          )}
          {!isDestination && (
            <button onClick={onMoveDown} className="size-6 grid place-items-center rounded hover:bg-surface-raised text-content-muted hover:text-content text-xs" title="Move down">↓</button>
          )}
          <button
            onClick={onRemove}
            disabled={totalCities <= 2}
            className="size-6 grid place-items-center rounded hover:bg-brand-red/10 text-content-muted hover:text-brand-red disabled:opacity-30"
            title="Remove stop"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Insert-after button */}
      <button
        onClick={onAddAfter}
        className="shrink-0 size-6 rounded-full border border-dashed border-data-teal/50 text-data-teal hover:bg-data-teal/10 hover:border-data-teal grid place-items-center transition-colors"
        title={`Insert stop after ${city.label}`}
      >
        <Plus className="size-3" />
      </button>
    </Reorder.Item>
  );
}

// Haversine distance between two geo points in km
function haversineKm(a: GeoCity, b: GeoCity): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}

export default function SimulatorPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Geo-coordinate city list (source of truth)
  const [cities, setCities] = React.useState<GeoCity[]>(initialCities);
  const [pixelNodes, setPixelNodes] = React.useState<PixelNode[]>([]);
  const [legs, setLegs] = React.useState<Mode[]>(["Rail", "Truck", "Sea"]);
  const [tons, setTons] = React.useState(2400);
  const [search, setSearch] = React.useState("");
  const [isBuilderOpen, setIsBuilderOpen] = React.useState(false);
  const [insertAfterIndex, setInsertAfterIndex] = React.useState<number | null>(null);
  const chartInstanceRef = React.useRef<any>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  // Stable ref to cities — prevents stale closure in georoam handler
  const citiesRef = React.useRef(cities);
  React.useEffect(() => { citiesRef.current = cities; }, [cities]);

  // reproject has NO deps — always reads latest cities via ref
  // This ensures the georoam handler (registered once) never calls a stale closure
  const reproject = React.useCallback(() => {
    const inst = chartInstanceRef.current;
    if (!inst) return;
    const projected = citiesRef.current.map((c) => {
      const px = inst.convertToPixel("geo", [c.lon, c.lat]);
      return { ...c, x: px ? px[0] : 0, y: px ? px[1] : 0 };
    });
    setPixelNodes(projected);
  }, []);

  const handleMapReady = React.useCallback(
    (instance: any) => {
      chartInstanceRef.current = instance;
      setTimeout(() => reproject(), 80);
    },
    [reproject]
  );

  // Re-project whenever cities change (map already ready)
  React.useEffect(() => {
    if (chartInstanceRef.current) reproject();
  }, [cities, reproject]);

  // Calculations
  const totals = React.useMemo(() => {
    let co2 = 0, usd = 0, hours = 0;
    for (let i = 0; i < legs.length; i++) {
      const a = cities[i], b = cities[i + 1];
      if (!a || !b) continue;
      const km = haversineKm(a, b);
      const p = profiles[legs[i]];
      co2 += km * p.co2PerKm * (tons / 1000);
      usd += km * p.usdPerKm + tons * 0.4;
      hours += km / p.speedKmH;
    }
    return { co2: Math.round(co2), usd: Math.round(usd), hours: Math.round(hours) };
  }, [legs, cities, tons]);

  const baseline = React.useMemo(() => {
    let co2 = 0, usd = 0, hours = 0;
    for (let i = 0; i < legs.length; i++) {
      const a = cities[i], b = cities[i + 1];
      if (!a || !b) continue;
      const km = haversineKm(a, b);
      const p = profiles.Rail;
      co2 += km * p.co2PerKm * (tons / 1000);
      usd += km * p.usdPerKm + tons * 0.4;
      hours += km / p.speedKmH;
    }
    return { co2: Math.round(co2), usd: Math.round(usd), hours: Math.round(hours) };
  }, [cities, tons]);

  // Route editing operations
  const insertCityAt = (preset: GeoCity, index: number) => {
    const id = `n${Date.now()}`;
    const newCity = { ...preset, id };
    setCities((prev) => {
      const next = [...prev];
      next.splice(index, 0, newCity);
      return next;
    });
    setLegs((prev) => {
      const next = [...prev];
      next.splice(index, 0, "Rail");
      return next;
    });
    setSearch("");
  };

  const removeCityAt = (index: number) => {
    if (cities.length <= 2) return;
    setCities((prev) => prev.filter((_, i) => i !== index));
    setLegs((prev) => {
      // Remove the leg that starts at this index, or the last leg if removing last city
      const legIndex = Math.min(index, prev.length - 1);
      return prev.filter((_, i) => i !== legIndex);
    });
  };

  const moveCity = (from: number, to: number) => {
    if (to < 0 || to >= cities.length) return;
    setCities((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    // Also move the associated leg
    setLegs((prev) => {
      const next = [...prev];
      const legFrom = Math.min(from, next.length - 1);
      const legTo = Math.min(to, next.length - 1);
      const [movedLeg] = next.splice(legFrom, 1);
      next.splice(legTo, 0, movedLeg);
      return next;
    });
  };

  const reverseRoute = () => {
    setCities((prev) => [...prev].reverse());
    setLegs((prev) => [...prev].reverse());
  };

  const resetRoute = () => {
    setCities(initialCities);
    setLegs(["Rail", "Truck", "Sea"]);
  };

  const handleAddAfter = (idx: number) => {
    setInsertAfterIndex(idx);
    setSearch("");
    setIsBuilderOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const filteredCities = search.trim()
    ? CITY_PRESETS.filter((c) =>
        c.label.toLowerCase().includes(search.toLowerCase()) &&
        !cities.find((used) => used.label === c.label)
      )
    : [];

  return (
    <div>
      <Topbar title="China Logistics Carbon Simulator" subtitle="Build routes · Compare modes · Optimize emissions" />

      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        {/* Left: Map + Route Timeline */}
        <div className="lg:col-span-8 space-y-4">
          {/* Route Builder — Visual Timeline */}
          <div className="rounded-2xl border bg-surface-overlay">
            {/* Collapsible header — always visible */}
            <button
              onClick={() => setIsBuilderOpen((v) => !v)}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-raised/30 transition rounded-t-2xl"
            >
              <div className="flex items-center gap-2">
                <Route className="size-4 text-data-teal" />
                <span className="text-sm font-semibold">Route Builder</span>
                <span className="text-[11px] text-content-subtle">{cities.length} stops · {legs.length} legs</span>
                {/* Collapsed summary pill */}
                {!isBuilderOpen && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border bg-surface text-content-muted">
                    {cities.map((c) => c.label).join(" → ")}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`size-4 text-content-subtle transition-transform duration-200 ${isBuilderOpen ? "rotate-0" : "-rotate-90"}`}
              />
            </button>

            {/* Collapsible body */}
            {isBuilderOpen && (
            <div className="px-4 pb-4">
              <div className="flex items-center justify-end gap-1 mb-3">
                <button
                  onClick={reverseRoute}
                  className="px-2 py-1 rounded-lg border text-[11px] bg-surface hover:bg-surface-raised transition"
                >
                  Reverse
                </button>
                <button
                  onClick={resetRoute}
                  className="px-2 py-1 rounded-lg border text-[11px] bg-surface hover:bg-surface-raised transition text-brand-red"
                >
                  <RotateCcw className="size-3 inline" /> Reset
                </button>
              </div>

            {/* Visual Route Timeline — drag to reorder */}
            <Reorder.Group
              axis="y"
              values={cities}
              onReorder={setCities}
              className="space-y-2"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {cities.map((city, idx) => (
                <CityRow
                  key={city.id}
                  city={city}
                  idx={idx}
                  totalCities={cities.length}
                  legs={legs}
                  onMoveUp={() => moveCity(idx, idx - 1)}
                  onMoveDown={() => moveCity(idx, idx + 1)}
                  onRemove={() => removeCityAt(idx)}
                  onAddAfter={() => handleAddAfter(idx)}
                  isDark={isDark}
                  nextCity={cities[idx + 1]}
                />
              ))}
            </Reorder.Group>

            {/* Search to add / insert cities */}
            <div className="mt-3 relative">
              {insertAfterIndex !== null && (
                <div className="mb-1.5 flex items-center gap-1 text-[10px] text-data-teal">
                  <Plus className="size-3" />
                  Inserting after <b>{cities[insertAfterIndex]?.label}</b>
                  <button
                    onClick={() => setInsertAfterIndex(null)}
                    className="ml-1 text-content-subtle hover:text-content"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-surface transition-colors"
                style={insertAfterIndex !== null ? { borderColor: "rgba(10,209,200,0.55)" } : {}}
              >
                <Search className="size-4 text-content-subtle" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={
                    insertAfterIndex !== null
                      ? `Insert after ${cities[insertAfterIndex]?.label}…`
                      : "Search city to add to end…"
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-content-subtle"
                />
                {(search || insertAfterIndex !== null) && (
                  <button
                    onClick={() => { setSearch(""); setInsertAfterIndex(null); }}
                    className="text-content-subtle hover:text-content"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
              {search && (
                <div className="absolute z-20 left-0 right-0 mt-1 max-h-40 overflow-y-auto rounded-lg border bg-surface shadow-lg">
                  {filteredCities.length === 0 ? (
                    <div className="p-3 text-[11px] text-content-subtle">No cities found</div>
                  ) : (
                    filteredCities.map((c) => {
                      const insertAt = insertAfterIndex !== null ? insertAfterIndex + 1 : cities.length;
                      const prevCity = insertAfterIndex !== null ? cities[insertAfterIndex] : cities[cities.length - 1];
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            insertCityAt(c, insertAt);
                            setInsertAfterIndex(null);
                          }}
                          className="w-full text-left px-3 py-2 text-[11px] hover:bg-surface-raised flex items-center justify-between"
                        >
                          <span>{c.label}</span>
                          <span className="text-content-subtle">
                            {prevCity ? `${haversineKm(prevCity, c).toLocaleString()} km from ${prevCity.label}` : ""}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>
            </div>
            )}
          </div>

          {/* Map Container */}
          <div className="rounded-2xl border bg-surface-overlay p-3 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase tracking-wider text-content-subtle">Map View</div>
              <div className="flex items-center gap-1">
                {(Object.keys(profiles) as Mode[]).map((m) => {
                  const Icon = modeIcon[m];
                  return (
                    <span key={m} className="inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[11px]">
                      <Icon className="size-3" style={{ color: modeColor[m] }} />
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="relative rounded-xl border overflow-hidden" style={{ height: "380px" }}>
              <ChinaMap isDark={isDark} onReady={handleMapReady} onGeoChange={reproject} />

              {/* Route overlay */}
              {pixelNodes.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                  {pixelNodes.slice(0, -1).map((a, i) => {
                    const b = pixelNodes[i + 1];
                    const mode = legs[i];
                    const stroke = modeColor[mode];
                    const cp1x = (a.x + b.x) / 2;
                    const cp1y = Math.min(a.y, b.y) - 40;
                    const path = `M ${a.x} ${a.y} Q ${cp1x} ${cp1y}, ${b.x} ${b.y}`;
                    return (
                      <g key={i}>
                        <path d={path} fill="none" stroke={stroke} strokeOpacity={0.35} strokeWidth={4} />
                        <path d={path} fill="none" stroke={stroke} strokeWidth={2} strokeDasharray="6 5">
                          <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="0.7s" repeatCount="indefinite" />
                        </path>
                        <circle r={4.5} fill={stroke} fillOpacity={0.9}>
                          <animateMotion dur={`${3.5 + i * 0.6}s`} repeatCount="indefinite" path={path} />
                        </circle>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* City labels */}
              {pixelNodes.map((n, idx) => (
                <div
                  key={n.id}
                  style={{ left: n.x, top: n.y, zIndex: 10, position: "absolute", transform: "translate(-50%,-50%)", pointerEvents: "none" }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="size-3.5 rounded-full border-2 border-white shadow-lg"
                      style={{
                        background: idx === 0 ? "#DB0011" : idx === pixelNodes.length - 1 ? "#00C281" : "#0AD1C8",
                        boxShadow: `0 0 10px 2px ${idx === 0 ? "rgba(219,0,17,0.5)" : "rgba(10,209,200,0.45)"}`,
                      }}
                    />
                    <div
                      className="mt-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border whitespace-nowrap leading-tight"
                      style={{ background: isDark ? "rgba(15,26,46,0.92)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)" }}
                    >
                      {n.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* Mode pickers on map */}
              {pixelNodes.slice(0, -1).map((a, i) => {
                const b = pixelNodes[i + 1];
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 - 26;
                return (
                  <div
                    key={`pick-${i}`}
                    style={{ left: mx, top: my, zIndex: 20, position: "absolute", transform: "translate(-50%,-50%)" }}
                  >
                    <div
                      className="flex items-center rounded-full border border-edge/60 px-0.5 py-0.5 shadow-card"
                      style={{ background: isDark ? "rgba(15,26,46,0.88)" : "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)" }}
                    >
                      {(Object.keys(profiles) as Mode[]).map((m) => {
                        const Icon = modeIcon[m];
                        const active = legs[i] === m;
                        return (
                          <button
                            key={m}
                            onClick={() => setLegs((prev: Mode[]) => prev.map((x, j) => (j === i ? m : x)))}
                            title={m}
                            className={`size-6 grid place-items-center rounded-full transition-all ${active ? "text-white scale-110" : "text-content-muted hover:text-content"}`}
                            style={active ? { background: modeColor[m] } : undefined}
                          >
                            <Icon className="size-3" />
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
                <div className="text-[11px] text-content-subtle">Cargo weight</div>
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
                <div className="text-[11px] text-content-subtle">Total route distance</div>
                <div className="text-sm font-medium tabular-nums mt-1">
                  {cities.slice(0, -1).reduce((sum, c, i) => sum + haversineKm(c, cities[i + 1]), 0).toLocaleString()} km
                </div>
                <div className="text-[11px] text-content-subtle mt-0.5">Haversine · {cities.length - 1} legs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Analytics */}
        <div className="lg:col-span-4 rounded-2xl border bg-surface-overlay p-5 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-data-emerald/10 blur-3xl" />
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">Live impact</div>
          <div className="text-sm font-semibold">Scenario vs. all-rail baseline</div>

          <div className="mt-4 space-y-3">
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
              Switch leg 2 to <b>Rail</b> to cut{" "}
              <b className="text-data-emerald">{Math.round(totals.co2 * 0.18)} tCO₂e</b> with only{" "}
              <b>+{Math.round(baseline.hours * 0.04)}h</b> added transit.
            </p>
            <Button size="sm" variant="gradient" className="mt-2 w-full">Apply suggestion</Button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Badge variant="emerald">ESG +1.4</Badge>
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
  betterLow,
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
