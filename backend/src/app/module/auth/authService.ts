import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../common/utils/token.ts";
import { oAuthClient } from "../../common/config/googleAuth.ts";
import { google } from "googleapis";
import { db } from "../../../server/corsair.ts";
import { userTable } from "../../common/db/schema.ts";
import { eq } from "drizzle-orm";
import ApiError from "../../common/utils/apiError.ts";

async function googleSignin(code: string) {
  const { tokens } = await oAuthClient.getToken(code);

  await oAuthClient.setCredentials(tokens);

  const oAuth2 = await google.oauth2({
    auth: oAuthClient,
    version: "v2",
  });

  const { data: googleUser } = await oAuth2.userinfo.get();

  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, googleUser.email!));

  // if user not exist create their account
  if (!user) {
    const [newUser] = await db
      .insert(userTable)
      .values({
        name: googleUser.name!,
        email: googleUser.email!,
        avatar: googleUser.picture!,
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
        email: userTable.email,
        avatar: userTable.avatar,
        createdAt: userTable.createdAt,
        updatedAt: userTable.updatedAt,
      });

    const accessToken = generateAccessToken({
      id: newUser?.id!,
      email: newUser?.email!,
    });

    const refreshToken = await generateRefreshToken({
      id: newUser?.id!,
      email: newUser?.email!,
    });

    const hashedToken = await hashToken(refreshToken);

    await db
      .update(userTable)
      .set({ refreshToken: hashedToken })
      .where(eq(userTable.id, newUser?.id!));

    return { newUser, accessToken, refreshToken, isnewUser: true };
  }

  // if user exist logged in
  const accessToken = generateAccessToken({
    id: user?.id!,
    email: user?.email!,
  });

  const refreshToken = await generateRefreshToken({
    id: user?.id!,
    email: user?.email!,
  });

  // always store hashed token in db
  const hashedToken = await hashToken(refreshToken);

  await db
    .update(userTable)
    .set({ refreshToken: hashedToken })
    .where(eq(userTable.id, user?.id!));

  return { oldUser: user, accessToken, refreshToken, isnewUser: false };
}


async function logout(userId: string) {
  return await db
    .update(userTable)
    .set({ refreshToken: null })
    .where(eq(userTable.id, userId));
}


async function refreshToken(token: string,) {
  verifyRefreshToken(token)

  const hashedToken = await hashToken(token)

  const [user] = await db.select().from(userTable).where(eq(userTable.refreshToken, hashedToken))

    if (!user) {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const accessToken = generateAccessToken({id: user.id, email: user.email})
  const refreshToken = generateRefreshToken({id: user.id, email: user.email})
  const hashedRefreshToken = await hashToken(refreshToken)

  await db.update(userTable).set({refreshToken: hashedRefreshToken})

  return {accessToken, refreshToken}
}


export { googleSignin, logout, refreshToken};
