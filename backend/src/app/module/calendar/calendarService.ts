import { corsair } from "../../../server/corsair.js";


export async function getCalendarEvents(
  tenantId: string,
  maxResults = 20
) {
  const tenant = corsair.withTenant(tenantId);

  const response = await tenant.googlecalendar.api.events.getMany({
    calendarId: "primary",
    singleEvents: true,
    orderBy: "startTime",
    timeMin: new Date().toISOString(),
  });
  
  return response || [];
}