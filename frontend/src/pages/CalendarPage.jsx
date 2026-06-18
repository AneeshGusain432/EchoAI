import { Calendar, CalendarX, Clock3 } from "lucide-react";
import { useGetCalendarEvents } from "../api/calendar/calendar";

export default function CalendarPage() {
  const { data } = useGetCalendarEvents();
  const events = data?.data?.events?.items || [];

  // format events date and times
  function formatEventDateTime(start, end) {
    const date = new Date(start).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const startTime = new Date(start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTime = new Date(end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${date} • ${startTime} - ${endTime}`;
  }

  // format total meeting times in hrs
  const today = new Date().toDateString();

  const todaysEvents = events.filter((event) => {
    return new Date(event.start?.dateTime).toDateString() === today;
  });

  const totalMeetingMinutes = todaysEvents.reduce((total, event) => {
    const start = new Date(event.start.dateTime);
    const end = new Date(event.end.dateTime);

    return total + (end - start) / (1000 * 60);
  }, 0);

  const totalMeetingHours = totalMeetingMinutes / 60;

  //   get calendar events dynamically
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const eventDates =
    events?.map((event) => new Date(event.start?.dateTime).getDate()) || [];

  // suggestion based on events
  const suggestions = [];

  if (events.length > 5) {
    suggestions.push({
      title: "Busy Schedule",
      description: `You have ${events.length} events scheduled.`,
    });
  }

  if (totalMeetingHours < 4) {
    suggestions.push({
      title: "Low Focus Time",
      description: "Try moving some meetings to create focus blocks.",
    });
  }

  const upcomingMeeting = events[0];

  if (upcomingMeeting) {
    suggestions.push({
      title: "Upcoming Meeting",
      description: `${upcomingMeeting.summary} starts soon.`,
    });
  }

  return (
    <div className="flex-1 flex gap-6 p-6 overflow-hidden">
      {/* Main */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Calendar</h1>

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

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4">
          <StatCard
            icon={<Calendar size={18} />}
            title="Today's Meetings"
            value={events?.length}
          />

          <StatCard
            icon={<Clock3 size={18} />}
            title="Today Focus Time"
            value={`${totalMeetingHours.toFixed(1)}h`}
          />
        </div>

        {/* Calendar */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" />

              <h2 className="text-xl font-semibold text-white">June 2026</h2>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div key={day} className="text-white/30 font-medium">
                {day}
              </div>
            ))}

            {/* Empty cells before month starts */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Real month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;

              const hasEvent = eventDates.includes(day);

              const isToday = day === date.getDate();

              return (
                <button
                  key={day}
                  className={`
          h-12 rounded-xl text-sm transition-all
          ${
            isToday
              ? "bg-blue-600 text-white"
              : hasEvent
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "hover:bg-white/5 text-white/50"
          }
        `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agenda */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold text-white">
              Selected Day Agenda
            </h2>

            <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">
              {events.length} event
            </span>
          </div>

          <div className="space-y-4">
            {events.length <= 0 ? (
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
              events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-white">{event.summary}</h3>

                    <span className="px-2 py-1 rounded-full text-xs bg-blue-600/15 text-blue-400">
                      {event.status}
                    </span>
                  </div>

                  <p className="text-white/40 mt-2 text-sm">
                    {formatEventDateTime(
                      event.start?.dateTime,
                      event.end?.dateTime,
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden xl:flex w-80 flex-col gap-5 h-full">
        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-5 flex flex-col min-h-0">
          <h3 className="text-white font-semibold mb-5">Upcoming Events</h3>

          <div className="space-y-3 overflow-y-auto flex-1 min-h-0 hide-scrollbar">
            {events.length <= 0 ? (
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
              events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4"
                >
                  <h4 className="text-white font-medium">{event.summary}</h4>

                  <p className="text-white/40 text-sm mt-1">
                    {formatEventDateTime(
                      event.start?.dateTime,
                      event.end?.dateTime,
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 h-[300px] flex flex-col">
          <h3 className="text-white font-semibold mb-4">Suggestions</h3>

          <div className="space-y-3 overflow-y-auto flex-1 min-h-0 hide-scrollbar">
            {suggestions.map((item, index) => (
              <SuggestionCard
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between items-center">
        <span className="text-white/40 text-sm">{title}</span>

        <div className="text-blue-400">{icon}</div>
      </div>

      <h2 className="text-3xl font-bold text-white mt-3">{value}</h2>
    </div>
  );
}

function SuggestionCard({ title, description }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <h4 className="text-white font-medium">{title}</h4>

      <p className="text-white/40 text-sm mt-2">{description}</p>
    </div>
  );
}
