// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/color-mode', '@nuxt/eslint'],
  ssr: false,
  eslint: {
    config: {
      // stylistic: true,
    },
  },
  app: {
    head: {
      titleTemplate: '%s timursaurus | NFactorial 2024',
      // titleTemplate(title) {
      //   const res = [title, "timursaurus", "NFactorial 2024"]
      //     .filter(Boolean)
      //     .join(" | ");

      //   return res;
      // },
    },
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
