<template>
  <pre>

  {{ user }}

</pre>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const session = useSupabaseSession()
</script>
