import { Mail, Calendar, AlignLeft, Search } from "lucide-react";
import { BackgroundGrid } from "../../utils/BackgroundGrid";
import { motion } from "framer-motion";

const simpleSteps = [
  {
    num: "01",
    title: "Connect Your Google Workspace",
    body: "Securely link Gmail and Google Calendar in seconds with one-click OAuth. No setup or migration required.",
  },
  {
    num: "02",
    title: "Tell Echo AI What You Need",
    body: 'Type or speak a request in plain language — "reschedule my 3pm" or "summarize today\'s emails."',
  },
  {
    num: "03",
    title: "Review & Execute",
    body: "Echo AI proposes actions and drafts. You stay in control and confirm what gets sent or scheduled.",
  },
];

const examples = [
  {
    icon: <Mail className="h-4 w-4 text-blue-400" />,
    text: '"Summarize everything important that came in overnight."',
  },
  {
    icon: <Calendar className="h-4 w-4 text-blue-400" />,
    text: '"Move my 3pm with Alex to tomorrow morning and let him know."',
  },
  {
    icon: <AlignLeft className="h-4 w-4 text-blue-400" />,
    text: '"Reply to all the routine emails and flag anything that needs me."',
  },
  {
    icon: <Search className="h-4 w-4 text-blue-400" />,
    text: '"Find the invoice from Lumen and add a reminder to pay it Friday."',
  },
];

export default function UseCases() {
  return (
    <>
      {/* 3-step section */}
      <section
        id="use-cases"
        className="relative overflow-hidden bg-[#0a0a0f] py-15"
      >
        <BackgroundGrid />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb12,transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              Quick Setup
            </div>

            <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Start Using Echo AI
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                In Less Than 2 Minutes
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Connect your Google account, tell Echo AI what you need, and let
              it handle the busy work.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {simpleSteps.map((s, index) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                key={s.num}
                className="group relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 shadow-xl shadow-black/40 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="mb-5 text-sm font-bold tracking-[0.2em] text-blue-400 transition-all duration-500 group-hover:scale-110">
                  {s.num}
                </p>
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples section */}
      <section className="relative overflow-hidden bg-[#0a0a0f] py-15">
        <BackgroundGrid />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-sm font-semibold text-blue-400">Examples</p>
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              Example Commands
            </div>

            <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Just Ask.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Echo AI Handles The Rest
              </span>
            </h2>
            <p className="text-zinc-400">
              Here are a few of the things people ask TaskPilot every day.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {examples.map((e, index) => (
              <motion.div
                key={e.text}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative overflow-hidden flex items-start gap-4 rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {e.icon}
                </div>

                <p className="text-sm leading-relaxed text-zinc-300">
                  {e.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
