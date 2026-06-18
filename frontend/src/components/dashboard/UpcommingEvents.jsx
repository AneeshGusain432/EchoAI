import { CalendarDays, Clock, Plus, CalendarX } from "lucide-react";
import {useGetCalendarEvents} from "../../api/calendar/calendar";

export default function UpcomingEvents() {
    const { data } = useGetCalendarEvents();
    const events = data?.data?.events?.items || [];

    const formattedEvents = events.map((event) => {
        const startDate = new Date(event.start?.dateTime || event.start?.date);

        return {
            id: event.id,
            title: event.summary || "Untitled Event",

            day: startDate.getDate(),

            month: startDate.toLocaleString("default", {
                month: "short",
            }),

            time: startDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),

            color: "bg-blue-600",
        };
    });

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-600/20 flex items-center justify-center">
              <CalendarDays size={11} className="text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-white/80">Upcoming</h3>
          </div>
          <button className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-all">
            <Plus size={13} />
          </button>
        </div>

        <div className="space-y-2">
          {formattedEvents.length <= 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <CalendarX size={24} className="text-white/30" />
              </div>

              <h3 className="text-sm font-medium text-white/70">
                No upcoming events
              </h3>

              <p className="text-xs text-white/30 text-center mt-2 max-w-[180px]">
                Your calendar is clear for now. New meetings will appear here.
              </p>
            </div>
          ) : (
            formattedEvents.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className=" flex items-center gap-  bg-white/[0.03  border border-white/5 rounded-xl p-3 hover:border-white/10 hover:bg-white/[0.05] transition-all cursor-pointer"
              >
                <div
                  className={`${event.color} rounded-xl w-9 h-9 flex flex-col items-center justify-center shrink-0`}
                >
                  <p className="text-[7px] uppercase">{event.month}</p>

                  <p className="text-sm font-bold">{event.day}</p>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {event.title}
                  </p>

                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={10} className="text-white/30" />

                    <p className="text-[10px] text-white/40">{event.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
}
