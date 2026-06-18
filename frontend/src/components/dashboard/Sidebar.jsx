import { label } from "framer-motion/client";
import {
  Inbox,
  Send,
  FileText,
  AlertTriangle,
  Archive,
  Trash2,
  Star,
  Calendar,
  Zap,
  Settings,
  X,
  Notebook,
  User,
  LogOut,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useLogoutMutation } from "../../api/auth/auth";

const sidebarItems = [
  { label: "Inbox", key: "inbox" },
  { label: "Starred", key: "starred" },
  { label: "unread", key: "unread" },
  { label: "Sent", key: "sent" },
  { label: "Drafts", key: "drafts" },
  { label: "Spam", key: "spam" },
  { label: "Trash", key: "trash" },
];

const iconMap = {
  inbox: Inbox,
  starred: Star,
  sent: Send,
  drafts: FileText,
  spam: AlertTriangle,
  all: Archive,
  trash: Trash2,
  unread: Notebook,
};

export default function Sidebar({
  activeNav,
  setActiveNav,
  mobileOpen,
  setMobileOpen,
}) {
  const user = JSON.parse(localStorage.getItem("auth-user"));
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const logout = useLogoutMutation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
        fixed lg:relative z-30 lg:z-auto
        w-64 h-full bg-[#0d0d16] border-r border-white/5
        flex flex-col shrink-0 transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Zap size={17} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">
                <span className="text-blue-400">E</span>
                <span className="text-white">cho AI</span>
              </p>
              <p className="text-[10px] text-white/25 uppercase tracking-widest">
                AI Workspace
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/30 hover:text-white/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto hide-scrollbar space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-white/20 px-3 mb-2">
            Mail
          </p>
          {sidebarItems.map(({ label, key }) => {
            const Icon = iconMap[key];
            const active = activeNav === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveNav(key);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  active
                    ? "bg-blue-600/15 text-blue-400 font-medium border border-blue-500/20"
                    : "text-white/35 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={15}
                    className={
                      active
                        ? "text-blue-400"
                        : "text-white/30 group-hover:text-white/50"
                    }
                  />
                  <span>{label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-5">
            <p className="text-[10px] uppercase tracking-widest text-white/20 px-3 mb-2">
              Tools
            </p>
            {[
              { key: "calendar", label: "Calendar", Icon: Calendar },
              { key: "agent", label: "AI Agent", Icon: Zap },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveNav(key);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  activeNav === key
                    ? "bg-blue-600/15 text-blue-400 font-medium border border-blue-500/20"
                    : "text-white/35 hover:text-white/70 hover:bg-white/5"
                }`}
              >
                <Icon
                  size={15}
                  className={
                    activeNav === key
                      ? "text-blue-400"
                      : "text-white/30 group-hover:text-white/50"
                  }
                />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* AI Assistant CTA */}
        <div className="p-3 border-t border-white/5 space-y-3">
          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/15 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-blue-600/30 flex items-center justify-center">
                <Zap size={11} className="text-blue-400" />
              </div>
              <p className="text-xs font-semibold text-blue-300">
                AI Assistant
              </p>
            </div>
            <p className="text-[11px] text-white/35 mb-2.5 leading-relaxed">
              Let Echo triage your inbox automatically.
            </p>
            <button
              onClick={() => setActiveNav("agent")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/30"
            >
              <Zap size={12} />
              Run Agent
            </button>
          </div>

          {/* User */}
          <div className="flex items-center gap-2.5 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[11px] font-bold shrink-0 shadow-md">
              {user.user.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/70 truncate">
                {user.user.name}
              </p>
              <p className="text-[10px] text-white/25 truncate">
                {user.user.email}
              </p>
            </div>
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-white/20 hover:text-white/50 transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <Settings size={13} />
              </button>

              {showMenu && (
                <div className="absolute bottom-10 right-0 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#111118] backdrop-blur-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-medium text-white truncate">
                      {user.user.name}
                    </p>
                    <p className="text-xs text-white/30 truncate">
                      {user.user.email}
                    </p>
                  </div>

                  {/* Profile */}
                  {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/5 transition-all">
                    <User size={15} />
                    Profile
                  </button> */}

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout.mutate();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
