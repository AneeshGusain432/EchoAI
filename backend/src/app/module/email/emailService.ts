import { corsair } from "../../../server/corsair.js";

function getHeader(payload: any, headerName: string) {
  return (
    payload?.headers?.find(
      (header: any) => header.name?.toLowerCase() === headerName.toLowerCase(),
    )?.value || ""
  );
}

function getEmailBody(payload: any) {
  let html = "";
  let text = "";

  function decode(data: string) {
    return Buffer.from(
      data.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8");
  }

  function extract(part: any) {
    if (!part) return;

    if (part.mimeType === "text/html" && part.body?.data) {
      html = decode(part.body.data);
    }

    if (part.mimeType === "text/plain" && part.body?.data) {
      text = decode(part.body.data);
    }

    if (part.parts) {
      part.parts.forEach(extract);
    }
  }

  extract(payload);

  return { html, text };
}

function normalizeMessage(message: any) {
  const payload = message.payload || {};

  const attachments =
    payload?.parts
      ?.filter((part: any) => part.filename && part.filename.length > 0)
      ?.map((part: any) => part.filename) || [];

  return {
    id: message.id,
    threadId: message.threadId,
    labelIds: message.labelIds || [],
    snippet: message.snippet || "",
    internalDate: message.internalDate,
    sizeEstimate: message.sizeEstimate,

    subject: getHeader(payload, "Subject") || "(no subject)",

    from: getHeader(payload, "From"),
    to: getHeader(payload, "To"),
    date: getHeader(payload, "Date"),

    hasAttachment: attachments.length > 0,
    attachments,

    isUnread: message.labelIds?.includes("UNREAD") || false,

    isStarred: message.labelIds?.includes("STARRED") || false,

    body: getEmailBody(payload),
  };
}

async function getFullMessages(tenant: any, messages: any[]) {
  const fullMessages = await Promise.all(
    messages.map((message) =>
      tenant.gmail.api.messages.get({
        id: message.id!,
        format: "full",
      }),
    ),
  );

  return fullMessages.map(normalizeMessage);
}

async function getMessages(tenantId: string, options: any) {
  const tenant = corsair.withTenant(tenantId);

  const result = await tenant.gmail.api.messages.list(options);

  const messages = result.messages || [];

  const emails =   await getFullMessages(tenant, messages);
  return {
    emails,
    nextPageToken: result.nextPageToken
  }
}

export async function getInboxEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    labelIds: ["INBOX"],
    maxResults,
    pageToken
  });
}

export async function getUnreadEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    q: "is:unread",
    maxResults,
    pageToken
  });
}

export async function getSentEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    q: "in:sent",
    maxResults,
    pageToken
  });
}

export async function getStarredEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    q: "is:starred",
    maxResults,
    pageToken
  });
}

export async function getSpamEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    q: "in:spam",
    includeSpamTrash: true,
    maxResults,
  });
}

export async function getTrashEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    q: "in:trash",
    includeSpamTrash: true,
    maxResults,
  });
}

export async function getEmailsWithAttachments(
  tenantId: string,
  maxResults = 20,
  pageToken?: string
) {
  return getMessages(tenantId, {
    q: "has:attachment",
    maxResults,
    pageToken
  });
}

export async function getAllEmails(tenantId: string, maxResults = 20, pageToken?: string) {
  return getMessages(tenantId, {
    maxResults,
    pageToken
  });
}

export async function getDrafts(tenantId: string, maxResults = 20, pageToken?: string) {
  const tenant = corsair.withTenant(tenantId);

  const result = await tenant.gmail.api.drafts.list({
    maxResults,
    pageToken
  });

  const drafts = result.drafts || [];

  const fullDrafts = await Promise.all(
    drafts.map((draft: any) =>
      tenant.gmail.api.drafts.get({
        id: draft.id!,
        format: "full",
      }),
    ),
  );

  return fullDrafts.map((draft: any) => ({
    id: draft.id,
    message: draft.message ? normalizeMessage(draft.message) : null,
  }));
}

export async function getEmailById(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  const email = await tenant.gmail.api.messages.get({
    id: emailId,
    format: "full",
  });

  return normalizeMessage(email);
}

function buildRawEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/html; charset=utf-8",
    "",
    body,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendEmail(
  tenantId: string,
  {
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  },
) {
  const tenant = corsair.withTenant(tenantId);

  const raw = buildRawEmail({
    to,
    subject,
    body,
  });

  return tenant.gmail.api.messages.send({
    raw,
  });
}

export async function replyToEmail(
  tenantId: string,
  {
    to,
    subject,
    body,
    threadId,
    replyToMessageId,
  }: {
    to: string;
    subject: string;
    body: string;
    threadId: string;
    replyToMessageId: string;
  },
) {
  const tenant = corsair.withTenant(tenantId);

  const raw = Buffer.from(
    [
      `To: ${to}`,
      `Subject: Re: ${subject}`,
      `In-Reply-To: ${replyToMessageId}`,
      `References: ${replyToMessageId}`,
      "Content-Type: text/html; charset=utf-8",
      "",
      body,
    ].join("\r\n"),
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return tenant.gmail.api.messages.send({
    raw,
    threadId,
  });
}

export async function trashEmail(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.trash({
    id: emailId,
  });
}

export async function starEmail(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.modify({
    id: emailId,
    addLabelIds: ["STARRED"],
  });
}

export async function unstarEmail(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.modify({
    id: emailId,
    removeLabelIds: ["STARRED"],
  });
}

export async function markAsRead(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.modify({
    id: emailId,
    removeLabelIds: ["UNREAD"],
  });
}

export async function markAsUnread(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.modify({
    id: emailId,
    addLabelIds: ["UNREAD"],
  });
}

export async function archiveEmail(tenantId: string, emailId: string) {
  const tenant = corsair.withTenant(tenantId);

  return tenant.gmail.api.messages.modify({
    id: emailId,
    removeLabelIds: ["INBOX"],
  });
}

export async function forwardEmail(
  tenantId: string,
  {
    to,
    subject,
    body,
    originalBody,
    originalFrom,
    originalDate,
  }: {
    to: string;
    subject: string;
    body: string;
    originalBody: string;
    originalFrom: string;
    originalDate: string;
  },
) {
  const tenant = corsair.withTenant(tenantId);

  const forwardedBody = `
    ${body}

    <br/><br/>
    ---------- Forwarded message ----------<br/>
    From: ${originalFrom}<br/>
    Date: ${originalDate}<br/><br/>

    ${originalBody}
  `;

  const raw = buildRawEmail({
    to,
    subject: `Fwd: ${subject}`,
    body: forwardedBody,
  });

  return tenant.gmail.api.messages.send({
    raw,
  });
}
