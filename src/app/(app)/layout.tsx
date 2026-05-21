import * as React from "react";
import { Sidebar } from "@/components/app/sidebar";
import { MobileNav } from "@/components/app/mobile-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <main className="flex-1 min-w-0 px-4 lg:px-8 pb-24 lg:pb-10">{children}</main>
      <MobileNav />
    </div>
  );
}
