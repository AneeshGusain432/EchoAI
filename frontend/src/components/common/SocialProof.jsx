import { BackgroundGrid } from "../../utils/BackgroundGrid";
import { motion } from "framer-motion";

const companies = [
  "Northwind",
  "Acme Co",
  "Lumen",
  "Vertex",
  "Brightside",
  "Cobalt",
];

const stats = [
  { value: "10x", label: "Faster Email Processing" },
  { value: "2 Min", label: "Average Setup Time" },
  { value: "120+", label: "Tasks Automated Daily" },
  { value: "99.9%", label: "Platform Uptime" },
];

export default function SocialProof() {
  return (
    <>
      {/* Logo bar */}
      {/* <section className="border-y border-white/6 bg-[#0d0d12] py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-10 text-center text-xs font-semibold uppercase tracking-widest text-zinc-600">
            Trusted by busy teams at fast-moving companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {companies.map((c) => (
              <span
                key={c}
                className="text-lg font-semibold tracking-tight text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats */}
      <section className="relative overflow-hidden bg-[#0a0a0f] py-20">
        <BackgroundGrid />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#2563eb10,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              Trusted Productivity
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Built To Save
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Hours Every Week
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Echo AI helps professionals spend less time managing email and
              calendars, and more time doing meaningful work.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((s, index) => (
              <motion.div
                key={s.value}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8 text-center shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <p className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-5xl font-bold text-transparent transition-all duration-500 group-hover:scale-110">
                  {s.value}
                </p>

                <p className="mt-3 text-sm font-medium text-zinc-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
