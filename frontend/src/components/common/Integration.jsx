import { Check, Link2, Mail, Calendar, Send } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGrid } from "../../utils/BackgroundGrid";

const steps = [
  {
    badge: "Step 01",
    badgeIcon: <Link2 className="h-3 w-3" />,
    title: "Connect Your Google Workspace",
    body: "Securely connect Gmail and Google Calendar using Google OAuth. Echo AI instantly understands your inbox, meetings, and priorities without any manual setup.",
    bullets: [
      "Google OAuth authentication",
      "Works with Gmail & Google Workspace",
      "Permissions fully controlled by you",
    ],
    mockup: <ConnectMockup />,
    reverse: false,
  },

  {
    badge: "Step 02",
    badgeIcon: <Mail className="h-3 w-3" />,
    title: "Understand Your Inbox",
    body: "Echo AI analyzes incoming emails, identifies what matters, summarizes long threads, and surfaces only the conversations that need your attention.",
    bullets: [
      "AI-powered email summaries",
      "Priority detection",
      "Smart inbox organization",
    ],
    mockup: <InboxMockup />,
    reverse: true,
  },

  {
    badge: "Step 03",
    badgeIcon: <Calendar className="h-3 w-3" />,
    title: "Schedule Meetings",
    body: "Tell Echo AI who you want to meet and when. It finds availability, resolves conflicts, creates calendar events, and sends invitations automatically.",
    bullets: [
      "Smart availability matching",
      "Conflict resolution",
      "Automatic Google Meet links",
    ],
    mockup: <CalendarMockup />,
    reverse: false,
  },

  {
    badge: "Step 04",
    badgeIcon: <Send className="h-3 w-3" />,
    title: "Execute Tasks Automatically",
    body: "Echo AI drafts professional replies, follows up on conversations, and handles repetitive communication while keeping you in control.",
    bullets: [
      "Personalized email drafts",
      "One-click approval",
      "Learns your communication style",
    ],
    mockup: <DraftMockup />,
    reverse: true,
  },
];

function ConnectMockup() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#131318] p-5 shadow-2xl shadow-black/50 animate-[float_6s_ease-in-out_infinite]">
      {[
        { icon: "✉", name: "Gmail", sub: "name@company.com" },
        { icon: "📅", name: "Google Calendar", sub: "Primary · 3 calendars" },
      ].map((acc) => (
        <div
          key={acc.name}
          className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-[#1c1c24] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{acc.icon}</span>
            <div>
              <p className="text-sm font-medium text-white">{acc.name}</p>
              <p className="text-xs text-zinc-500">{acc.sub}</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <Check className="h-3 w-3" /> Connected
          </span>
        </div>
      ))}
      <div className="mt-4 flex items-center gap-2 border-t border-white/8 pt-4 text-xs text-zinc-500">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
        Encrypted connection · You control every permission
      </div>
    </div>
  );
}

function InboxMockup() {
  const emails = [
    {
      tag: "Needs You",
      tagColor: "bg-red-500/15 text-red-400 border border-red-500/20",
      title: "Contract renewal — decision by Fri",
      sub: "Legal Team",
    },
    {
      tag: "Replied",
      tagColor: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
      title: "Re: Q3 Report Draft",
      sub: "Marcus Lee",
    },
    {
      tag: "Archived",
      tagColor: "bg-zinc-500/15 text-zinc-400 border border-zinc-500/20",
      title: "18 newsletters & updates",
      sub: "Various",
    },
  ];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 shadow-2xl shadow-black/50 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 animate-[float_7s_ease-in-out_infinite]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">
            Echo AI Morning Briefing
          </p>
          <p className="text-xs text-zinc-500">
            Important emails surfaced automatically
          </p>
        </div>

        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
          24 New
        </span>
      </div>

      <div className="space-y-3">
        {emails.map((e) => (
          <div
            key={e.title}
            className="rounded-2xl border border-white/10 bg-[#1b1b24] p-4 transition-all hover:border-blue-500/20"
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${e.tagColor}`}
              >
                {e.tag}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-100">{e.title}</p>

            <p className="mt-1 text-xs text-zinc-500">{e.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarMockup() {
  const slots = [
    { time: "10:00", label: "Daily Standup", active: false },
    { time: "11:30", label: "Open Slot", active: false },
    { time: "2:00", label: "Sync with Priya", active: true },
    { time: "4:00", label: "Focus Block", active: false },
  ];

  return (
    <div className="relative rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 shadow-2xl shadow-black/50 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 animate-[float_8s_ease-in-out_infinite]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </p>
          <p className="text-xs text-zinc-500">
            Echo AI optimized your schedule
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
          3 Free Slots
        </span>
      </div>

      <div className="space-y-3">
        {slots.map((s) => (
          <div
            key={s.time}
            className={`rounded-2xl border p-4 transition-all ${
              s.active
                ? "border-blue-500/30 bg-blue-500/10"
                : "border-white/10 bg-[#1b1b24]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500">{s.time}</span>

                <span
                  className={`text-sm font-medium ${
                    s.active ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {s.active && (
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                  Invite Sent
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DraftMockup() {
  return (
    <div className="relative rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 shadow-2xl shadow-black/50 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 animate-[float_7s_ease-in-out_infinite]">
      <div className="mb-4 flex justify-end">
        <div className="max-w-xs rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm text-white shadow-lg shadow-blue-500/20">
          Reply to Marcus and confirm Thursday works.
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#1b1b24] p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">To: marcus@company.com</span>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            Draft
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-zinc-300">
          Hi Marcus, Thursday works great on my end — let&apos;s lock it in for
          2pm. I&apos;ll send a calendar invite shortly. Looking forward to it!
        </p>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
            <Send className="h-3 w-3" /> Send
          </button>
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-400 transition-all hover:bg-white/10 hover:text-white">
            Edit draft
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Integration() {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden bg-[#0a0a0f] py-32"
    >
      <BackgroundGrid />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb12,transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            Echo AI Workflow
          </div>

          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Your Entire Workflow,
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Automated By AI
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Echo AI connects Gmail and Google Calendar to manage communication,
            scheduling, follow-ups, and planning through natural language
            instructions.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-40">
          {steps.map((step) => (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={step.title}
              className={`relative grid items-center gap-16 lg:grid-cols-2 ${
                step.reverse ? "lg:[&>:first-child]:order-2" : ""
              }`}
            >
              <div className="absolute -inset-10 bg-blue-500/5 blur-3xl" />
              {/* Text side */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-300">
                  {step.badgeIcon}
                  {step.badge}
                </div>
                <h3 className="mb-5 text-4xl font-bold leading-tight text-white lg:text-5xl">
                  {step.title}
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                  {step.body}
                </p>
                <ul className="space-y-3">
                  {step.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base text-zinc-300"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup side */}

              <div className={step.reverse ? "lg:pr-8" : "lg:pl-8"}>
                {step.mockup}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
