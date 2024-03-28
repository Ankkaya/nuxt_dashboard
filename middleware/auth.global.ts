import { useStorage } from "@vueuse/core";
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useStorage("accessToken", undefined);

  if (!auth.value && to.path !== "/login") {
    console.log("redirect to login");
    return navigateTo("/login");
  }
});
