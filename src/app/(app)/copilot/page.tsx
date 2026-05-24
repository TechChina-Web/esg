"use client";
import * as React from "react";
import { Topbar } from "@/components/app/topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, ArrowRight, RefreshCw, Bot, User, Leaf } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Msg = { id: string; role: "user" | "ai"; text: string; chart?: { d: number }[]; chips?: string[] };

const suggestions = [
  "How can I reduce supply chain carbon by 20% in 6 months?",
  "Recommend a more sustainable logistics route for Mumbai → London",
  "Analyze ESG risks across my top 10 suppliers",
  "Estimate carbon credits needed for Q3 net-zero alignment"
];

const sampleResponse = `Based on your current portfolio, three high-leverage moves can reduce supply-chain carbon by ~22% in 6 months:

1. Re-balance 18% of Pacific Q3 volume from Pacific Maritime Holdings → Nordic Green Logistics (−742 tCO₂e).
2. Shift Mumbai → London leg to Rail+Sea hybrid via Suez (−184 tCO₂e, +3 days).
3. Activate the AAA promotion for UK Renewable Textiles to unlock −0.35% green-loan rate, freeing $2.4M for low-carbon retrofits.

Overall ESG composite would rise from 86.4 → 89.1 with 94% confidence.`;

export default function CopilotPage() {
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "m0",
      role: "ai",
      text: "Hi Alex — I'm your ESG Copilot. Ask me anything about your supply chain, suppliers, carbon, or financing."
    }
  ]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [messages]);

  const send = (txt: string) => {
    if (!txt.trim() || streaming) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: txt };
    const aiMsg: Msg = { id: `a-${Date.now()}`, role: "ai", text: "" };
    setMessages((m) => [...m, userMsg, aiMsg]);
    setInput("");
    setStreaming(true);

    let i = 0;
    const id = setInterval(() => {
      i += 5 + Math.floor(Math.random() * 6);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === "ai") last.text = sampleResponse.slice(0, i);
        return next;
      });
      if (i >= sampleResponse.length) {
        clearInterval(id);
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last) {
            last.chart = Array.from({ length: 14 }, (_, k) => ({ d: 100 - k * 1.4 - Math.sin(k) * 1.5 }));
            last.chips = ["Apply plan", "Generate report", "Compare vs. peers", "Schedule review"];
          }
          return next;
        });
        setStreaming(false);
      }
    }, 28);
  };

  return (
    <div>
      <Topbar title="AI Sustainability Copilot" subtitle="Bloomberg-grade ESG intelligence — at the speed of thought" />

      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3 rounded-2xl border bg-surface-overlay p-4 h-fit">
          <div className="text-[10px] uppercase tracking-wider text-content-subtle">Threads</div>
          <Button size="sm" variant="primary" className="w-full mt-2 gap-1.5">
            <RefreshCw className="size-3.5" /> New thread
          </Button>
          <ul className="mt-3 space-y-1 text-sm">
            {["Carbon plan Q3", "Supplier risk audit", "Green loan eligibility", "Net-Zero roadmap"].map((x, i) => (
              <li key={x} className={`px-2 py-1.5 rounded-lg cursor-pointer ${i === 0 ? "bg-surface-raised" : "hover:bg-surface-raised text-content-muted"}`}>
                {x}
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border p-3 bg-surface">
            <div className="text-[11px] text-content-subtle inline-flex items-center gap-1">
              <Sparkles className="size-3 text-data-teal" /> Context
            </div>
            <p className="mt-1 text-xs text-content-muted">
              Connected to <b>HSBC ESG Graph</b> · 1,284 suppliers · 47 active tenders · live carbon ledger.
            </p>
          </div>
        </div>

        <div className="lg:col-span-9 rounded-2xl border bg-surface-overlay overflow-hidden flex flex-col" style={{ height: "80vh" }}>
          <div className="px-4 py-3 border-b flex items-center gap-2">
            <span className="size-7 rounded-full bg-esg-gradient grid place-items-center text-[10px] font-bold text-white">AI</span>
            <div>
              <div className="text-sm font-semibold">ESG Copilot</div>
              <div className="text-[11px] text-content-subtle">claude-esg-flagship · grounded with your live data</div>
            </div>
            <Badge variant="emerald" className="ml-auto"><Leaf className="size-3" /> Verified</Badge>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "ai" && (
                    <div className="size-8 rounded-full bg-esg-gradient grid place-items-center shrink-0">
                      <Bot className="size-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-brand-red text-white" : "bg-surface-raised"}`}>
                    <div className="whitespace-pre-wrap leading-relaxed">{m.text}{streaming && m === messages[messages.length - 1] && <span className="inline-block w-1.5 h-4 align-middle bg-content/70 ml-0.5 animate-pulse" />}</div>
                    {m.chart && (
                      <div className="mt-3 rounded-xl border bg-surface p-2">
                        <div className="text-[10px] uppercase tracking-wider text-content-subtle">Projected carbon — next 14 weeks</div>
                        <div className="h-[110px]">
                          <ResponsiveContainer>
                            <AreaChart data={m.chart}>
                              <defs>
                                <linearGradient id="cpG" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#00C281" stopOpacity={0.6} />
                                  <stop offset="100%" stopColor="#00C281" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="d" stroke="#00C281" fill="url(#cpG)" strokeWidth={2} animationDuration={900} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                    {m.chips && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {m.chips.map((c) => (
                          <button key={c} className="text-[11px] px-2.5 py-1 rounded-full border bg-surface hover:bg-surface-overlay inline-flex items-center gap-1">
                            {c} <ArrowRight className="size-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <div className="size-8 rounded-full bg-surface-raised border grid place-items-center shrink-0">
                      <User className="size-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="border-t p-3">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-2.5 py-1 rounded-full border hover:bg-surface-raised"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-end gap-2"
            >
              <div className="flex-1 rounded-xl border bg-surface px-3 py-2 flex items-center gap-2">
                <Sparkles className="size-4 text-data-teal" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the ESG Copilot…"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <Button type="submit" disabled={streaming} variant="primary" className="gap-1">
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
