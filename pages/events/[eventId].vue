<template>
  <Title> {{ route.params?.eventId }}</Title>

  {{ route.params?.eventId }}
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
</script>
