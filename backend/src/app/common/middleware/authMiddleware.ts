import ApiError from "../../common/utils/apiError.ts";
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/token.ts";
import { db } from "../../../server/corsair.ts";
import { userTable } from "../db/schema.ts";
import { eq, type InferSelectModel } from "drizzle-orm";

type User = InferSelectModel<typeof userTable>;
type AuthenticatedUser = Pick<
  User,
  "id" | "email" | "name" | "createdAt" | "updatedAt" | "avatar"
>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies?.accessToken ?? req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw ApiError.unauthorized("Please log in to continue ");
  }

  const decodedToken = verifyAccessToken(token);

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, decodedToken.id));

  if (!user) {
    throw ApiError.unauthorized("User account no longer exists");
  }

  req.user = user;
  next();
}

export { authenticate };
