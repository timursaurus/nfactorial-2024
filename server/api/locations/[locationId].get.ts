
import { serverSupabaseClient,  } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const locationId = getRouterParam(event, "locationId");
  const client = await serverSupabaseClient<Database>(event);
  if (!locationId) {
    throw createError({ statusMessage: "Location ID is required", status: 400 });
  }

  const { data, error, status, statusText } = await client.from('locations').select('*').eq('id', locationId)

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText });
  }

  const location = data?.[0]

  if (!location) {
    throw createError({ statusMessage: "Location not found", status: 404 });
  }

  return location
})