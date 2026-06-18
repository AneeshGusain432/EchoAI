import { useEffect, useState } from "react";
import {
  X,
  Reply,
  Forward,
  Trash2,
  Archive,
  Star,
  Paperclip,
  Send,
  NotebookIcon,
  MailOpen,
} from "lucide-react";

import Loader from "../../utils/Loader";

import {
  useGetSingleEmail,
  useReplyEmail,
  useForwardEmail,
  useTrashEmail,
  useArchiveEmail,
  useStarEmail,
  useUnstarEmail,
  useMarkAsRead,
  useMarkAsUnread,
} from "../../api/email/email";

export default function EmailView({ emailId, onClose }) {
  const [replyOpen, setReplyOpen] = useState(false);

  const [forwardOpen, setForwardOpen] = useState(false);

  const [replyBody, setReplyBody] = useState("");

  const [forwardTo, setForwardTo] = useState("");

  const [forwardBody, setForwardBody] = useState("");

  const { data, isLoading } = useGetSingleEmail(emailId);
  const { mutate: markAsRead } = useMarkAsRead();

  const email = data?.data;

  useEffect(() => {
    if (email?.id && email?.isUnread) {
      markAsRead(email.id);
    }
  }, [email?.id]);

  const { mutate: markAsUnread } = useMarkAsUnread();

  const { mutate: reply, isPending: replying } = useReplyEmail();

  const { mutate: forward, isPending: forwarding } = useForwardEmail();

  const { mutate: trash } = useTrashEmail();

  const { mutate: archive } = useArchiveEmail();

  const { mutate: starEmail } = useStarEmail();

  const { mutate: unstarEmail } = useUnstarEmail();

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <Loader />
      </div>
    );
  }

  if (!email) return null;

  const handleReply = () => {
    reply(
      {
        to: email.from,
        subject: email.subject,
        body: replyBody,
        threadId: email.threadId,
        replyToMessageId: email.id,
      },
      {
        onSuccess: () => {
          setReplyOpen(false);
          setReplyBody("");
        },
      },
    );
  };

  const handleForward = () => {
    forward(
      {
        to: forwardTo,
        subject: email.subject,
        body: forwardBody,
        originalBody: email.body?.html || email.snippet,

        originalFrom: email.from,
        originalDate: email.date,
      },
      {
        onSuccess: () => {
          setForwardOpen(false);
          setForwardTo("");
          setForwardBody("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] overflow-hidden w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white/60 transition-all"
        >
          <X size={15} />
        </button>

        <div className="flex items-center gap-1.5">
          <ActionButton
            icon={Star}
            filled={email.isStarred}
            color="text-amber-400"
            onClick={() => {
              if (email.isStarred) {
                unstarEmail(email.id);
              } else {
                starEmail(email.id);
              }
            }}
          />

          <ActionButton
            icon={Archive}
            onClick={() => {
              archive(email.id);
              onClose();
            }}
          />

          <ActionButton
            icon={Trash2}
            color="text-red-400"
            onClick={() => {
              trash(email.id);
              onClose();
            }}
          />

          <ActionButton
            icon={MailOpen}
            color="text-blue-400"
            onClick={() => {
              markAsUnread(email.id);
              //   onClose();
            }}
          />
        </div>
      </div>

      {/* Email content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-3 md:px-5 py-4 md:py-5">
        {/* Subject */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 flex items-center justify-center">
            <NotebookIcon size={18} className="text-blue-400" />
          </div>

          <h2 className="text-lg md:text-2xl font-bold text-white break-words">
            {email.subject}
          </h2>
        </div>

        {/* Meta */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold shrink-0 shadow-lg">
              {email.from?.[0]?.toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white/80 break-all">
                {email.from}
              </p>
              <p className="text-[11px] text-white/30">To: {email.to}</p>
            </div>
          </div>
          <p className="text-[11px] text-white/25 shrink-0 mt-1">
            {email.date}
          </p>
        </div>

        {/* Labels */}
        {email.labelIds?.length > 0 && (
          <div className="flex items-center flex-wrap gap-1">
            {email.labelIds
              .filter((l) => !["INBOX", "UNREAD", "IMPORTANT"].includes(l))
              .map((label) => (
                <span
                  key={label}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/15"
                >
                  {label}
                </span>
              ))}
          </div>
        )}

        {/* Body */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-sm text-white/70 leading-relaxed">
          {email.body?.html ? (
            <div
              className="prose prose-invert prose-sm max-w-none email-body"
              dangerouslySetInnerHTML={{ __html: email.body.html }}
            />
          ) : (
            <p className="whitespace-pre-wrap">
              {email.body?.text || email.snippet}
            </p>
          )}
        </div>

        {/* Attachments */}
        {email.attachments?.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="text-xs text-white/30 mb-2 uppercase tracking-wider">
              Attachments
            </p>
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((name, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white/70 transition-all"
                >
                  <Paperclip size={11} />
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="px-5 py-3 border-t border-white/5 shrink-0 space-y-3">
        {/* Reply box */}
        {replyOpen && (
          <ComposeBox
            label="Reply"
            body={replyBody}
            setBody={setReplyBody}
            onSend={handleReply}
            onClose={() => setReplyOpen(false)}
            loading={replying}
            to={email.from}
          />
        )}

        {/* Forward box */}
        {forwardOpen && (
          <ComposeBox
            label="Forward"
            body={forwardBody}
            setBody={setForwardBody}
            onSend={handleForward}
            onClose={() => setForwardOpen(false)}
            loading={forwarding}
            to={forwardTo}
            setTo={setForwardTo}
            showTo
          />
        )}

        {!replyOpen && !forwardOpen && (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setReplyOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors"
            >
              <Reply size={13} />
              Reply
            </button>
            <button
              onClick={() => setForwardOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 text-xs font-medium text-white/60 transition-colors"
            >
              <Forward size={13} />
              Forward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ComposeBox({
  label,
  body,
  setBody,
  onSend,
  onClose,
  loading,
  to,
  setTo,
  showTo = false,
}) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-3 space-y-2 ">
      {showTo && (
        <input
          value={to}
          onChange={(e) => setTo?.(e.target.value)}
          placeholder="To..."
          className="w-full bg-transparent text-xs text-white/60 placeholder-white/20 outline-none border-b border-white/8 pb-2"
        />
      )}
      {!showTo && <p className="text-[11px] text-white/25">To: {to}</p>}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={`Write your ${label.toLowerCase()}...`}
        rows={4}
        className="w-full bg-transparent text-sm text-white/70 placeholder-white/20 outline-none resize-none"
      />
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={onClose}
          className="text-xs text-white/30 hover:text-white/50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSend}
          disabled={loading || !body.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-medium text-white transition-colors"
        >
          <Send size={11} />
          {loading ? "Sending..." : label}
        </button>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  onClick,
  color = "text-white/30",
  filled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded-lg hover:bg-white/8 flex items-center justify-center ${color} transition-all`}
    >
      <Icon size={14} fill={filled ? "currentColor" : "none"} />
    </button>
  );
}
