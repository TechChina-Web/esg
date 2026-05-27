# Supplier Net Zero Accelerator

> AI-powered Net-Zero supply chain intelligence — a frontend-only, Hackathon-grade demo.

Banking-grade UI inspired by HSBC, Stripe, Linear and Bloomberg Terminal. Built with Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion, Recharts and shadcn-style primitives.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Modules

| Route | Description |
|---|---|
| `/` | Landing page — Hero, animated globe, KPI strip, feature grid, dashboard preview, CTA |
| `/dashboard` | ESG operations overview — score ring, Scope 1/2/3 emissions, supplier ratings, top emitters, live globe, AI insights |
| `/tenders` | Tender list with tabs/search/filters, ESG-gated bidding, AI document analysis with streaming output |
| `/tenders/[id]` | Tender detail with candidate suppliers, radar charts, AI confidence |
| `/simulator` | Carbon Simulation Studio — drag nodes, swap transport modes, real-time impact comparison |
| `/financing` | HSBC ESG Financing — green loans, sustainability-linked products, AI eligibility trajectory |
| `/copilot` | AI Sustainability Copilot — streaming chat, generated charts, suggested actions |
| `/reports` | Glassmorphism report viewer (TCFD/CSRD/ISSB-aligned) |
| `/settings` | Profile, appearance (light/dark/system), compliance |

## Stack

- Next.js 14 (App Router) + TypeScript
- TailwindCSS with HSBC red + ESG gradient design tokens
- Framer Motion (page/hover/scroll animations, animated counters)
- Recharts (area, bar, line, radar with gradient fills)
- shadcn-style UI primitives (Button, Card, Badge)
- `cmdk` Command Palette (⌘K / Ctrl+K)
- `next-themes` for dark/light mode (default dark)
- Zustand-ready store layer (mock-data driven for now)

## Design language

- **HSBC Red** `#DB0011` as the brand accent
- **ESG gradient**: deep navy `#0B2A4A` → teal `#0AD1C8` → green `#00C281`
- Glassmorphism (`.glass`, `.glass-strong`)
- Aurora background, grid overlay, subtle glow rings
- Mobile-first responsive layout with bottom nav on small screens

## Mock data

All business data is mocked under `src/lib/mock-data.ts`. Swap with real APIs / AI Agent endpoints when ready — the components are fully decoupled.

## Keyboard

- `⌘K` / `Ctrl+K` — Command palette
- `Esc` — Dismiss palette / overlays

---

For demonstration purposes only. © 2026 HSBC Holdings plc concept.
