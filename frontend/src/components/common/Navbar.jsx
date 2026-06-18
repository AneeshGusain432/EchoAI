import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "Features", to: "#features" },
  { label: "Integrations", to: "#integrations" },
  { label: "Use Cases", to: "#use-cases" },
  { label: "Security", to: "#security" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const isAuthPage = location.pathname === "/auth";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10  backdrop-blur-2xl">
      {/* Top Glow Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
            <div className="absolute -inset-1 rounded-xl bg-blue-500/20 blur-md" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-white">
              Echo AI
            </span>

            <div className="hidden lg:flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Sparkles className="h-3 w-3" />
              AI Executive Assistant
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {!isAuthPage &&
            navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-all hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4">
          {/* Trust Badge */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-zinc-500">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            Google OAuth Secured
          </div>

          <Link
            to="/auth"
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10  md:hidden">
          <div className="px-4 py-5">
            {/* Mobile Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Sparkles className="h-3 w-3" />
              AI Executive Assistant
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 border-t border-white/10 pt-5">
              <div className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                Google OAuth Secured
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/auth"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/auth"
                  className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-center text-sm font-medium text-white"
                >
                  Connect Gmail
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
