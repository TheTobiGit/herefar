// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // Add the path to the global CSS file
  css: ['~/assets/css/main.css'],

  // Register the installed Nuxt modules
  modules: [
    '@vueuse/nuxt', // VueUse utilities integration
    'nuxt-icon',    // Icon management module
    '@nuxt/image',  // Image optimization module
  ],

  // Add the Vite configuration for Tailwind CSS
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
