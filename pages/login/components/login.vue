<template>
  <UCard>
    <template #header>
      <p
        class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
      >
        {{ item.label }}
      </p>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ item.description }}
      </p>
    </template>
    <UForm
      :schema="loginSchema"
      :state="loginForm"
      @submit="onSubmitLogin"
      class="space-y-4"
    >
      <UFormGroup label="用户名" name="username" required>
        <UInput v-model="loginForm.username" />
      </UFormGroup>

      <UFormGroup label="密码" name="password" required>
        <UInput v-model="loginForm.password" type="password" />
      </UFormGroup>

      <ButtonGroup />

      <UButton class="mt-5" type="submit"> 登录 </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import ButtonGroup from "./buttonGroup.vue";

const item = {
  label: "登录",
  description: "用户登录",
};

const loginSchema = object({
  username: string().required("请输入用户名"),
  password: string().min(6, "密码至少 6 位").required("请输入密码"),
});

type LoginSchema = InferType<typeof loginSchema>;

const loginForm = ref({
  username: "",
  password: "",
});

interface Result {
  code: number;
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: any;
  };
}

const accessToken = useStorage<string | null>("accessToken", "");

async function onSubmitLogin(event: FormSubmitEvent<LoginSchema>) {
  const data: Result = await $fetch("/user/login", {
    method: "POST",
    baseURL: "http://localhost:3001",
    body: event.data,
  });
  accessToken.value = data.data.accessToken;
  navigateTo("/");
}
</script>
