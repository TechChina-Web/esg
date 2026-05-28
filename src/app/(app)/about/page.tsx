"use client";
import React, { useState } from "react";
import { TeamSection } from "@/components/ui/team-section";
import { Linkedin, AlertTriangle, Shield, Copyright, Github } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "team", label: "Team" },
  { id: "legal", label: "Legal Notice" },
] as const;

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("team");

  const teamMembers = [
    {
      name: "Dana Guo",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D4D03AQGoqbdZnbibmg/profile-displayphoto-scale_200_200/B4DZjhlYEuGQAo-/0/1756131344944?e=2147483647&v=beta&t=L92lKP42eU3uKDMlJ7B91yJOkKEo13ZyKdYfIi-Abd4",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Oscar Xiao",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D4E03AQFgGCCpmUj9rw/profile-displayphoto-scale_200_200/B4EZfzg3E2HEAY-/0/1752137169585?e=2147483647&v=beta&t=StuMa7JVWEFm7Xn7xELWUKQKrnCUFtOSfdhoOKJp_XU",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Taili Li",
      designation: "Team Member",
      imageSrc:
        "https://media.licdn.com/dms/image/v2/D5603AQFagoNzcFTJtQ/profile-displayphoto-scale_200_200/B56ZjVRkuXHQAc-/0/1755924812654?e=2147483647&v=beta&t=qhkWBOxGa7W07hJniEPTKDGA2vIrgggyIPIM7IoZWCc",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Jim",
      designation: "Team Member",
      imageSrc: "https://via.placeholder.com/200",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
    {
      name: "Mike Zhong",
      designation: "Team Member",
      imageSrc: "https://via.placeholder.com/200",
      socialLinks: [{ icon: Linkedin, href: "#" }],
    },
  ];

  const subtitle =
    activeTab === "team"
      ? "Meet the team behind the platform"
      : "Disclaimer, Copyright & Privacy Policy";

  return (
    <div className="min-h-screen">
      <Topbar title="About Us" subtitle={subtitle} />

      {/* Tabs */}
      <div className="px-4 lg:px-8 pt-4">
        <div className="flex items-center gap-1 p-1 rounded-xl border border-edge bg-surface-overlay w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-content"
                  : "text-content-muted hover:text-content"
              )}
            >
              {activeTab === tab.id && (
                <span className="absolute inset-0 rounded-lg bg-surface-raised border border-edge" />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === "team" && (
        <TeamSection
          title={
            <>
              The people driving{" "}
              <span className="text-gradient-esg">net-zero</span> forward.
            </>
          }
          description="A cross-functional group of sustainability analysts, engineers, and product specialists dedicated to accelerating HSBC's journey to net zero."
          members={teamMembers}
        />
      )}

      {activeTab === "legal" && (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
          {/* Demo Disclaimer */}
          <section className="rounded-2xl border border-edge bg-surface-overlay p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-xl border border-edge bg-data-amber/10 grid place-items-center shrink-0">
                <AlertTriangle className="size-6 text-data-amber" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-content tracking-tight">
                  Demonstration Only
                </h2>
                <p className="text-xs text-content-muted uppercase tracking-wider mt-0.5">
                  Demo Disclaimer
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-content-muted leading-relaxed">
              <p>
                This application is a <strong className="text-content">personal demonstration project</strong> built by an HSBC employee. All data, charts, metrics, and analytical results presented herein are <strong className="text-content">simulated or incomplete</strong> and are intended solely for illustrative purposes.
              </p>
              <p>
                Nothing on this site constitutes investment, commercial, legal, or professional advice. The content should not be relied upon for decision-making of any kind.
              </p>
            </div>
          </section>

          {/* Copyright & Attribution */}
          <section className="rounded-2xl border border-edge bg-surface-overlay p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-xl border border-edge bg-data-teal/10 grid place-items-center shrink-0">
                <Copyright className="size-6 text-data-teal" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-content tracking-tight">
                  Copyright & Attribution
                </h2>
                <p className="text-xs text-content-muted uppercase tracking-wider mt-0.5">
                  Intellectual Property Notice
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-content-muted leading-relaxed">
              <p>
                This project is <strong className="text-content">not an official HSBC product or service</strong> and does not represent the views, positions, or endorsements of HSBC Holdings plc or any of its affiliates.
              </p>
              <p>
                All HSBC-related assets — including but not limited to the HSBC logo, brand marks, trade dress, and colour schemes — are the exclusive property of HSBC Group. They are used in this project under fair use for non-commercial, educational, and demonstration purposes only.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="rounded-2xl border border-edge bg-surface-overlay p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-xl border border-edge bg-data-emerald/10 grid place-items-center shrink-0">
                <Shield className="size-6 text-data-emerald" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-content tracking-tight">
                  Privacy Policy
                </h2>
                <p className="text-xs text-content-muted uppercase tracking-wider mt-0.5">
                  Data Collection & Storage
                </p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-content-muted leading-relaxed">
              <p>
                This application is built as a <strong className="text-content">pure client-side (frontend-only)</strong> demonstration. No personal data, usage telemetry, or user-generated content is transmitted to, stored on, or processed by any backend server.
              </p>
              <p>
                All interactions, preferences, and session states remain entirely within your local browser. We do not use cookies, tracking pixels, or analytics scripts. Your privacy is fully respected.
              </p>
            </div>
          </section>

          {/* Open Source */}
          <section className="rounded-2xl border border-edge bg-surface-overlay p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-xl border border-edge bg-data-indigo/10 grid place-items-center shrink-0">
                <Github className="size-6 text-data-indigo" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-content tracking-tight">
                  Open Source
                </h2>
                <p className="text-xs text-content-muted uppercase tracking-wider mt-0.5">
                  Source Code Availability
                </p>
              </div>
            </div>
            <p className="text-sm text-content-muted leading-relaxed">
              This project is open-sourced on GitHub. You are welcome to inspect the source code, open issues, and submit contributions.
            </p>
            <a
              href="https://github.com/TechChina-Web/esg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-edge bg-surface-raised text-sm font-medium text-content hover:border-edge-strong hover:text-data-indigo transition-colors"
            >
              <Github className="size-4" />
              github.com/TechChina-Web/esg
            </a>
          </section>
        </div>
      )}
    </div>
  );
}
