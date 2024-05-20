<template>
  <div>
    <div class="flex items-center justify-center md:justify-between">
        <button @click="kek" >kek server</button>
      <div>
        <template v-if="session?.user">
          <UDropdown
            :disabled="loading"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ arrow: true }"
            :items="items"
          >
            <UButton
              variant="ghost"
              :label="user?.user_metadata?.full_name"
            >
              <template #leading>
                <UAvatar :src="user?.user_metadata?.picture" />
              </template>
            </UButton>
            <template #account>
              <div>
                <p>
                  <strong>{{ user?.email }}</strong>
                </p>
              </div>
            </template>
          </UDropdown>
        </template>
        <template v-else>
          <UButton
            variant="ghost"
            :loading="loading"
            label="Войти"
            external
            @click="signIn"
          />

        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownItem } from '#ui/types'

const client = useSupabaseClient()
const user = useSupabaseUser()
const session = useSupabaseSession()

const loading = ref(false)



async function kek() {
  const res = await useFetch('/api/events')
  console.log({ res })
}

const items: DropdownItem[][] = [
  [{ slot: 'account', label: '', disabled: true }, { label: 'Профиль', to: '/me', icon: 'i-heroicons-user' }],

  [
    { label: 'Главная', icon: 'i-heroicons-home', to: '/' },
    { label: 'Мои мероприятия', icon: 'i-heroicons-fire', to: '/me/events' },
    { label: 'Все мероприятия', icon: 'i-heroicons-signal', to: '/events' },
  ],

  [
    {
      label: 'Выйти',
      click: signOut,

      icon: 'i-heroicons-arrow-right-start-on-rectangle',
    },
  ],
]

async function signOut() {
  loading.value = true
  await client.auth.signOut().finally(() => {
    loading.value = false
  })
}

const toast = useToast()

async function signIn() {
  loading.value = true
  const { error } = await client.auth
    .signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    })
    .finally(() => {
      loading.value = false
    })

  if (error) {
    toast.add({
      title: 'Ошибка',
      description: error?.message,
    })
    throw createError(error.message)
  }
}
</script>
