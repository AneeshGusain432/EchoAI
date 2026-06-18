import { Router } from "express";
import { authenticate } from "../../common/middleware/authMiddleware.js";
import {
  getCalendarController,
  getUnreadEmailController,
} from "./dahboardController.js";

const dashboardRouter: Router = Router();

dashboardRouter.get("/get-unread-mail", authenticate, getUnreadEmailController);
dashboardRouter.get(
  "/get-calendar-events",
  authenticate,
  getCalendarController,
);

export default dashboardRouter;
