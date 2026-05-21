import * as React from "react";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  neutral: "bg-surface-raised text-content-muted border border-edge",
  teal: "bg-data-teal/10 text-data-teal border border-data-teal/20",
  emerald: "bg-data-emerald/10 text-data-emerald border border-data-emerald/20",
  indigo: "bg-data-indigo/10 text-data-indigo border border-data-indigo/20",
  amber: "bg-data-amber/10 text-data-amber border border-data-amber/20",
  rose: "bg-data-rose/10 text-data-rose border border-data-rose/20",
  sky: "bg-data-sky/10 text-data-sky border border-data-sky/20",
  red: "bg-brand-red/8 text-brand-red border border-brand-red/15",
  green: "bg-data-emerald/10 text-data-emerald border border-data-emerald/20",
};

export function Badge({
  variant = "neutral",
  className,
  children,
}: {
  variant?: keyof typeof styles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        styles[variant] ?? styles.neutral,
        className
      )}
    >
      {children}
    </span>
  );
}
