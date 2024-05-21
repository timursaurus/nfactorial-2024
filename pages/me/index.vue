<template>
  <UCard>
    <template #header>
      <div class="flex gap-4 items-center">
        <UAvatar
          size="xl"
          :src="user?.user_metadata?.picture"
          :alt="user?.user_metadata?.name"
        />
        <div>
          <p class="text-xl">
            {{ user?.user_metadata?.name }}
          </p>
        </div>
      </div>
    </template>
    <div>
      <h2 class="text-3xl mb-4 flex gap-4">
        <b> Зарегистрированные мероприятия </b>
      </h2>
      <template v-if="!data && pending">
        <USkeleton v-for="n in 5" :key="n" class="h-6 w-full mb-4"/>
      </template>
      <template v-for="event in data?.content" :key="event?.id">
        <div class="flex items-center">
          <span>
            {{ event.title }}
          </span>
          <UButton
            :to="{ name: 'events-eventId', params: { eventId: event.id } }"
            variant="ghost"
            icon="i-heroicons-arrow-right-circle"
          />
        </div>
        <UDivider />
      </template>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const { data, pending } = useFetch("/api/events/me");

definePageMeta({
  middleware: ["auth"],
});
</script>
