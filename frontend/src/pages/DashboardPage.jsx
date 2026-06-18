import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import EmailList from "../components/dashboard/EmailList";
import RightPanel from "../components/dashboard/RightPanel";
import EmailView from "../components/email/EmailView";
import CalendarPage from "./CalendarPage";
import AgentPage from "./AgentPage";

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("inbox");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden font-sans">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header setMobileOpen={setMobileOpen} />

        <div className="flex flex-1 overflow-hidden">
          {
            activeNav === "calendar" ? (
              <CalendarPage />
            ) : activeNav === "agent" ? (
              <AgentPage />
            ) : selectedEmail ? (
              <EmailView
                emailId={selectedEmail}
                onClose={() => setSelectedEmail(null)}
              />
            ) : (
              <EmailList
                activeNav={activeNav}
                setActiveNav={setActiveNav}
                setSelectedEmail={setSelectedEmail}
              />
            )
          }
          <RightPanel />
        </div>
      </main>
    </div>
  );
}
