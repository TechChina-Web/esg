"use client";
import * as React from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supplyDamageData } from "@/lib/mock-data";

function barColor(rate: number) {
  if (rate >= 25) return "#EF4444";
  if (rate >= 15) return "#F59E0B";
  return "#14B8A6";
}

const tooltipStyle = {
  background: "rgba(8,10,16,0.92)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

export function SupplyDamageChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={supplyDamageData}
          margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 40]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 11, opacity: 0.45 }}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="supply"
            width={82}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 11, opacity: 0.65 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={tooltipStyle}
            formatter={(value: number) => [`${value}%`, "Damage Rate"]}
          />
          <Bar dataKey="damageRate" radius={[0, 4, 4, 0]} animationDuration={1200}>
            {supplyDamageData.map((entry) => (
              <Cell key={entry.supply} fill={barColor(entry.damageRate)} />
            ))}
            <LabelList
              dataKey="damageRate"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{ fill: "currentColor", fontSize: 11, opacity: 0.6 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
