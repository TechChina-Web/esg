"use client";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { emissions } from "@/lib/mock-data";

export function EmissionsAreaChart() {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <AreaChart data={emissions} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="sc3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.42} />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sc2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.38} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="sc1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.38} />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
            <filter id="em-glow">
              <feGaussianBlur stdDeviation="0.8" />
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
            contentStyle={{
              background: "rgba(8,10,16,0.92)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              color: "white",
              fontSize: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, opacity: 0.6 }} />
          <Area
            type="monotone"
            dataKey="scope3"
            stroke="#14B8A6"
            strokeWidth={2}
            fill="url(#sc3)"
            filter="url(#em-glow)"
            animationDuration={1200}
          />
          <Area
            type="monotone"
            dataKey="scope2"
            stroke="#6366F1"
            strokeWidth={2}
            fill="url(#sc2)"
            animationDuration={1400}
          />
          <Area
            type="monotone"
            dataKey="scope1"
            stroke="#F59E0B"
            strokeWidth={2}
            fill="url(#sc1)"
            animationDuration={1600}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}