"use client";
import { Topbar } from "@/components/app/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Globe2, Lock, Palette, Shield, User2 } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <div>
      <Topbar title="Settings" subtitle="Manage your workspace, preferences and security" />
      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <aside className="lg:col-span-3 rounded-2xl border bg-surface-overlay p-3 h-fit">
          <ul className="text-sm">
            {[
              { k: "Profile", i: User2, on: true },
              { k: "Organization", i: Globe2, on: false },
              { k: "Appearance", i: Palette, on: false },
              { k: "Notifications", i: Bell, on: false },
              { k: "Security", i: Lock, on: false },
              { k: "Compliance", i: Shield, on: false }
            ].map(({ k, i: I, on }) => (
              <li key={k} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${on ? "bg-surface-raised" : "hover:bg-surface-raised text-content-muted"}`}>
                <I className="size-4" /> {k}
              </li>
            ))}
          </ul>
        </aside>

        <section className="lg:col-span-9 space-y-4">
          <div className="rounded-2xl border bg-surface-overlay p-5">
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">Profile</div>
            <div className="mt-3 flex items-center gap-4">
              <div className="size-16 rounded-full bg-esg-gradient grid place-items-center text-white font-bold text-xl">AY</div>
              <div className="flex-1">
                <div className="text-base font-semibold">Alex Young</div>
                <div className="text-xs text-content-muted">Sustainability Lead · HSBC Holdings plc</div>
              </div>
              <Button variant="outline">Change avatar</Button>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <Field label="Full name" value="Alex Young" />
              <Field label="Email" value="alex.young@hsbc.com" />
              <Field label="Role" value="Sustainability Lead" />
              <Field label="Region" value="EMEA · United Kingdom" />
            </div>
          </div>

          <div className="rounded-2xl border bg-surface-overlay p-5">
            <div className="text-[10px] uppercase tracking-wider text-content-subtle">Appearance</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { k: "system", label: "System" },
                { k: "light", label: "Light" },
                { k: "dark", label: "Dark" }
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTheme(t.k)}
                  className={`px-3 h-9 rounded-xl border text-sm ${mounted && theme === t.k ? "bg-surface-raised ring-soft" : "hover:bg-surface-raised"}`}
                >
                  {t.label} {mounted && theme === t.k && <Check className="size-3 inline ml-1 text-data-emerald" />}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-surface-overlay p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-content-subtle">Compliance</div>
                <div className="text-sm font-semibold">ISO 14064 · TCFD · CSRD · ISSB</div>
              </div>
              <Badge variant="emerald">All aligned</Badge>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <div className="text-[10px] uppercase tracking-wider text-content-subtle">{label}</div>
      <input
        defaultValue={value}
        className="mt-1 w-full h-10 px-3 rounded-xl border bg-surface outline-none text-sm focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2"
      />
    </label>
  );
}
