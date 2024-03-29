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
      :schema="pwdSchema"
      :state="pwdForm"
      class="space-y-4"
      @submit="onSubmitReset"
    >
      <UFormGroup label="用户名" name="username" required>
        <UInput v-model="pwdForm.username" />
      </UFormGroup>
      <UFormGroup label="邮箱" name="email" required>
        <UInput v-model="pwdForm.email" />
      </UFormGroup>

      <UFormGroup label="验证码" name="captcha" required>
        <div class="flex gap-5">
          <UInput class="flex-1" v-model="pwdForm.captcha" />
          <UButton @click="getCaptcha">发送验证码</UButton>
        </div>
      </UFormGroup>

      <UFormGroup label="新密码" name="password" required>
        <UInput v-model="pwdForm.password" type="password" />
      </UFormGroup>

      <UFormGroup label="确认密码" name="newPassword" required>
        <UInput v-model="pwdForm.newPassword" type="password" />
      </UFormGroup>

      <UButtonGroup orientation="horizontal">
        <UButton class="mt-5" type="submit"> 修改 </UButton>
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
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const item = {
  label: "忘记密码",
  description: "邮箱重置密码",
};

const panel = useState("loginPanel");
function btnBackClick() {
  panel.value = "defaultPanel";
}

const pwdSchema = yup.object({
  username: yup.string().required("请输入用户名"),
  password: yup.string().min(6, "密码至少 6 位").required("请输入密码"),
  newPassword: yup
    .string()
    .oneOf([yup.ref("password")], "两次密码不一致")
    .required("请输入确认密码"),
  email: yup.string().email("请输入正确的邮箱").required("请输入邮箱"),
  captcha: yup.string().required("请输入验证码"),
});

type PwdSchema = yup.InferType<typeof pwdSchema>;

const pwdForm = ref({
  username: "",
  password: "",
  newPassword: "",
  email: "",
  captcha: "",
});

async function onSubmitReset(event: FormSubmitEvent<PwdSchema>) {
  const data = await $fetch("/user/admin/update_password", {
    method: "POST",
    baseURL: "http://localhost:3001",
    body: event.data,
  });

  toast.add({
    title: "成功",
    description: "密码修改成功，请重新登录",
    color: "green",
    icon: "i-heroicons-check-circle-solid",
  });

  panel.value = "defaultPanel";
}

const toast = useToast();
async function getCaptcha() {
  if (!pwdForm.value.email) {
    toast.add({
      title: "错误",
      description: "请输入邮箱后再获取验证码",
      color: "red",
      icon: "i-heroicons-x-circle-solid",
    });
    return;
  }
  await $fetch("/user/update_password/captcha", {
    baseURL: "http://localhost:3001",
    query: {
      address: pwdForm.value.email,
    },
  });

  toast.add({
    title: "成功",
    description: "验证码已发送，请查收",
    color: "green",
    icon: "i-heroicons-check-circle-solid",
  });
}
</script>
