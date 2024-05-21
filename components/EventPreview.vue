<template>
  <UCard>
    <template #header>
      <USkeleton v-if="loading" class="h-6 w-1/2" />
      <template v-else>
        <b>
          <NuxtLink
            :to="{ name: 'events-eventId', params: { eventId: event.id } }"
          >
            {{ event?.title }}
          </NuxtLink>
        </b>
      </template>
    </template>
    <template #default>
      <USkeleton v-if="loading" class="w-full h-24" />
      <template v-else>
        {{ event?.description }}
      </template>
    </template>
    <template #footer>
      <USkeleton v-if="loading" class="w-full h-6" />
      <template v-else>
        <div class="flex justify-between" >
          <div class="flex gap-2" >
            <span v-if="event.date" >
              {{ new Date(event.date).toLocaleDateString('ru-ru') }}
            </span>
            <span v-if="event.time" >
              {{ event.time }}
            </span>
          </div>
          <div class="flex gap-1" >
            <span>
              {{ event.available_seats }}
            </span>
            <span>/</span>
            <span>
              {{ event.total_seats }}
            </span>
          </div>

          <template v-if="$route.name === 'events' || $route.name === 'index'  " >
            <UButton v-if="!event?.registration?.id" trailing icon="i-heroicons-arrow-long-right" :to="{ name: 'events-eventId', params: { eventId: event.id } }"> Иду! </UButton>
          </template>
          <template v-if="event?.registration?.id">
            <UButton disabled color="gray" > Зарегистрирован </UButton>
          </template>
        </div>
      </template>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { AppEvent } from "~/types/app";

defineProps<{
  event: AppEvent;
  loading?: boolean;
}>();
</script>
