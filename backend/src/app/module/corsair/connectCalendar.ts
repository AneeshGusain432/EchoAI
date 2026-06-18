import type { Request, Response } from "express"
import ApiResponse from "../../common/utils/apiResponse.js";
import * as corsairService from './corsairService.js'


async function connectCalendarController(req: Request, res: Response) {
    const userId = req.user?.id

    const url = await corsairService.connectCalendar(userId!)

    ApiResponse.ok(res, "success", { url })

}

export default connectCalendarController