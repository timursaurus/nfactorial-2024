import { createError } from "h3";
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const eventId = getRouterParam(event, "eventId");
  const user = await serverSupabaseUser(event);

  if (!eventId) {
    throw createError({ statusMessage: "Event ID is required", status: 400 });
  }

  // const {
  //   data,
  //   status,
  //   error,
  //   statusText,
  // } = await client.from('events').select('*').eq("id", eventId)

  const { error, status, statusText } = await client
    .from("registrations")
    .insert({ event_id: eventId, user_id: user?.id });

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText });
  }

  // client.from('events').update({ available_seats: 1 }).eq("id", eventId);
  // client.rpc('increment', { row_id: eventId  })

  if (!error) {
    return {
      status: 200,
      message: "Registration successful",
    };
  }
});
