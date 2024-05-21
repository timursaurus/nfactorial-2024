import { createError } from "h3";
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);
  const client = await serverSupabaseClient<Database>(event);

  if (!user?.id) {
    throw createError({ statusMessage: "Unauthorized", status: 401 });
  }
  const { data: registrations } = await client
    .from("registrations")
    .select("*")
    .eq("user_id", user.id);

  const ids = registrations?.map((r) => r?.event_id).filter(Boolean) || [];

  const {
    data: events,
    error,
    status,
    statusText,
    count,
  } = await client.from("events").select("*").in("id", ids)

  const eventsWithRegistrations = events?.map((e) => {
    const reg = registrations?.find((r) => r?.event_id === e?.id);
    return { ...e, registration: reg };
  })

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText });
  }

  return { content: eventsWithRegistrations || [], count: count || 0 };
});
