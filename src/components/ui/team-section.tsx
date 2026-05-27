"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define interfaces for props
interface SocialLink {
  icon: React.ElementType;
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description: string;
  members: TeamMember[];
  registerLink?: string;
  logo?: React.ReactNode;
  socialLinksMain?: SocialLink[];
}

const cardAccents = [
  {
    shimmer: "via-[#14B8A6]/50",
    hover: "hover:border-[#14B8A6]/40 hover:shadow-[0_0_28px_-4px_rgba(20,184,166,0.18)]",
    label: "text-data-teal",
    socialHover: "hover:border-[#14B8A6]/40 hover:text-data-teal",
  },
  {
    shimmer: "via-[#10B981]/50",
    hover: "hover:border-[#10B981]/40 hover:shadow-[0_0_28px_-4px_rgba(16,185,129,0.18)]",
    label: "text-data-emerald",
    socialHover: "hover:border-[#10B981]/40 hover:text-data-emerald",
  },
  {
    shimmer: "via-[#6366F1]/50",
    hover: "hover:border-[#6366F1]/40 hover:shadow-[0_0_28px_-4px_rgba(99,102,241,0.18)]",
    label: "text-data-indigo",
    socialHover: "hover:border-[#6366F1]/40 hover:text-data-indigo",
  },
  {
    shimmer: "via-[#F59E0B]/50",
    hover: "hover:border-[#F59E0B]/40 hover:shadow-[0_0_28px_-4px_rgba(245,158,11,0.18)]",
    label: "text-data-amber",
    socialHover: "hover:border-[#F59E0B]/40 hover:text-data-amber",
  },
  {
    shimmer: "via-[#0EA5E9]/50",
    hover: "hover:border-[#0EA5E9]/40 hover:shadow-[0_0_28px_-4px_rgba(14,165,233,0.18)]",
    label: "text-data-sky",
    socialHover: "hover:border-[#0EA5E9]/40 hover:text-data-sky",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// TeamSection Component
export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  ({ title, description, members, socialLinksMain, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative w-full overflow-hidden py-16 md:py-24", className)}
        {...props}
      >
        <div className="aurora-bg" />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, black 20%, transparent 65%)",
          }}
        />

        <div className="container relative z-10 px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl mb-14"
          >
            <Badge variant="teal" className="mb-5">
              Our Team
            </Badge>
            <h1 className="text-[2.75rem] sm:text-5xl font-semibold tracking-tight leading-[1.06] text-content">
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-content-muted max-w-xl leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {members.map((member, index) => {
              const accent = cardAccents[index % cardAccents.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: index * 0.07, duration: 0.55 }}
                  className={cn(
                    "group relative flex flex-col items-center overflow-hidden rounded-xl border border-edge bg-surface-overlay p-5 text-center transition-all duration-200",
                    accent.hover
                  )}
                >
                  {/* Top accent shimmer line */}
                  <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent", accent.shimmer)} />

                  {/* Avatar */}
                  <div className="relative mb-4 h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-2 border-edge bg-surface-raised transition-transform duration-300 group-hover:scale-105">
                    {member.imageSrc && !member.imageSrc.includes("placeholder") ? (
                      <img
                        src={member.imageSrc}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-surface-sunken">
                        <User className="size-8 text-content-disabled" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-content leading-snug">
                    {member.name}
                  </h3>
                  <p className={cn("mt-0.5 text-[10px] font-medium uppercase tracking-widest", accent.label)}>
                    {member.designation}
                  </p>

                  {/* Social Links */}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="mt-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {member.socialLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full border border-edge bg-surface-raised text-content-subtle transition-colors",
                            accent.socialHover
                          )}
                        >
                          <link.icon className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Main Social Links */}
          {socialLinksMain && socialLinksMain.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              {socialLinksMain.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-surface-overlay text-content-subtle transition-colors hover:border-edge-strong hover:text-content"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
);

TeamSection.displayName = "TeamSection";
