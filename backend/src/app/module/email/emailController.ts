import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/apiResponse.ts";
import ApiError from "../../common/utils/apiError.ts";
import {
  getAllEmails,
  getUnreadEmails,
  getSentEmails,
  getDrafts,
  getSpamEmails,
  getTrashEmails,
  getStarredEmails,
  getEmailsWithAttachments,
  getEmailById,
  sendEmail,
  replyToEmail,
  trashEmail,
  starEmail,
  unstarEmail,
  markAsRead,
  markAsUnread,
  archiveEmail,
  forwardEmail,
} from "./emailService.ts";

async function getEmailsController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id;

    const tab = (req.query.tab as string) || "all";
    const pageToken = req.query.pageToken as string | undefined;

    const maxResults = Number(req.query.maxResults) || 20;

    const emailServices: Record<
      string,
      (tenantId: string, maxResults: number, pageToken?: string) => Promise<any>
    > = {
      all: getAllEmails,
      unread: getUnreadEmails,
      sent: getSentEmails,
      drafts: getDrafts,
      spam: getSpamEmails,
      trash: getTrashEmails,
      starred: getStarredEmails,
      attachment: getEmailsWithAttachments,
    };

    const service = emailServices[tab] || getAllEmails;

    const result = await service(tenantId!, maxResults, pageToken);

    ApiResponse.ok(res, "success", {
      emails: result.emails,
      tab,
      nextPageToken: result.nextPageToken,
    });
  } catch (error: any) {
    console.log("[EMAIL_CONTROLLER_ERROR]", error);

    throw ApiError.serverError(error.message || "Failed to fetch emails");
  }
}

async function getSingleEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id;
    const { emailId } = req.params;

    const email = await getEmailById(tenantId!, emailId as string);

    ApiResponse.ok(res, "success", email);
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to fetch email");
  }
}

async function sendEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;

    const { to, subject, body } = req.body;

    const result = await sendEmail(tenantId, {
      to,
      subject,
      body,
    });

    ApiResponse.ok(res, "Email sent successfully", result);
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to send email");
  }
}

async function replyEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;

    const { to, subject, body, threadId, replyToMessageId } = req.body;

    const result = await replyToEmail(tenantId, {
      to,
      subject,
      body,
      threadId,
      replyToMessageId,
    });

    ApiResponse.ok(res, "Reply sent successfully", result);
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to send reply");
  }
}

async function trashEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await trashEmail(tenantId, emailId as string);

    ApiResponse.ok(res, "Email moved to trash");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to trash email");
  }
}

async function starEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await starEmail(tenantId, emailId as string);

    ApiResponse.ok(res, "Email starred");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to star email");
  }
}

async function unstarEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await unstarEmail(tenantId, emailId as string);

    ApiResponse.ok(res, "Email unstarred");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to unstar email");
  }
}

async function markAsReadController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await markAsRead(tenantId, emailId as string);

    ApiResponse.ok(res, "Email marked as read");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to mark as read");
  }
}

async function markAsUnreadController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await markAsUnread(tenantId, emailId as string);

    ApiResponse.ok(res, "Email marked as unread");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to mark as unread");
  }
}

async function archiveEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;
    const { emailId } = req.params;

    await archiveEmail(tenantId, emailId as string);

    ApiResponse.ok(res, "Email archived");
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to archive email");
  }
}

async function forwardEmailController(req: Request, res: Response) {
  try {
    const tenantId = req.user?.id!;

    const { to, subject, body, originalBody, originalFrom, originalDate } =
      req.body;

    const result = await forwardEmail(tenantId, {
      to,
      subject,
      body,
      originalBody,
      originalFrom,
      originalDate,
    });

    ApiResponse.ok(res, "Email forwarded successfully", result);
  } catch (error: any) {
    throw ApiError.serverError(error.message || "Failed to forward email");
  }
}

export {
  getEmailsController,
  getSingleEmailController,
  sendEmailController,
  replyEmailController,
  trashEmailController,
  starEmailController,
  unstarEmailController,
  markAsReadController,
  markAsUnreadController,
  archiveEmailController,
  forwardEmailController,
};
