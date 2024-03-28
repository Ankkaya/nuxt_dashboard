<template>
  <div class="flex justify-center items-center h-screen">
    <HomeTetris />
    <div class="lg:w-1/2 w-11/12 relative">
      <component :is="com" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginPanel from "./components/login.vue";
import Register from "./components/register.vue";
import ResetPwd from "./components/resetPwd.vue";

definePageMeta({
  layout: false,
});

const com = shallowRef(LoginPanel);
const panel = useState("loginPanel", () => "defaultPanel");

watch(panel, (value) => {
  switch (value) {
    case "registerPanel":
      com.value = Register;
      break;
    case "forgetPanel":
      com.value = ResetPwd;
      break;
    case "defaultPanel":
      com.value = LoginPanel;
      break;
  }
});
</script>
