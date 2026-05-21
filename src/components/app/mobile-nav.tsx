"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileSearch, Leaf, Bot, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/tenders", label: "Tenders", icon: FileSearch },
  { href: "/simulator", label: "Sim", icon: Leaf },
  { href: "/copilot", label: "Copilot", icon: Bot },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function MobileNav() {
  const path = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-50 glass rounded-2xl shadow-elevated">
      <ul className="grid grid-cols-5">
        {items.map((it) => {
          const active = path?.startsWith(it.href);
          const Icon = it.icon;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors",
                  active
                    ? "text-brand-red"
                    : "text-content-muted hover:text-content"
                )}
              >
                <Icon className="size-5" />
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}