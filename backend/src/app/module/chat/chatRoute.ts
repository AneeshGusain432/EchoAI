import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.ts';
import { ChatController } from './chatController.ts';

const chatRouter:Router = Router()

chatRouter.post("/ask", authenticate, ChatController)

export default chatRouter