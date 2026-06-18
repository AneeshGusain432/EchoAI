import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.js';
import { getCalendarController } from '../dashboard/dahboardController.js';

const calendarRouter: Router = Router()

calendarRouter.get(
  "/events",
  authenticate,
  getCalendarController
);

export default calendarRouter