<template>
  <div>
    <h2 class="text-3xl " >
      <Title>
        Последние мероприятия
      </Title>
      <b>
        Последние мероприятия
      </b>
    </h2>
    <div class="py-4" >
      <template  v-if="pending && !data" >
        <USkeleton  v-for="n in 5" :key="n" class="h-24 w-full mb-4"  />
      </template>
      <template v-for="event in data?.content" :key="event.id">
        <EventPreview class="mb-4" :event="event" :loading="pending" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { data, pending } = await useFetch("/api/events/latest", { headers: useRequestHeaders(['cookie']) });
const { data, pending } = await useLazyAsyncData(
  "events:latest",
  () => $fetch("/api/events/latest"),
  {
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key];
    },
  }
);
</script>
