import ApiResponse from "../../common/utils/apiResponse.ts";
import agent from "../agent/agent.ts";
import type { Request, Response } from "express";
import chatValidation from "./validation.ts";
import ApiError from "../../common/utils/apiError.ts";

async function ChatController(req: Request, res: Response) {

  const { data, error } = chatValidation.safeParse(req.body);

  if (error) {
    const errors = error.issues.map((err) => err.message);
    throw ApiError.unauthorized(errors[0]);
  }

  const userId = req.user?.id;
  const response = await agent(data.prompt, userId!);

  ApiResponse.ok(res, "ok", { response });
}

export { ChatController };
