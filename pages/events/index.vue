<template>
  <div>
    <h2 class="text-3xl flex gap-4">
      <Title> Все мероприятия </Title>
      <b> Все мероприятия </b>
      <UButton
        icon="i-heroicons-arrow-down-circle"
        variant="ghost"
        :disabled="pending"
        :loading="pending"
        @click="refresh"
        >Обновить</UButton
      >
    </h2>
    <div class="py-4">
      <template v-if="pending && !data">
        <USkeleton v-for="n in 5" :key="n" class="h-24 w-full mb-4" />
      </template>
      <template v-for="event in data?.content" :key="event?.id">
        <EventPreview class="mb-4" :event="event" :loading="pending" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, pending, refresh } = await useLazyAsyncData(
  "events:all",
  () => $fetch("/api/events"),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key];
    },
  }
);
</script>
