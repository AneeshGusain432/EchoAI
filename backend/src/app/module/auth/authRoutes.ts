import {Router} from 'express'
import { getMeController, googleSignInController, logoutController, refreshTokenController } from './authController.js';
import { authenticate } from '../../common/middleware/authMiddleware.js';

const authRouter: Router = Router()

authRouter.post("/google", googleSignInController)
authRouter.post("/logout", authenticate, logoutController)
authRouter.post("/refresh-token", refreshTokenController)
authRouter.get("/get-me", authenticate, getMeController)

export default authRouter

