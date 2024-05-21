import { createError } from "h3";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const registrationId = getRouterParam(event, "id");

  if (!registrationId) {
    throw createError({ statusMessage: "Event ID is required", status: 400 });
  }

  const { error, status, statusText } = await client
    .from("registrations")
    .delete()
    .eq("id", registrationId);

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText });
  }

  if (!error) {
    return {
      status: 204,
      message: "Registration deleted",
    };
  }
});
