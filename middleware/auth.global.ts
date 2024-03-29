import { useStorage } from "@vueuse/core";
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useStorage("accessToken", undefined);
  if (!auth.value && to.path !== "/login" && to.path !== "/admin") {
    return navigateTo("/login");
  }
});
