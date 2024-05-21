import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database'

export default defineEventHandler(async (event) => {
  // const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)

  const {
    data: events,
    status,
    count,
    error,
    statusText,
  } = await client.from('events').select('*').range(0, 10)

  if (error) {
    throw createError({ statusMessage: error.message, status, statusText })
  }

  return { content: events, count: count || 0 }
})
