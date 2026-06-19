import type { Request, Response } from "express";
import * as corsairService from "./corsairService.js";
import ApiError from "../../common/utils/apiError.js";

async function emailCallbackController(req: Request, res: Response) {
  const { code, state } = req.query;

  if (!code || !state) {
    throw ApiError.unauthorized("Missing code or state");
  }

  await corsairService.emailCallback(code as string, state as string);

  return res.redirect("https://echo-ai-5iu8.vercel.app/dashboard");
}

export default emailCallbackController;
