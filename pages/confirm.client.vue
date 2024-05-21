<template>
  <div>
    redirecting...
  </div>
</template>

<script setup lang='ts'>
const user = useSupabaseUser()

watch(() => user.value?.id, (id) => {
  if (id) {
    return navigateTo('/')
  }
})
</script>
