"use client";
import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

export function ESGScoreRing({
  score = 86,
  confidence = 94,
  size = 220,
}: {
  score?: number;
  confidence?: number;
  size?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const stroke = 12;
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const mv = useMotionValue(0);
  const dash = useTransform(mv, (v) => `${(v / 100) * c} ${c}`);
  const [displayScore, setDisplayScore] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, score, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, score]);

  React.useEffect(() => {
    const unsub = mv.on("change", (v) => setDisplayScore(v));
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringTrack" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={stroke}
          fill="none"
        />
        {/* Active arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringTrack)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          style={
            {
              strokeDasharray: dash as unknown as string,
              filter: "drop-shadow(0 0 6px rgba(20,184,166,0.35))",
            } as React.CSSProperties
          }
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-[10px] uppercase tracking-widest text-content-subtle">
          ESG Score
        </div>
        <div className="text-4xl font-semibold tabular-nums text-gradient-esg">
          {displayScore.toFixed(1)}
        </div>
        <div className="text-[11px] text-content-muted mt-0.5">
          AI confidence {confidence}%
        </div>
      </div>
    </div>
  );
}