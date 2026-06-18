import { Mail, Edit3, Calendar, Bell, Search, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGrid } from "../../utils/BackgroundGrid";

const features = [
  {
    icon: <Mail className="h-5 w-5 text-blue-400" />,
    title: "AI Inbox Management",
    body: "Echo AI automatically prioritizes emails, summarizes threads, and highlights conversations that need your attention.",
  },
  {
    icon: <Edit3 className="h-5 w-5 text-blue-400" />,
    title: "Smart Email Drafting",
    body: "Generate professional replies in seconds using AI that understands context, tone, and previous conversations.",
  },
  {
    icon: <Calendar className="h-5 w-5 text-blue-400" />,
    title: "Automated Scheduling",
    body: "Find availability, resolve conflicts, create calendar events, and send meeting invites without manual effort.",
  },
  {
    icon: <Bell className="h-5 w-5 text-blue-400" />,
    title: "Proactive Follow-Ups",
    body: "Never miss a deadline, meeting, or important email with intelligent reminders and follow-up suggestions.",
  },
  {
    icon: <Search className="h-5 w-5 text-blue-400" />,
    title: "Natural Language Commands",
    body: "Ask Echo AI questions like 'Find the contract Sarah sent in March' and get instant results.",
  },
  {
    icon: <Shield className="h-5 w-5 text-blue-400" />,
    title: "Enterprise-Grade Security",
    body: "Protected by Google OAuth, encrypted connections, and permission-based access to keep your data secure.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0a0a0f] py-10"
    >
      <BackgroundGrid />
      <div className="absolute inset-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
          >
            Echo AI Capabilities
          </motion.div>

          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Everything You Need,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Powered By AI
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Echo AI combines Gmail, Google Calendar, and intelligent automation
            into one powerful executive assistant.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-[1000px]">
          {features.map((f) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay:
                  features.findIndex((item) => item.title === f.title) * 0.1,
              }}
              key={f.title}
              className=" group relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-7 shadow-xl shadow-black/40 transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative mb-6 flex h-12 w-12 items-center  justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                {f.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-base leading-relaxed text-zinc-400">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
