"use client";
import * as React from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileSearch,
  Leaf,
  Bot,
  Banknote,
  BarChart3,
  Globe2,
  Search
} from "lucide-react";

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const PaletteCtx = React.createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(PaletteCtx);
  if (!ctx) throw new Error("CommandPalette context missing");
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <PaletteCtx.Provider value={{ open, setOpen }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command Menu" className="w-full">
              <div className="flex items-center gap-2 px-4 border-b">
                <Search className="size-4 text-content-subtle" />
                <Command.Input
                  placeholder="Search pages, suppliers, ESG metrics…"
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-content-subtle"
                />
                <kbd className="text-[10px] text-content-subtle border rounded px-1.5 py-0.5">ESC</kbd>
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-6 text-center text-sm text-content-subtle">
                  No results found.
                </Command.Empty>
                <Command.Group heading="Navigate" className="text-[11px] uppercase tracking-wider text-content-subtle px-2">
                  <Item icon={<LayoutDashboard className="size-4" />} onSelect={() => go("/dashboard")}>
                    Dashboard Overview
                  </Item>
                  <Item icon={<FileSearch className="size-4" />} onSelect={() => go("/tenders")}>
                    Tenders & Procurement
                  </Item>
                  <Item icon={<Leaf className="size-4" />} onSelect={() => go("/simulator")}>
                    Carbon Simulation
                  </Item>
                  <Item icon={<Banknote className="size-4" />} onSelect={() => go("/financing")}>
                    ESG Financing
                  </Item>
                  <Item icon={<Bot className="size-4" />} onSelect={() => go("/copilot")}>
                    AI Sustainability Copilot
                  </Item>
                  <Item icon={<BarChart3 className="size-4" />} onSelect={() => go("/reports")}>
                    Analytics & Reporting
                  </Item>
                  <Item icon={<Globe2 className="size-4" />} onSelect={() => go("/")}>
                    Landing Page
                  </Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </PaletteCtx.Provider>
  );
}

function Item({
  children,
  icon,
  onSelect
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm aria-selected:bg-surface-raised"
    >
      <span className="text-content-muted">{icon}</span>
      <span>{children}</span>
    </Command.Item>
  );
}
