<template>
  <div>
    <h2 class="text-3xl " >
      <b>
        Мои мероприятия
      </b>
    </h2>
    <div class="py-4" >
      <template  v-if="pending && !data" >
        <USkeleton  v-for="n in 5" :key="n" class="h-24 w-full mb-4"  />
      </template>
      <template v-for="event in data?.content || []" :key="event?.id">
        <EventPreview class="mb-4" :event="event" :loading="pending" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// const { data, error, pending, refresh } =await useLazyAsyncData('events:me', () =>$fetch('/api/events/me'))

// const {  }  = await $fetch('/api/events/me')
// const { data, error, pending, refresh } = await useFetch('/api/events/me')


// const { data,  } = await useLazyAsyncData(
//   "events:me",
//   () => $fetch("/api/events/me"), { immediate: true }
// );

const { data, pending } = useFetch("/api/events/me");



definePageMeta({
  middleware: ["auth"],
});
</script>
