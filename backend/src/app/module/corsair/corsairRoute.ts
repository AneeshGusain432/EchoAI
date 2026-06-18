import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.ts';
import connectEmailController from './connectEmail.ts';
import emailCallbackController from './emailCallback.ts';
import connectCalendarController from './connectCalendar.ts';
import calendarCallbackController from './calendarCallback.ts';

const corsairRouter: Router = Router()

corsairRouter.get("/connect-email", authenticate, connectEmailController)
corsairRouter.get("/email-callback", emailCallbackController)
corsairRouter.get("/connect-calendar", authenticate, connectCalendarController)
corsairRouter.get("/calendar-callback", calendarCallbackController)

export default corsairRouter