import { Inbox, AlertCircle, RefreshCw } from "lucide-react";
import EmailRow from "./EmailRow";
import StatsBar from "./StatsBar";
import { useGetEmails } from "../../api/email/email";
import Loader from "../../utils/Loader";
import { useEffect, useRef } from "react";

export default function EmailList({
  activeNav,
  setActiveNav,
  setSelectedEmail,
}) {
  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetEmails(activeNav);
  const loadMoreRef = useRef(null);

  const emails = data?.pages?.flatMap((page) => page.data?.emails) || [];

  const filters = [
    { key: "inbox", label: "inbox" },
    { key: "unread", label: "Unread" },
    { key: "sent", label: "Sent" },
    { key: "drafts", label: "Drafts" },
    { key: "attachment", label: "Attachments" },
    { key: "starred", label: "starred" },
    { key: "trash", label: "trash" },
    { key: "spam", label: "spam" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4">
        <StatsBar />
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 w-full">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
          <AlertCircle size={28} className="text-red-400" />
        </div>

        <h3 className="text-sm font-medium text-white/70">
          Failed to load emails
        </h3>

        <p className="text-xs text-white/30 mt-2 text-center max-w-xs">
          We couldn't fetch your emails right now. Please try again in a moment.
        </p>
        <p className="text-xs text-white/30 mt-2 text-center max-w-xs">
          Connect your gmail and calendar
        </p>

        <button
          onClick={() => window.location.reload()}
          className=" mt-5 flex items-center gap-2 px-4 py-2 rounded-xl  bg-blue-600 hover:bg-blue-500 text-sm  text-white transition-all
        "
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 hide-scrollbar">
      <StatsBar />

      {/* Filters */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveNav(filter.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeNav === filter.key
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                : "bg-white/5 text-white/35 hover:text-white/60 hover:bg-white/8 border border-white/5"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
          <Inbox size={11} className="text-white/30" />
        </div>

        <h2 className="text-sm font-semibold text-white/70 capitalize">
          {activeNav}
        </h2>

        <span className="text-[10px] bg-white/5 text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
          {emails?.length}
        </span>
      </div>

      {/* Emails */}
      {emails?.length > 0 ? (
        <>
          <div className="space-y-1.5">
            {emails.map((email) => (
              <EmailRow
                key={email?.id}
                email={email}
                onClick={() => setSelectedEmail(email.id)}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center"
            >
              {isFetchingNextPage && (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-white/40 text-sm">
                    Loading more emails...
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">
            <Inbox size={28} className="text-white/25" />
          </div>

          <h3 className="text-sm font-medium text-white/60">No emails found</h3>
        </div>
      )}
    </div>
  );
}
