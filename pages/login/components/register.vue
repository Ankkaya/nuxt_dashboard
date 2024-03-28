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
      :schema="RegisterForm"
      :state="registerForm"
      class="space-y-4"
      @submit="onSubmitRegister"
    >
      <UFormGroup label="用户名" name="username" required>
        <UInput v-model="registerForm.username" />
      </UFormGroup>

      <UFormGroup label="密码" name="password" required>
        <UInput v-model="registerForm.password" type="password" />
      </UFormGroup>

      <UFormGroup label="昵称" name="nickName" required>
        <UInput v-model="registerForm.nickName" />
      </UFormGroup>

      <UFormGroup label="邮箱" name="email" required>
        <UInput v-model="registerForm.email" />
      </UFormGroup>

      <UFormGroup label="验证码" name="captcha" required>
        <div class="flex gap-5">
          <UInput class="flex-1" v-model="registerForm.captcha" />
          <UButton @click="getCaptcha">发送验证码</UButton>
        </div>
      </UFormGroup>

      <UButtonGroup orientation="horizontal">
        <UButton class="mt-5" type="submit"> 注册 </UButton>
        <UButton
          @click="btnBackClick"
          class="mt-5"
          variant="solid"
          color="black"
        >
          返回
        </UButton>
      </UButtonGroup>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const item = {
  label: "创建账号",
  description: "用户注册",
};

const panel = useState("loginPanel");
function btnBackClick() {
  panel.value = "defaultPanel";
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
  const data = await $fetch("/user/register", {
    method: "POST",
    baseURL: "http://localhost:3001",
    body: event.data,
  });
  panel.value = "defaultPanel";
}

const toast = useToast();
async function getCaptcha() {
  if (!registerForm.value.email) {
    toast.add({
      title: "提示",
      description: "请输入邮箱后再获取验证码",
      color: "orange",
      icon: "i-heroicons-information-circle-solid",
    });
    return;
  }

  await $fetch("/user/register-captcha", {
    baseURL: "http://localhost:3001",
    query: {
      address: registerForm.value.email,
    },
  });

  toast.add({
    title: "发送成功",
    description: "验证码已发送至邮箱，请查收",
    color: "green",
    icon: "i-heroicons-check-circle-solid",
  });
}
</script>
