import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/apiResponse.ts";
import { getCalendarEvents } from "./calendarService.ts";

async function getCalendarEventsController(req: Request, res: Response) {
  const tenantId = req.user?.id;

  const events = await getCalendarEvents(tenantId!);

  ApiResponse.ok(res, "Calendar fetched", events);
}

export { getCalendarEventsController };
