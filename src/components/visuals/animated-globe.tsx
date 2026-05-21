"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { globeNodes } from "@/lib/mock-data";

function project(lat: number, lng: number, rotation: number, r: number) {
  const phi = (lat * Math.PI) / 180;
  const theta = ((lng + rotation) * Math.PI) / 180;
  const x = r * Math.cos(phi) * Math.sin(theta);
  const y = -r * Math.sin(phi);
  const z = r * Math.cos(phi) * Math.cos(theta);
  return { x, y, z };
}

const ARCS: [number, number][] = [
  [0, 1], [0, 2], [2, 3], [3, 4], [1, 5], [0, 5],
  [3, 9], [9, 7], [4, 7], [10, 0], [11, 6], [6, 8],
];

export function AnimatedGlobe({ size = 520 }: { size?: number }) {
  const [rotation, setRotation] = React.useState(0);
  const r = size / 2 - 24;
  const cx = size / 2;
  const cy = size / 2;

  React.useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setRotation((p) => (p + dt * 5) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nodes = globeNodes.map((n) => ({
    ...n,
    ...project(n.lat, n.lng, rotation, r),
  }));

  const lats = [-60, -30, 0, 30, 60];
  const lngs = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Ambient glow behind globe */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(20,184,166,0.12), rgba(99,102,241,0.04) 40%, transparent 65%)",
          filter: "blur(16px)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative"
      >
        <defs>
          <radialGradient id="gf2" cx="42%" cy="35%" r="68%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#0A0A14" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#050508" stopOpacity="0.96" />
          </radialGradient>
          <linearGradient id="arcGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Globe body */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="url(#gf2)"
          stroke="rgba(255,255,255,0.04)"
        />

        {/* Latitude bands */}
        {lats.map((lat) => {
          const y = -r * Math.sin((lat * Math.PI) / 180);
          const rx = r * Math.cos((lat * Math.PI) / 180);
          return (
            <ellipse
              key={`la-${lat}`}
              cx={cx}
              cy={cy + y}
              rx={rx}
              ry={rx * 0.16}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Longitude meridians */}
        {lngs.map((lng) => {
          const tilt = ((lng + rotation) * Math.PI) / 180;
          const rx = Math.abs(r * Math.sin(tilt));
          if (rx < 1) return null;
          const opacity = 0.03 + 0.08 * Math.abs(Math.cos(tilt));
          return (
            <ellipse
              key={`lo-${lng}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={r}
              fill="none"
              stroke={`rgba(20,184,166,${opacity})`}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Route arcs */}
        {ARCS.map(([a, b], i) => {
          const A = nodes[a];
          const B = nodes[b];
          if (!A || !B) return null;
          const visible = A.z > -r * 0.2 || B.z > -r * 0.2;
          if (!visible) return null;
          const mx = (cx + A.x + cx + B.x) / 2;
          const my = (cy + A.y + cy + B.y) / 2;
          const dx = B.x - A.x;
          const dy = B.y - A.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const lift = Math.min(100, dist * 0.4);
          const px = mx;
          const py = my - lift;
          const path = `M ${cx + A.x} ${cy + A.y} Q ${px} ${py} ${cx + B.x} ${cy + B.y}`;
          return (
            <g key={i}>
              <path
                d={path}
                fill="none"
                stroke="url(#arcGrad2)"
                strokeWidth={1}
                opacity={0.45}
              />
              <motion.circle
                r={1.8}
                fill="#5EEAD4"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{
                  duration: 3.2 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 6) * 0.5,
                }}
                style={
                  {
                    offsetPath: `path('${path}')`,
                    offsetRotate: "auto",
                  } as React.CSSProperties
                }
              />
            </g>
          );
        })}

        {/* City nodes */}
        {nodes.map((n) => {
          const visible = n.z > -r * 0.05;
          if (!visible) return null;
          const opacity = 0.5 + 0.5 * (n.z / r);
          return (
            <g
              key={n.label}
              transform={`translate(${cx + n.x} ${cy + n.y})`}
              opacity={opacity}
            >
              <circle
                r={5}
                fill="rgba(20,184,166,0.12)"
                className="animate-pulseRing"
              />
              <circle r={2} fill="#5EEAD4" />
              <circle
                r={3.5}
                fill="none"
                stroke="rgba(20,184,166,0.55)"
                strokeWidth={0.6}
              />
              {n.intensity > 0.85 && (
                <text
                  x={7.5}
                  y={2.5}
                  fontSize={8.5}
                  fill="rgba(255,255,255,0.7)"
                  className="select-none"
                  style={{ fontFamily: "ui-monospace, monospace" }}
                >
                  {n.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Outer orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 10}
          fill="none"
          stroke="rgba(20,184,166,0.14)"
          strokeDasharray="2 8"
          strokeWidth={0.8}
          className="animate-spinSlow"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
    </div>
  );
}