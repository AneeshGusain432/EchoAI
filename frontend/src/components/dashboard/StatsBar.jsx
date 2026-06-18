import { Inbox, Flame } from "lucide-react";
import { useGetUnreadEmailCount } from "../../api/email/email";
import { useGetCalendarEvents } from "../../api/calendar/calendar";

export default function StatsBar() {
  const { data: unreadEmails } = useGetUnreadEmailCount();
  const { data } = useGetCalendarEvents();

  const events = data?.data?.events?.items || [];

  const unreadEmailCounts = unreadEmails?.data?.unreadEmails || 0;

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-5">
      <div
        className={`bg-gradient-to-br from-blue-600/10 to-blue-600/5 border border-blue-500/15 rounded-xl p-3 md:p-4 hover:scale-[1.01] transition-transform`}
      >
        <div className="flex items-start justify-between mb-2">
          <p className="text-[10px] md:text-[11px] text-white/30 uppercase tracking-wider leading-tight">
            Total Unread Mails
          </p>
          <Inbox size={14} className="text-blue-400" />
        </div>
        <p className="text-xl md:text-2xl font-bold text-white">
          {unreadEmailCounts}
        </p>
      </div>
      <div
        className={`bg-gradient-to-br from-orange-600/10 to-orange-600/5 border-orange-500/15 rounded-xl p-3 md:p-4 hover:scale-[1.01] transition-transform`}
      >
        <div className="flex items-start  justify-between mb-2">
          <p className="text-[10px] md:text-[11px] text-white/30 uppercase tracking-wider leading-tight">
            Total Events
          </p>
          <Flame size={14} className="text-orange-400" />
        </div>
        <p className="text-xl md:text-2xl font-bold text-white">
          {events?.length || 0}
        </p>
      </div>
    </div>
  );
}
