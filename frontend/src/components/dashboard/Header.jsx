import { Search, Mail, CalendarDays, Bell, Menu } from "lucide-react";
import { useConnectEmail } from "../../api/corsair/connectEmail";
import { useConnectCalendar } from "../../api/corsair/connectCalendar";
import { useGetCalendarEvents } from "../../api/calendar/calendar";

export default function Header({ setMobileOpen }) {
  const connectEmail = useConnectEmail();
  const connectCalendar = useConnectCalendar();

  const { data } = useGetCalendarEvents();
  const events = data?.data?.events?.items || [];

  return (
    <header className="px-4 md:px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-[#0a0a0f] gap-3">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-bold tracking-tight truncate">
            Inbox
          </h1>
          <p className="text-white/40 mt-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            {" — "}
            {events?.length || 0} upcoming events
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Connect buttons — hidden on mobile */}
        <button
          onClick={() => connectEmail.mutate()}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/8 text-xs text-white/40 hover:text-white/70 hover:border-white/15 transition-all"
        >
          <Mail size={13} />
          <span className="hidden lg:inline">Connect Email</span>
        </button>
        <button
          onClick={() => connectCalendar.mutate()}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium transition-colors shadow-lg shadow-blue-900/30"
        >
          <CalendarDays size={13} />
          <span className="hidden lg:inline">Connect Calendar</span>
        </button>
      </div>
    </header>
  );
}
