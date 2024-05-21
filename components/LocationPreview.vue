<template>
  <div>
    <USkeleton v-if="pending"  class="h-12 w-1/2" />
    <template v-else >
      <div>
        <b>
          {{data?.name  }}
        </b>
      </div>
      <div>
        Адрес: {{ data?.address }}
      </div>
      <div>
        Вместимость: {{ data?.capacity  }}
      </div>
    </template>
  </div>
</template>

<script setup lang='ts'>
import type { AppEvent } from '~/types/app';


const props = defineProps<{
  event: AppEvent;
  loading?: boolean;
}>()



const { data, pending } = await useLazyAsyncData("locations:detail", () => $fetch(`/api/locations/${props.event.location_id}`))


</script>