import { Paperclip } from "lucide-react";

export default function EmailRow({ email, onClick }) {
  const senderName = email.from?.split("<")[0]?.trim() || "Unknown";

  const initials = senderName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const colors = [
    "bg-blue-600",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-emerald-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-amber-500",
  ];

  const color = colors[senderName.length % colors.length];

  const time = new Date(Number(email.internalDate)).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={onClick}
      className={`
      flex items-start gap-3 p-3 md:p-3.5 rounded-xl border transition-all cursor-pointer group
      ${
        email.isUnread
          ? "bg-white/[0.04] border-white/8 hover:border-blue-500/20 hover:bg-white/[0.06]"
          : "bg-transparent border-white/[0.04] hover:bg-white/[0.03] hover:border-white/8"
      }
    `}
    >
      {/* Avatar */}
      <div
        className={`${color} w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-md`}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-2 min-w-0">
            {email.isUnread && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            )}

            <p
              className={`text-sm truncate ${
                email.isUnread
                  ? "font-semibold text-white"
                  : "font-medium text-white/50"
              }`}
            >
              {senderName}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {email.hasAttachment && (
              <Paperclip size={11} className="text-white/20" />
            )}

            <p className="text-[10px] md:text-[11px] text-white/20">{time}</p>
          </div>
        </div>

        <p
          className={`text-xs truncate mb-0.5 ${
            email.isUnread ? "text-white/65" : "text-white/35"
          }`}
        >
          {email.subject}
        </p>

        <p className="text-[11px] text-white/20 truncate hidden sm:block">
          {email.snippet}
        </p>
      </div>
    </div>
  );
}
