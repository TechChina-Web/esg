"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { officeLocations, cityRoutes } from "@/lib/mock-data";
import { useTheme } from "next-themes";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const cityCoordMap = Object.fromEntries(
  officeLocations.map((o) => [o.city, { lat: o.lat, lng: o.lng }])
);

const interCityArcs = cityRoutes
  .filter((r) => r.scope === "inter-city")
  .map((r) => {
    const start = cityCoordMap[r.from];
    const end = cityCoordMap[r.to];
    if (!start || !end) return null;
    return { startLat: start.lat, startLng: start.lng, endLat: end.lat, endLng: end.lng, status: r.status };
  })
  .filter(Boolean) as { startLat: number; startLng: number; endLat: number; endLng: number; status: string }[];

export function OfficeGlobe({ size = 400 }: { size?: number }) {
  const { resolvedTheme } = useTheme();
  const globeEl = React.useRef<any>();
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  React.useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enablePan = false;
    }
  }, []);

  const pointData = officeLocations.map((o) => ({
    lat: o.lat,
    lng: o.lng,
    label: o.city,
    offices: o.offices,
    size: 0.4 + (o.offices / 12) * 1.2,
    color: isDark ? "#14B8A6" : "#0D9488",
  }));

  const htmlData = officeLocations.map((o) => ({
    lat: o.lat,
    lng: o.lng,
    city: o.city,
    offices: o.offices,
  }));

  const makeEl = React.useCallback(
    (d: (typeof htmlData)[0]) => {
      const el = document.createElement("div");
      el.style.cssText = `
        display:flex;flex-direction:column;align-items:center;pointer-events:none;
        transform:translateY(-28px);
      `;
      el.innerHTML = `
        <div style="
          background:rgba(8,10,16,0.82);
          border:1px solid rgba(20,184,166,0.4);
          border-radius:6px;padding:2px 6px;
          font-size:10px;line-height:1.4;
          color:#e2e8f0;white-space:nowrap;
          backdrop-filter:blur(8px);
        ">
          <span style="font-weight:600;">${d.city}</span>
          <span style="color:#14B8A6;margin-left:4px;">${d.offices}</span>
        </div>
      `;
      return el;
    },
    []
  );

  if (!mounted) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center"
      >
        <div className="text-content-subtle text-sm">Loading globe...</div>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }}>
      <Globe
        ref={globeEl}
        width={size}
        height={size}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl={null}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor={isDark ? "rgba(20,184,166,0.3)" : "rgba(13,148,136,0.3)"}
        atmosphereAltitude={0.15}
        backgroundColor="rgba(0,0,0,0)"
        pointsData={pointData}
        pointColor="color"
        pointAltitude={0.02}
        pointRadius="size"
        pointResolution={4}
        htmlElementsData={htmlData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.05}
        htmlElement={makeEl as any}
        arcsData={interCityArcs}
        arcColor={(d: any) =>
          d.status === "Delayed"
            ? "rgba(245,158,11,0.7)"
            : d.status === "At Risk"
            ? "rgba(239,68,68,0.7)"
            : isDark
            ? "rgba(20,184,166,0.6)"
            : "rgba(13,148,136,0.6)"
        }
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={1.2}
        arcAltitude={0.08}
        onGlobeReady={() => {
          if (globeEl.current) {
            globeEl.current.pointOfView({ lat: 32, lng: 112, altitude: 2.0 });
          }
        }}
      />
    </div>
  );
}
