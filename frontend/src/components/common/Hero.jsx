import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Check } from "lucide-react";
import { BackgroundGrid } from "../../utils/BackgroundGrid";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 sm:pt-45 pt-35 pb-0 sm:px-6">
      <BackgroundGrid />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[900px] w-[900px] rounded-full border border-blue-500/10 animate-spin [animation-duration:40s]" />
      </div>
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb25,transparent_45%)] animate-pulse" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Eyebrow */}

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by Gmail, Google Calendar & AI Agents
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Your AI Executive Assistant
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            for Email & Meetings
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Connect Gmail and Google Calendar and let AI manage emails, schedule
          meetings, draft responses, prioritize tasks, and keep your day
          organized—all through simple natural language commands.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            Connect Google Account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch 2-Minute Demo
          </Link>
        </div>

        {/* Trust */}
        <p className="mt-5 text-sm text-zinc-500">
          Secure Google OAuth • Gmail & Calendar Sync • AI Powered
        </p>

        {/* Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500">
          <div>
            <span className="font-semibold text-white">Gmail</span> Integration
          </div>

          <div>
            <span className="font-semibold text-white">Calendar</span>{" "}
            Automation
          </div>

          <div>
            <span className="font-semibold text-white">AI</span> Agent Workflows
          </div>
        </div>
      </div>
      {/* Product Preview */}

      <div className="relative mx-auto mt-20 w-full max-w-6xl mb-16">
        <div className="absolute -left-28 top-10 hidden 2xl:block animate-[float_4s_ease-in-out_infinite] z-100">
          <div className="rounded-xl border border-white/10 bg-[#181820] px-4 py-3 backdrop-blur">
            <p className="text-xs text-white">
              ✉️ 7 emails replied automatically
            </p>
          </div>
        </div>

        <div className="absolute -right-28 top-24 hidden 2xl:block animate-[float_5s_ease-in-out_infinite] z-100">
          <div className="rounded-xl border border-white/10 bg-[#181820]/80  px-4 py-3 backdrop-blur">
            <p className="text-xs text-white">
              📅 Meeting scheduled with Sarah
            </p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-blue-500/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#12121a] shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/20 animate-[float_6s_ease-in-out_infinite]"
        >
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <p className="text-sm text-zinc-500">Echo AI Dashboard</p>

            <div />
          </div>

          <div className="grid lg:grid-cols-[220px_1fr_320px]">
            {/* Sidebar */}
            <div className="border-r border-white/10 bg-[#111118] p-5">
              <div className="mb-8">
                <h3 className="font-semibold text-white">Echo AI</h3>
                <p className="text-xs text-zinc-500">Gmail + Calendar</p>
              </div>

              <div className="space-y-2">
                {[
                  "Dashboard",
                  "Inbox",
                  "Calendar",
                  "AI Assistant",
                  // "Tasks",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-xl px-4 py-3 text-sm transition-all duration-300 hover:bg-white/5 ${
                      index === 0
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "text-zinc-400"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Inbox */}
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Inbox</h3>

                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs text-blue-300">
                  12 unread
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Sarah Miller",
                    subject: "Quarterly planning review",
                    time: "8:42 AM",
                  },
                  {
                    name: "Marcus Lee",
                    subject: "Client onboarding follow-up",
                    time: "9:15 AM",
                  },
                  {
                    name: "Legal Team",
                    subject: "Contract renewal approval",
                    time: "11:20 AM",
                  },
                  {
                    name: "Design Team",
                    subject: "Review new dashboard UI",
                    time: "1:05 PM",
                  },
                ].map((mail) => (
                  <div
                    key={mail.subject}
                    className="rounded-2xl border border-white/10 bg-[#1b1b24] p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          <p className="font-medium text-white">{mail.name}</p>
                        </div>

                        <p className="text-sm text-zinc-400">{mail.subject}</p>
                      </div>

                      <span className="text-xs text-zinc-500">{mail.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar + AI */}
            <div className="border-l border-white/10 bg-[#17171f] p-5">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Today</h3>

                <p className="text-sm text-zinc-500">Tuesday, June 12</p>
              </div>

              <div className="space-y-3">
                {["Team Standup", "Design Review", "Client Demo"].map(
                  (meeting) => (
                    <div
                      key={meeting}
                      className="rounded-2xl border border-white/10 bg-[#1c1c24] p-4 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                    >
                      <p className="font-medium text-white">{meeting}</p>

                      <p className="text-sm text-blue-400">
                        9:00 AM - 10:00 AM
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-5 shadow-[0_0_50px_rgba(59,130,246,0.35)]">
                <p className="mb-3 font-semibold text-white">AI Summary</p>

                <ul className="space-y-2 text-sm text-white/90">
                  <li>• 12 unread emails</li>
                  <li>• 3 high-priority tasks</li>
                  <li>• 5 meetings today</li>
                </ul>

                <button className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
                  Ask Echo AI
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
