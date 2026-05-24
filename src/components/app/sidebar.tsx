"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  FileSearch,
  Leaf,
  Banknote,
  Bot,
  BarChart3,
  Settings,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/tenders", label: "Tenders", icon: FileSearch },
  { href: "/simulator", label: "Carbon Sim", icon: Leaf },
  { href: "/financing", label: "Green Finance", icon: Banknote },
  { href: "/copilot", label: "AI Copilot", icon: Bot },
  { href: "/reports", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[244px] shrink-0 flex-col border-r border-edge bg-surface/70 backdrop-blur-xl">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-2.5">
        <div className="size-10 rounded-lg bg-white grid place-items-center">
          <Image
            src="/esg/bank-hsbc.svg"
            alt="HSBC Logo"
            width={64}
            height={64}
            className="size-8"
          />
        </div>
        <div className="leading-tight min-w-0">
          <div className="text-sm font-semibold truncate">HSBC ESG</div>
          <div className="text-[10px] text-content-disabled tracking-wider uppercase">
            Sustainability OS
          </div>
        </div>
      </div>

      {/* Landing link */}
      <div className="px-2.5">
        <div className="text-[10px] tracking-wider uppercase text-content-disabled px-2 mt-1 mb-1.5">
          Home
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm text-content-muted hover:text-content hover:bg-surface-raised transition-colors"
        >
          <Globe2 className="size-4" /> Landing Page
        </Link>
      </div>

      {/* Main nav */}
      <nav className="px-2.5 py-3 flex-1">
        <div className="text-[10px] tracking-wider uppercase text-content-disabled px-2 mb-1.5">
          Modules
        </div>
        <ul className="space-y-0.5">
          {items.map((it) => {
            const active = path?.startsWith(it.href);
            const Icon = it.icon;
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={cn(
                    "relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors",
                    active
                      ? "text-content font-medium"
                      : "text-content-muted hover:text-content hover:bg-surface-raised"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg bg-surface-raised border border-edge"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="size-4 relative shrink-0" />
                  <span className="relative truncate">{it.label}</span>
                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-brand-red relative shrink-0 shadow-[0_0_8px_rgba(199,5,18,0.5)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-2.5 pb-4">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-content-muted hover:bg-surface-raised transition-colors"
        >
          <Settings className="size-4" /> Settings
        </Link>
        <div className="mt-2.5 mx-1 rounded-xl border border-edge bg-surface-sunken p-3">
          <div className="text-[10px] text-content-subtle uppercase tracking-wider">
            Net-Zero progress
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-surface overflow-hidden">
            <div className="h-full bar-esg" style={{ width: "62%" }} />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px]">
            <span className="text-content-muted">2026 target</span>
            <span className="text-content font-medium">62%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}