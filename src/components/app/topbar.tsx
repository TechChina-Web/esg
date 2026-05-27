"use client";
import { Search, Bell, ChevronDown, Command as CmdIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCommandPalette } from "@/components/command-palette";
import { Badge } from "@/components/ui/badge";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { setOpen } = useCommandPalette();
  return (
    <header className="sticky top-0 z-40 -mx-4 lg:-mx-8 px-4 lg:px-8 py-3.5 backdrop-blur-xl bg-surface/75 border-b border-edge">
      <div className="flex items-center gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-content-subtle">
            <span>HSBC Holdings plc</span>
            <span className="text-content-disabled">·</span>
            <span className="hidden sm:inline">Group Sustainability</span>
            <Badge variant="teal" className="ml-0.5">LIVE</Badge>
          </div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight truncate text-content">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[12px] text-content-muted truncate">{subtitle}</p>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-edge bg-surface-overlay hover:bg-surface-raised text-sm text-content-muted w-64 transition"
          >
            <Search className="size-4 shrink-0" />
            <span className="flex-1 text-left truncate">Search anything…</span>
            <span className="flex items-center gap-0.5 text-[10px] text-content-subtle shrink-0">
              <CmdIcon className="size-3" />K
            </span>
          </button>

          {/* Notification bell */}
          <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-edge bg-surface-overlay hover:bg-surface-raised transition">
            <Bell className="size-4 text-content-muted" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-brand-red shadow-[0_0_6px_rgba(199,5,18,0.6)]" />
          </button>

          <ThemeToggle />

          {/* User avatar */}
          <button className="hidden sm:flex items-center gap-2 h-9 pl-1 pr-3 rounded-full border border-edge bg-surface-overlay hover:bg-surface-raised transition">
            <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[11px] font-bold text-white">
              AY
            </span>
            <span className="text-xs leading-tight text-left">
              <div className="font-medium text-content">Admin </div>
              <div className="text-content-subtle">Sustainability Lead</div>
            </span>
            <ChevronDown className="size-3 text-content-disabled" />
          </button>
        </div>
      </div>
    </header>
  );
}