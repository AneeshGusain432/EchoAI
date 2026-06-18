import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { BackgroundGrid } from "../../utils/BackgroundGrid";

const faqs = [
  {
    q: "Is my email and calendar data secure?",
    a: "Yes. Echo AI uses Google OAuth 2.0, so we never see your password. Data is encrypted in transit and at rest, and your information is never used to train public AI models.",
  },
  {
    q: "Does Echo AI work with Gmail and Google Calendar?",
    a: "Absolutely. Echo AI connects to both personal Gmail and Google Workspace accounts. It instantly understands your inbox, events, and schedules without requiring any migration.",
  },
  {
    q: "Can Echo AI send emails or schedule meetings automatically?",
    a: "You stay in control. By default, Echo AI drafts replies and suggests actions for approval. Optional automation can be enabled for trusted workflows.",
  },
  {
    q: "Can I connect multiple Google accounts?",
    a: "Yes. Echo AI supports multiple Gmail and Calendar accounts, allowing you to manage personal and professional workflows from one place.",
  },
  {
    q: "What happens after the free trial ends?",
    a: "You can upgrade to continue using advanced AI automation. Your connected accounts and data remain available even if you choose not to upgrade immediately.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="security"
      className="relative overflow-hidden bg-[#0a0a0f] py-15"
    >
      <BackgroundGrid />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb10,transparent_60%)]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Frequently Asked Questions
          </div>

          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Everything You Need
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              To Know About Echo AI
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Answers to common questions about security, automation, Gmail
            integration, and how Echo AI works.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] shadow-2xl shadow-black/40">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className={`border-b border-white/10 last:border-b-0 transition-all ${
                open === i ? "bg-blue-500/5" : ""
              }`}
            >
              <button
                className="flex w-full items-center justify-between px-7 py-6 text-left transition-all hover:bg-blue-500/5"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-base font-medium text-white">
                  {faq.q}
                </span>
                <span className="ml-4 shrink-0 text-blue-400">
                  {open === i ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="px-7 pb-6">
                  <p className="text-base leading-relaxed text-zinc-400">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
