import type { Request, Response } from "express"
import * as corsairService from './corsairService.ts'


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
        "http://localhost:5173/dashboard"
    );
}

export default calendarCallbackController