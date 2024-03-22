export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useState("auth");
  if (!auth.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
