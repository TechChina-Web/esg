import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-edge bg-surface-overlay shadow-card",
        "transition-shadow duration-200 hover:border-edge-strong",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  ...p
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-4 pb-2 flex items-start justify-between gap-3", className)}
      {...p}
    />
  );
}

export function CardTitle({
  className,
  ...p
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[11px] font-medium text-content-muted tracking-wider uppercase",
        className
      )}
      {...p}
    />
  );
}

export function CardContent({
  className,
  ...p
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-1", className)} {...p} />;
}
