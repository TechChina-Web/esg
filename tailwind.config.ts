import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1440px" } },
    extend: {
      colors: {
        brand: {
          red: "#C70512",
          "red-hover": "#A0040E",
          "red-muted": "rgba(199,5,18,0.12)",
        },
        data: {
          teal: "#14B8A6",
          emerald: "#10B981",
          indigo: "#6366F1",
          amber: "#F59E0B",
          rose: "#F43F5E",
          sky: "#0EA5E9",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
          sunken: "hsl(var(--surface-sunken))",
        },
        content: {
          DEFAULT: "hsl(var(--content))",
          muted: "hsl(var(--content-muted))",
          subtle: "hsl(var(--content-subtle))",
          disabled: "hsl(var(--content-disabled))",
        },
        edge: {
          DEFAULT: "hsl(var(--edge))",
          subtle: "hsl(var(--edge-subtle))",
          strong: "hsl(var(--edge-strong))",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Inter",
          "Helvetica Neue",
          "Arial",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.02) inset, 0 1px 3px rgba(0,0,0,0.18)",
        elevated:
          "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 2px 8px rgba(0,0,0,0.24), 0 8px 32px rgba(0,0,0,0.16)",
        ring: "0 0 0 1px rgba(199,5,18,0.28), 0 0 0 3px rgba(199,5,18,0.08)",
        glow: "0 0 40px -4px rgba(20,184,166,0.14)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #C70512 0%, #8B000A 100%)",
        "esg-gradient":
          "linear-gradient(135deg, #0F172A 0%, #14B8A6 45%, #10B981 100%)",
        "data-gradient":
          "linear-gradient(135deg, #14B8A6 0%, #6366F1 50%, #10B981 100%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.92)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 7s ease-in-out infinite",
        pulseRing: "pulseRing 2.6s cubic-bezier(0.22,0.61,0.36,1) infinite",
        spinSlow: "spinSlow 20s linear infinite",
        fadeIn: "fadeIn 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
