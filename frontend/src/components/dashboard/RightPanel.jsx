import MiniCalendar from "./MiniCalendar";
import UpcomingEvents from "./UpcommingEvents";

export default function RightPanel() {
  return (
    <aside className="hidden xl:flex w-72 border-l border-white/5 bg-[#0d0d16] flex-col shrink-0 overflow-y-auto">
      <MiniCalendar />
      <UpcomingEvents />
    </aside>
  );
}
