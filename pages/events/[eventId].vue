<template>
  <div>
    <template v-if="data">
      <Title>
        {{ data.title }}
      </Title>
      <EventPreview :event="data" :loading="pending" />
      <LocationPreview class="py-4" :event="data" />
    </template>

    <div class="py-4">
      <USkeleton v-if="pending && !data?.id" class="w-full h-32" />
      <template v-if="pending && data">
        <div class="flex justify-between">
          <USkeleton class="h-8 w-1/3" />
          <USkeleton class="h-8 w-1/3" />
        </div>
      </template>

      <template v-else>
        <UButton
          v-if="data?.id && !data.registration && user?.id"
          :loading="pending || loading.register"
          :disabled="pending"
          @click="register"
        >
          Зарегистрироваться!
        </UButton>
        <UButton v-if="!user?.id && data?.id" to="/login">
          Войдите, чтобы зарегистрироваться на мероприятие
        </UButton>

        <template v-if="data?.registration?.id">
          <div class="flex gap-2 justify-between">
            <UButton
              :loading="loading.unregister"
              color="red"
              @click="unregister"
            >
              Отменить регистрацию
            </UButton>
            <UButton
              v-if="!data.registration?.calendar_event_id"
              :disabled="loading.calendar"
              :loading="loading.calendar"
              @click="addToCalendar"
            >
              Добавить в Google Calendar
            </UButton>
            <UButton
              v-if="data.registration.calendar_event_id"
              :disabled="loading.calendar"
              :loading="loading.calendar"
              @click="removeFromCalendar"
            >
              Убрать из Google Calendar
            </UButton>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppEvent } from "~/types/app";

const route = useRoute();

const user = useSupabaseUser();
const { data, pending, refresh } = await useLazyFetch<AppEvent>(
  `/api/events/${route.params.eventId}`
);

const eventId = route.params?.eventId as string;
const toast = useToast();

const loading = reactive({
  register: false,
  unregister: false,
  calendar: false,
});

async function removeFromCalendar() {
  if (data.value?.registration?.calendar_event_id) {
    loading.calendar = true;
    const id = data.value?.registration?.calendar_event_id;
    await $fetch(`/api/events/${eventId}/calendar/${id}`, {
      method: "DELETE",
    }).finally(() => {
      loading.calendar = false;
    });
    refresh();
  }
}

async function addToCalendar() {
  if (data.value?.date) {
    const body = {
      summary: data.value?.title,
      description: data.value?.description,
      start: {
        dateTime: new Date(data.value?.date).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        // + 1 hour
        dateTime: new Date(
          new Date(data.value?.date).setHours(
            new Date(data.value?.date).getHours() + 1
          )
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    loading.calendar = true;
    const res = await $fetch(`/api/events/${eventId}/calendar`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: useRequestHeaders(["cookie"]),
    }).finally(() => {
      loading.calendar = false;
    });
    if (res) {
      toast.add({
        title: "Успешно",
        description: `Мероприятие ${data.value?.title} добавлено в ваш Google Calendar`,
      });
      refresh();
    }
  }
}

async function unregister() {
  if (data.value?.registration?.id) {
    const id = data.value?.registration?.id;
    loading.unregister = true;
    const res = await $fetch(`/api/registrations/${id}`, {
      method: "delete",
    }).finally(() => {
      loading.unregister = false;
    });
    if (res?.status === 204) {
      toast.add({
        title: "Успешно",
        description: `Вы успешно отменили регистрацию на ${data.value?.title}`,
      });
      await removeFromCalendar().finally(() => {
        refresh();
      });
    }
  }
}

async function register() {
  if (!data.value?.registration) {
    loading.register = true;
    const res = await $fetch(`/api/events/${eventId}/register`, {
      method: "POST",
    }).finally(() => {
      loading.register = true;
    });
    if (res?.status === 200) {
      toast.add({
        title: "Успешно",
        description: `Вы успешно зарегистрировались на ${data.value?.title}`,
        actions: [
          {
            label: "Добавить в Google-календарь?",
            click: () => {
              addToCalendar();
            },
          },
        ],
      });
      refresh();
    }
  }
}
</script>
