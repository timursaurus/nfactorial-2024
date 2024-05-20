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
    <pre>

      {{ user }}
    </pre>
    ok my profile
  </UCard>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

definePageMeta({
  middleware: ["auth"],
});
</script>
