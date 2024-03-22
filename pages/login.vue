<template>
  <div class="flex justify-center items-center h-screen">
    <HomeTetris />
    <UTabs :items="items" class="w-1/2">
      <template #login="{ item }">
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
          >
            <UFormGroup label="用户名" name="username">
              <UInput v-model="loginForm.username" />
            </UFormGroup>

            <UFormGroup label="密码" name="password">
              <UInput v-model="loginForm.password" type="password" />
            </UFormGroup>

            <UButton class="mt-5" type="submit"> 登录 </UButton>
          </UForm>
        </UCard>
      </template>
      <template #register="{ item }">
        <UCard @submit.prevent="onSubmitRegister">
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
            :schema="RegisterForm"
            :state="registerForm"
            @submit="onSubmitRegister"
          >
            <UFormGroup label="用户名" name="username">
              <UInput v-model="registerForm.username" />
            </UFormGroup>

            <UFormGroup label="密码" name="password">
              <UInput v-model="registerForm.password" type="password" />
            </UFormGroup>

            <UFormGroup label="昵称" name="nickName">
              <UInput v-model="registerForm.nickName" />
            </UFormGroup>

            <UFormGroup label="邮箱" name="email">
              <UInput v-model="registerForm.email" />
            </UFormGroup>

            <UFormGroup label="验证码" name="captcha">
              <UInput v-model="registerForm.captcha" />
            </UFormGroup>

            <UButton class="mt-5" type="submit"> 注册 </UButton>
          </UForm>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const items = [
  {
    key: "login",
    label: "登录",
    description: "用户登录",
    slot: "login",
  },
  {
    key: "register",
    label: "注册",
    description: "用户注册",
    slot: "register",
  },
];

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

async function onSubmitLogin(event: FormSubmitEvent<LoginSchema>) {
  const data: Result = await $fetch("/user/login", {
    method: "POST",
    baseURL: "http://localhost:3001",
    body: event.data,
  });
  useState("auth", () => data.data.accessToken);
  navigateTo("/");
}

const RegisterForm = object({
  username: string().required("请输入用户名"),
  password: string().min(6, "密码至少 6 位").required("请输入密码"),
  nickName: string().required("请输入昵称"),
  email: string().email("请输入正确的邮箱").required("请输入邮箱"),
  captcha: string().required("请输入验证码"),
});

type RegisterSchema = InferType<typeof RegisterForm>;

const registerForm = ref({
  username: "",
  password: "",
  nickName: "",
  email: "",
  captcha: "",
});

async function onSubmitRegister(event: FormSubmitEvent<RegisterSchema>) {
  const data: Result = await $fetch("/user/register", {
    method: "POST",
    baseURL: "http://localhost:3001",
    body: event.data,
  });
}

definePageMeta({
  layout: false,
});
</script>
