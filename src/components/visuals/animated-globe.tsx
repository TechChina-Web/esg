"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { globeNodes } from "@/lib/mock-data";
import { useTheme } from "next-themes";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function AnimatedGlobe({ size = 520 }: { size?: number }) {
  const { resolvedTheme } = useTheme();
  const globeEl = React.useRef<any>();
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  // Auto-rotate
  React.useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.8;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.controls().enablePan = false;
    }
  }, []);

  const nodeData = globeNodes.map((n, i) => ({
    lat: n.lat,
    lng: n.lng,
    label: n.label,
    intensity: n.intensity,
    color: isDark ? "#14B8A6" : "#0D9488",
    size: n.intensity > 0.85 ? 1.5 : 1,
  }));

  const arcData = [
    { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.006 },
    { startLat: 51.5074, startLng: -0.1278, endLat: 1.3521, endLng: 103.8198 },
    { startLat: 1.3521, startLng: 103.8198, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 31.2304, endLng: 121.4737 },
    { startLat: 40.7128, startLng: -74.006, endLat: 25.2048, endLng: 55.2708 },
    { startLat: 51.5074, startLng: -0.1278, endLat: 25.2048, endLng: 55.2708 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 35.6762, endLng: 139.6503 },
    { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093 },
    { startLat: 31.2304, startLng: 121.4737, endLat: -33.8688, endLng: 151.2093 },
    { startLat: 31.2304, startLng: 121.4737, endLat: 51.5074, endLng: -0.1278 },
    { startLat: -33.8688, startLng: 151.2093, endLat: 19.4326, endLng: -99.1332 },
    { startLat: 19.4326, startLng: -99.1332, endLat: -23.5505, endLng: -46.6333 },
  ];

  if (!mounted) {
    return (
      <div style={{ width: size, height: size }} className="flex items-center justify-center">
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
        pointsData={nodeData}
        pointColor="color"
        pointAltitude={0.02}
        pointRadius="size"
        pointResolution={3}
        arcsData={arcData}
        arcColor={() => isDark ? "rgba(20,184,166,0.6)" : "rgba(13,148,136,0.6)"}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        arcStroke={1}
        arcCurveResolution={50}
        arcAltitude={0.05}
        onGlobeReady={() => {
          if (globeEl.current) {
            globeEl.current.pointOfView({ altitude: 2.2 });
          }
        }}
      />
    </div>
  );
}