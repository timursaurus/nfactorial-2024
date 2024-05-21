// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/color-mode', '@nuxt/eslint'],
  // ssr: false,
  eslint: {
    config: {
      // stylistic: true,
    },
  },
  app: {
    head: {
      titleTemplate: '%s Eventmaster | timursaurus | nfactorial 2024',
      // titleTemplate(title) {
      //   const res = [title, "timursaurus", "NFactorial 2024"]
      //     .filter(Boolean)
      //     .join(" | ");

      //   return res;
      // },
    },
  },
  supabase: {
    redirect: false,
  },
  ui: {
    icons: ['mdi', 'heroicons']
  },
  colorMode: {
    preference: 'light',
  },
  appConfig: {
    colorMode: {
      preference: 'light',
    },

    ui: {

      primary: 'sky',
    },
  },
})