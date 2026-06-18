import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: ["Features", "How it works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Help center", "Privacy", "Terms", "Security"],
};

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-500/10 bg-[#0a0a0f] px-4 py-15 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb08,transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold text-white">
                Echo AI
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Your AI executive assistant for Gmail and Google Calendar.
              Automate email management, scheduling, follow-ups, and daily
              planning through natural language commands.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-zinc-300">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-6 flex gap-4">
            {["X", "LinkedIn", "GitHub"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-zinc-500 transition-colors hover:text-blue-400"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-blue-500/10 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Echo AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs text-zinc-600 hover:text-zinc-400"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
