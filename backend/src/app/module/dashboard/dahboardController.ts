import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/apiResponse.js";
import {
  getCalendarEvents,
  getUnreadEmailsCount,
} from "./dashboardStatsService.js";

async function getUnreadEmailController(req: Request, res: Response) {
  const tenantId = req.user?.id!;

  const unreadEmails = await getUnreadEmailsCount(tenantId);

  return ApiResponse.ok(res, "success", { unreadEmails });
}

async function getCalendarController(req: Request, res: Response) {
  const tenantId = req.user?.id;

  const events = await getCalendarEvents(tenantId!);

  return ApiResponse.ok(res, "success", { events });
}

export { getUnreadEmailController, getCalendarController };
