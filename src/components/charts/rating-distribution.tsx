"use client";
import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ratingDist } from "@/lib/mock-data";

export function RatingDistributionChart() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer>
        <BarChart
          data={ratingDist}
          margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="rating"
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
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              background: "rgba(8,10,16,0.92)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              color: "white",
              fontSize: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 2, 2]}
            fill="url(#barGrad)"
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}