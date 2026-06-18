import type { Request, Response } from "express"
import ApiResponse from "../../common/utils/apiResponse.js";
import * as corsairService from "./corsairService.js"


async function connectEmailController(req: Request, res: Response) {
    const userId = req.user?.id

    const url = await corsairService.connectEmail(userId!)

    ApiResponse.ok(res, "success", { url })

}

export default connectEmailController