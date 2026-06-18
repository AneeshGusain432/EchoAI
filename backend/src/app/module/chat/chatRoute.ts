import {Router} from 'express'
import { authenticate } from '../../common/middleware/authMiddleware.js';
import { ChatController } from './chatController.js';

const chatRouter:Router = Router()

chatRouter.post("/ask", authenticate, ChatController)

export default chatRouter