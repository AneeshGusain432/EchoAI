import type { Request, Response } from "express"
import ApiResponse from "../../common/utils/apiResponse.ts";
import * as corsairService from './corsairService.ts'


async function connectCalendarController(req: Request, res: Response) {
    const userId = req.user?.id

    const url = await corsairService.connectCalendar(userId!)

    ApiResponse.ok(res, "success", { url })

}

export default connectCalendarController