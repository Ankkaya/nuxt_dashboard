<template>
  <div class="mt-[5px] flex justify-end">
    <UButton @click="btnClick" color="black" variant="link">忘记密码</UButton>
  </div>
</template>

<script setup lang="ts">
const panel = useState("loginPanel");

function btnClick() {
  panel.value = "forgetPanel";
}
</script>
