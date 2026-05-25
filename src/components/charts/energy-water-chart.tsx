"use client";
import * as React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { energyWaterData } from "@/lib/mock-data";

function AnomalyDot(props: any) {
  const { cx, cy, payload } = props;
  if (!payload?.anomaly) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="rgba(239,68,68,0.15)" />
      <circle cx={cx} cy={cy} r={6}  fill="rgba(239,68,68,0.3)" />
      <circle cx={cx} cy={cy} r={4}  fill="#EF4444" />
    </g>
  );
}

function NormalDot(props: any) {
  const { cx, cy, payload } = props;
  if (payload?.anomaly) return null;
  return <circle cx={cx} cy={cy} r={3} fill={props.stroke} />;
}

const tooltipStyle = {
  background: "rgba(8,10,16,0.92)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

export function EnergyWaterChart() {
  const anomalyMonth = energyWaterData.find((d) => d.anomaly)?.month ?? "";

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <LineChart
          data={energyWaterData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <defs>
            <filter id="glow-energy">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeDasharray: "3 3" }}
            contentStyle={tooltipStyle}
            formatter={(value: number, name: string) => [
              name === "energy" ? `${value} kWh/person` : `${value} m³/person`,
              name === "energy" ? "Energy" : "Water",
            ]}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, opacity: 0.6 }}
            formatter={(v) => (v === "energy" ? "Energy (kWh/person)" : "Water (m³/person)")}
          />
          {anomalyMonth && (
            <ReferenceLine
              x={anomalyMonth}
              stroke="rgba(239,68,68,0.4)"
              strokeDasharray="4 3"
              label={{
                value: "Anomaly",
                position: "top",
                fill: "#EF4444",
                fontSize: 10,
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="energy"
            stroke="#14B8A6"
            strokeWidth={2}
            dot={<NormalDot stroke="#14B8A6" />}
            activeDot={{ r: 5, fill: "#14B8A6" }}
            animationDuration={1200}
            filter="url(#glow-energy)"
          />
          <Line
            type="monotone"
            dataKey="water"
            stroke="#6366F1"
            strokeWidth={2}
            dot={(props: any) => {
              if (props.payload?.anomaly) return <AnomalyDot {...props} />;
              return <NormalDot {...props} stroke="#6366F1" />;
            }}
            activeDot={{ r: 5, fill: "#6366F1" }}
            animationDuration={1400}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
