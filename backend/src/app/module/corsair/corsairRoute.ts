import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.js';
import connectEmailController from './connectEmail.js';
import emailCallbackController from './emailCallback.js';
import connectCalendarController from './connectCalendar.js';
import calendarCallbackController from './calendarCallback.js';

const corsairRouter: Router = Router()

corsairRouter.get("/connect-email", authenticate, connectEmailController)
corsairRouter.get("/email-callback", emailCallbackController)
corsairRouter.get("/connect-calendar", authenticate, connectCalendarController)
corsairRouter.get("/calendar-callback", calendarCallbackController)

export default corsairRouter