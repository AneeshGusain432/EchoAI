import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BackgroundGrid } from "../../utils/BackgroundGrid";
import { motion } from "framer-motion";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] px-4 py-15 sm:px-6 lg:px-8">
      <BackgroundGrid />
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb12,transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-[32px] border border-blue-500/15 bg-gradient-to-br from-[#0f1629] via-[#0d1520] to-[#0a0a0f] p-12 text-center shadow-2xl shadow-black/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[300px] w-[500px] rounded-full bg-blue-600/15 blur-[80px]" />
          </div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
            >
              Start Using Echo AI Today
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Let AI Handle
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Your Busy Work
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400"
            >
              Connect Gmail and Google Calendar, then let Echo AI manage emails,
              scheduling, follow-ups, and daily planning so you can focus on
              what matters most.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Link
                to="/auth"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                Connect Google Account
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 active:scale-[0.98]"
              >
                Watch Demo
              </Link>
            </motion.div>
            <p className="mt-6 text-sm text-zinc-500">
              Secure Google OAuth • No Credit Card Required • Setup in 2 Minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
