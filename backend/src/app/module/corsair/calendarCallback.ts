import type { Request, Response } from "express"
import * as corsairService from './corsairService.js'


async function calendarCallbackController(req: Request, res: Response) {
    const { code, state } = req.query;

    if (!code || !state) {
        return res.status(400).json({
            success: false,
            message: "Missing code or state",
        });
    }

    await corsairService.calendarCallback(code as string, state as string)

    return res.redirect(
        "https://echo-ai-5iu8.vercel.app/dashboard"
    );
}

export default calendarCallbackController