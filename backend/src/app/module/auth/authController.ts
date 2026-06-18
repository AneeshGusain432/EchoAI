import type { Request, Response } from "express";
import { googleValidation } from "./validation.js";
import ApiError from "../../common/utils/apiError.js";
import * as authService from "./authService.js";
import ApiResponse from "../../common/utils/apiResponse.js";

async function googleSignInController(req: Request, res: Response) {
  const { data, error } = googleValidation.safeParse(req.body);

  if (error) {
    const errors = error.issues.map((err) => err.message);
    throw ApiError.unauthorized(errors[0]);
  }

  const { code } = data;

  const { oldUser, newUser, accessToken, refreshToken, isnewUser } =
    await authService.googleSignin(code);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  if (isnewUser) {
    ApiResponse.created(res, "account created successfully", {
      user: newUser,
      accessToken,
      refreshToken,
    });
  } else {
    ApiResponse.ok(res, "Logged in successfully", {
      user: oldUser,
      accessToken,
      refreshToken,
    });
  }
}

async function logoutController(req: Request, res: Response) {
  const userId = req.user?.id;
  await authService.logout(userId!);
  res.clearCookie("refreshToken").clearCookie("accessToken");

  ApiResponse.ok(res, "Logged out successfully");
}

async function refreshTokenController(req: Request, res: Response) {
  const token =
    req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

  const { accessToken, refreshToken } = await authService.refreshToken(token);

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  ApiResponse.ok(res, "", { accessToken, refreshToken });
}


async function getMeController(req: Request, res: Response) {
  ApiResponse.ok(res, "user profile fetched", {user: req.user})
}

export { googleSignInController, logoutController, refreshTokenController, getMeController};
