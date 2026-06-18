import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.ts';
import { getCalendarController } from '../dashboard/dahboardController.ts';

const calendarRouter: Router = Router()

calendarRouter.get(
  "/events",
  authenticate,
  getCalendarController
);

export default calendarRouter