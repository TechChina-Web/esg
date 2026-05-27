import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

const basePath = "/esg";

export const metadata: Metadata = {
  title: "Supplier Net Zero Accelerator",
  description:
    "AI-powered Sustainable Supply Chain. Net-Zero intelligence, ESG risk monitoring, and carbon transparency — built for global enterprises.",
  applicationName: "Supplier Net Zero Accelerator",
  keywords: ["HSBC", "ESG", "Sustainability", "Supply Chain", "AI", "Carbon", "Green Finance"],
  authors: [{ name: "HSBC ESG Lab" }],
  openGraph: {
    title: "Supplier Net Zero Accelerator",
    description: "AI + ESG + FinTech + Logistics — unified.",
    type: "website"
  },
  icons: { icon: `${basePath}/favicon.svg` }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
