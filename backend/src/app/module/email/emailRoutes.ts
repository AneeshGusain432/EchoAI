import { Router } from "express";
import { authenticate } from "../../common/middleware/authMiddleware.ts";
import {
  archiveEmailController,
  forwardEmailController,
  getEmailsController,
  getSingleEmailController,
  markAsReadController,
  markAsUnreadController,
  replyEmailController,
  sendEmailController,
  starEmailController,
  trashEmailController,
  unstarEmailController,
} from "./emailController.ts";

const emailRouter: Router = Router();
emailRouter.use(authenticate);

// GET /api/v1/email?tab=inbox
// GET /api/v1/email?tab=unread
// GET /api/v1/email?tab=sent
// GET /api/v1/email?tab=drafts
// GET /api/v1/email?tab=spam
// GET /api/v1/email?tab=trash
// GET /api/v1/email?tab=starred
// GET /api/v1/email?tab=attachments
emailRouter.get("/get", getEmailsController);

// Get single email
emailRouter.get("/:emailId", getSingleEmailController);

// Send emails
emailRouter.post("/send", sendEmailController);
emailRouter.post("/reply", replyEmailController);
emailRouter.post("/forward", forwardEmailController);

// Email actions
emailRouter.patch("/:emailId/trash", trashEmailController);
emailRouter.patch("/:emailId/archive", archiveEmailController);

emailRouter.patch("/:emailId/star", starEmailController);
emailRouter.patch("/:emailId/unstar", unstarEmailController);

emailRouter.patch("/:emailId/read", markAsReadController);
emailRouter.patch("/:emailId/unread", markAsUnreadController);

export default emailRouter;
