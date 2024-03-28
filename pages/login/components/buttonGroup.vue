<template>
  <div class="mt-[5px] flex justify-between">
    <UButton @click="btnClick('register')" color="black" variant="link"
      >创建账号</UButton
    >
    <UButton @click="btnClick('forget')" color="black" variant="link"
      >忘记密码</UButton
    >
  </div>
</template>

<script setup lang="ts">
const panel = useState("loginPanel");

function btnClick(type: string) {
  switch (type) {
    case "register":
      panel.value = "registerPanel";
      break;
    case "forget":
      panel.value = "forgetPanel";
      break;
  }
}
</script>
