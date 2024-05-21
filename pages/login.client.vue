<template>
  <UContainer class="w-1/2" >
    <UCard>
      <template #header >
        <h1 class="text-2xl text-center " >
          <b>
            Войти в Eventmaster
          </b>
        </h1>
      </template>
      <UButton color="black"  block icon="i-mdi-google" @click="signIn"> Продолжить с Google </UButton>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const toast = useToast()


async function signIn() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      scopes: "https://www.googleapis.com/auth/calendar",
    },
  });
  if (error) {
    toast.add({ title: error.message })
  }
}

// supabase.auth.signInWithOAuth()
</script>
