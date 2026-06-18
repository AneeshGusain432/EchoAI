import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCalendarEvents } from "../../api/calendar/calendar.js";

export default function MiniCalendar() {
  const { data } = useGetCalendarEvents();
  const events = data?.data.events?.items || [];

  // get calendar events dynamically
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = ["S", "M", "T", "W", "T", "F", "S"];

  const eventDays = new Set(
    events.map((event) => {
      const eventDate = new Date(event.start?.dateTime || event.start?.date);

      return eventDate.getDate();
    }),
  );

  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="p-4 border-b border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/80">
          {today.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <div className="flex gap-1">
          {[ChevronLeft, ChevronRight].map((Icon, i) => (
            <button
              key={i}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/5 transition-all"
            >
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center mb-2">
        {calendarDays.map((day) => (
          <div
            key={day}
            className="text-[10px] text-white/20 font-semibold py-1 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-1">
        {calendarCells.map((day, index) => {
          if (!day) {
            return <div key={index} />;
          }

          const isToday = day === today.getDate();

          const hasEvent = eventDays.has(day);

          return (
            <div key={index} className="flex flex-col items-center py-0.5">
              <button
                className={`w-6 h-6 rounded-full text-[11px] flex items-center justify-center transition-all ${
                  isToday
                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/50"
                    : hasEvent
                      ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                      : "text-white/40 hover:bg-white/8 hover:text-white/80"
                }`}
              >
                {day}
              </button>

              {hasEvent && <div className="w-1 h-1 rounded-full" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
