import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  // const session = await serverSupabaseSession(event);
  const client = await serverSupabaseClient<Database>(event);
  await client.auth.refreshSession();
  const registrationId = getRouterParam(event, "id");
  const providerToken = getCookie(event, "sb-provider-token");

  if (!providerToken) {
    throw createError({ status: 401, message: "Unauthorized" });
  }
  if (!registrationId) {
    throw createError({
      statusMessage: "Registration ID is required",
      status: 400,
    });
  }

  const res = await $fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${registrationId}`,
    {
      method: "delete",
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
    }
  );

  await client
    .from("registrations")
    .update({ calendar_event_id: null })
    .match({ calendar_event_id: registrationId });

  return res;
});
