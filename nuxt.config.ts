// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@morev/vue-transitions/nuxt"],
  ui: {
    icons: ["heroicons", "simple-icons"],
  },
  colorMode: {
    preference: "light",
  },
  components: [
    {
      path: "~/components",
    },
    {
      path: "~/components/common",
      pathPrefix: false,
    },
  ],
});
