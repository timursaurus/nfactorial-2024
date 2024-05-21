import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  // const session = await serverSupabaseSession(event);
  // const eventId = getRouterParam(event, "eventId");
  const eventId = getRouterParam(event, "eventId");
  const client = await serverSupabaseClient<Database>(event);
  await client.auth.refreshSession();
  const providerToken = getCookie(event, "sb-provider-token");

  // const r = await client.from('registrations').select('*').eq('event_id', eventId!)

  if (!providerToken) {
    throw createError({ status: 401, message: "Unauthorized" });
  }

  const body = await readBody<{
    summary: string;
    description: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
  }>(event);

  const res = await $fetch<{
    id: string;
    status: string;
    summary: string;
    description: string;
  }>("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "post",
    headers: {
      Authorization: `Bearer ${providerToken}`,
    },
    body: JSON.stringify(body),
  });

  if (res?.status === "confirmed" && eventId) {
    const r = await client
      .from("registrations")
      .update({ calendar_event_id: res.id })
      .eq("event_id", eventId).select()

    if (r.status === 200) {
      return { ...res, registration: r.data?.[0] };
    }
  }

  return res;
});
