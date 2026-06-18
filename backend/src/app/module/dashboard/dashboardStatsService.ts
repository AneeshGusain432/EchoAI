import { corsair } from "../../../server/corsair.ts";

export async function getUnreadEmailsCount(tenantId: string) {
  const tenant = corsair.withTenant(tenantId);
  const result = await tenant.gmail.api.messages.list({
    q: "is:unread",
  });

  return result.resultSizeEstimate;
}

export async function getCalendarEvents(tenantId: string) {
  const tenant = corsair.withTenant(tenantId);

  const now = new Date();

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const events = await tenant.googlecalendar.api.events.getMany({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: nextMonth.toISOString(),
  });

  return events;
}
