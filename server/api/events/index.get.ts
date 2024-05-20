import { createError } from 'h3'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient(event)

  const {
    data: events,
    status,
    count,
    error,
    statusText,
  } = await client.from('events').select('*')

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText })
  }

  return { events, count: count || 0 }
})
