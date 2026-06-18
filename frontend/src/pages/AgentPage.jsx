import { Bot, Send, Plus } from "lucide-react";
import { useChatWithAgent } from "../api/chat/chat";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetEmails, useGetUnreadEmailCount } from "../api/email/email";
import { useGetCalendarEvents } from "../api/calendar/calendar";

export default function AgentPage() {
  const [prompt, setPrompt] = useState("");
  const unreadEmails= useGetUnreadEmailCount();
  const calendarEvents = useGetCalendarEvents();

  const events = calendarEvents.data?.data?.events?.items || [];
  const unreadEmailCounts = unreadEmails?.data?.data?.unreadEmails || 0;

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      type: "welcome",
    },
  ]);

  const askAgent = useChatWithAgent();
  const { data } = useGetEmails();

  const handleSend = () => {
    if (!prompt.trim()) return;

    const userPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setPrompt("");

    askAgent.mutate(userPrompt, {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data?.data?.response,
          },
        ]);
      },
      onError: (error) => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              error?.response?.data?.message || "Sorry, something went wrong.",
          },
        ]);
      },
    });
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#0a0a0f] p-6 gap-6">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Assistant</h1>

          <p className="text-white/40 max-w-md">
            Manage emails, meetings, scheduling and follow-ups using AI powered
            workflows.
          </p>
        </div>

        {/* Chat */}
        <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl flex flex-col overflow-hidden">
          {/* Agent Header */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                <Bot size={22} className="text-blue-400" />
              </div>

              <div>
                <h3 className="text-white font-semibold">Echo Agent</h3>

                <p className="text-xs text-white/35">
                  Connected to Gmail & Calendar
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 hide-scrollbar">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              <AnimatePresence>
                {messages?.map((message, index) => (
                  <div key={index}>
                    {message.type === "welcome" ? (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 30,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] bg-white/[0.04] border border-white/10 rounded-3xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <motion.div
                              animate={{
                                y: [0, -4, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="w-9 h-9 rounded-xl bg-blue-600/20 flex items-center justify-center"
                            >
                              <Bot size={18} className="text-blue-400" />
                            </motion.div>

                            <div>
                              <p className="text-white font-medium">Echo AI</p>
                              <p className="text-xs text-white/30">
                                Connected to Gmail & Calendar
                              </p>
                            </div>
                          </div>

                          <p className="text-white/70 leading-relaxed">
                            Hi 👋 I'm Echo.
                          </p>

                          <p className="text-white/50 mt-2 leading-relaxed">
                            I can help you summarize emails, find important
                            messages, schedule meetings, draft replies, and
                            organize your day.
                          </p>

                          <p className="text-white/40 text-sm mt-4">
                            Try one of these:
                          </p>

                          <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{
                              hidden: {},
                              show: {
                                transition: {
                                  staggerChildren: 0.12,
                                },
                              },
                            }}
                            className="flex flex-col gap-2 mt-3"
                          >
                            <motion.button
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  y: 10,
                                },
                                show: {
                                  opacity: 1,
                                  y: 0,
                                },
                              }}
                              onClick={() => {
                                setPrompt("Summarize my inbox");

                                setMessages((prev) =>
                                  prev.filter((msg) => msg.type !== "welcome"),
                                );
                              }}
                              className="text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70"
                            >
                              📧 Summarize my inbox
                            </motion.button>

                            <motion.button
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  y: 10,
                                },
                                show: {
                                  opacity: 1,
                                  y: 0,
                                },
                              }}
                              onClick={() => {
                                (setPrompt("Show today's meetings"),
                                  setMessages((prev) =>
                                    prev.filter(
                                      (msg) => msg.type !== "welcome",
                                    ),
                                  ));
                              }}
                              className="text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70"
                            >
                              📅 Show today's meetings
                            </motion.button>

                            <motion.button
                              variants={{
                                hidden: {
                                  opacity: 0,
                                  y: 10,
                                },
                                show: {
                                  opacity: 1,
                                  y: 0,
                                },
                              }}
                              onClick={() => {
                                (setPrompt("Draft a follow up email"),
                                  setMessages((prev) =>
                                    prev.filter(
                                      (msg) => msg.type !== "welcome",
                                    ),
                                  ));
                              }}
                              className="text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70"
                            >
                              ✨ Draft a follow up email
                            </motion.button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <div
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-3xl px-5 py-4 ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white/[0.04] border border-white/10 text-white/80"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </AnimatePresence>

              {askAgent.isPending && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/10 rounded-3xl px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3">
              <button className="text-white/30 hover:text-white/60">
                <Plus size={18} />
              </button>

              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                type="text"
                placeholder="Ask Echo to help with emails or calendar..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20"
              />

              <button
                onClick={() => {
                  handleSend();
                }}
                className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden xl:flex w-80 flex-col gap-5 py-30">
        {/* Today Summary */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
          <h3 className="text-white font-semibold mb-4">Today Summary</h3>

          <div className="space-y-3">
            <SummaryItem label="Unread Emails" value={unreadEmailCounts || 0} />

            <SummaryItem label="Meetings" value={events?.length || 0} />
          </div>
        </div>

        {/* Assistant Status */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">
          <h3 className="text-white font-semibold mb-4">Assistant Status</h3>

          <div className="space-y-4">
            <StatusCard
              title="Email"
              status={data ? "connected" : "Not Connected"}
            />

            <StatusCard
              title="Calendar"
              status={data ? "connected" : "Not Connected"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-white/40 text-sm">{label}</span>

      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}

function StatusCard({ title, status }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
      <span className="text-white/70">{title}</span>

      <span className="text-green-400 text-sm">{status}</span>
    </div>
  );
}
