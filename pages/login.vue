<template>
  <UCard>
    ok
    <UButton
      icon="mdi:google"
      @click="signIn"
    >
      sign in google
    </UButton>
  </UCard>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const session = useSupabaseSession()

async function signIn() {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'https://www.googleapis.com/auth/calendar',
    },
  })
}

// supabase.auth.signInWithOAuth()
</script>
