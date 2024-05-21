import { createError } from 'h3'
import {  serverSupabaseClient, serverSupabaseSession } from '#supabase/server'
import type { Database } from '~/types/database'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const eventId = getRouterParam(event, 'eventId')
  // const user = await serverSupabaseUser(event);
  const session = await serverSupabaseSession(event)

  if (!eventId) {
    throw createError({ statusMessage: "Event ID is required", status: 400 })
  }

  const {
    data,
    status,
    error,
    statusText,
  } = await client.from('events').select('*').eq("id", eventId)

  const e = data?.[0]

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText })
  }

  if (!e?.id) {
    throw createError({ statusMessage: "Event not found", status: 404 })
  }

  if (session?.user?.id) {
    const { data: registrations } = await client
    .from("registrations")
    .select("*")
    .eq("user_id", session?.user?.id);

    const registration = registrations?.find((r) => r?.event_id === e?.id);
    return { ...e, registration }

  }

  return e
})
