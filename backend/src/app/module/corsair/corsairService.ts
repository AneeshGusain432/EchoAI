import { generateOAuthUrl, processOAuthCallback } from "corsair/oauth";
import { corsair } from "../../../server/corsair.ts";

export async function connectEmail(userId: string) {
  const { url } = await generateOAuthUrl(corsair, "gmail", {
    tenantId: userId,
    redirectUri: process.env.EMAIL_CALLBACK_URL!,
  });

  return url;
}

export async function connectCalendar(userId: string) {
  const { url } = await generateOAuthUrl(corsair, "googlecalendar", {
    tenantId: userId,
    redirectUri: process.env.CALENDAR_CALLBACK_URL!,
  });

  return url;
}

export async function emailCallback(code: string, state: string) {
  await processOAuthCallback(corsair, {
    code: String(code),
    state: String(state),
    redirectUri: process.env.EMAIL_CALLBACK_URL!,
  });
}

export async function calendarCallback(code: string, state: string) {
  await processOAuthCallback(corsair, {
    code: String(code),
    state: String(state),
    redirectUri: process.env.CALENDAR_CALLBACK_URL!,
  });
}
