import type { Request, Response } from "express";
import * as corsairService from "./corsairService.ts";
import ApiError from "../../common/utils/apiError.ts";

async function emailCallbackController(req: Request, res: Response) {
  const { code, state } = req.query;

  if (!code || !state) {
    throw ApiError.unauthorized("Missing code or state");
  }

  await corsairService.emailCallback(code as string, state as string);

  return res.redirect("http://localhost:5173/dashboard");
}

export default emailCallbackController;
