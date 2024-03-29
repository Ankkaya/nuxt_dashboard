<template>
  <DashboardPanelContent>
    <UForm :schema="pwdFormSchema" :state="pwdForm" @submit="onSubmitForm">
      <DashboardSection title="密码修改" description="个人信息设置">
        <template #links>
          <UButton type="submit" label="保存更改" color="black" />
        </template>

        <UFormGroup
          label="新密码"
          name="password"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput v-model="pwdForm.password" type="password" />
        </UFormGroup>

        <UFormGroup
          label="确认密码"
          name="newPassword"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput v-model="pwdForm.newPassword" type="password" />
        </UFormGroup>

        <UFormGroup
          name="email"
          label="邮箱"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput v-model="pwdForm.email" disabled />
        </UFormGroup>
        <UFormGroup
          name="captcha"
          label="验证码"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <div class="flex gap-5">
            <UInput class="flex-1" v-model="pwdForm.captcha" />
            <UButton @click="getCaptcha">发送验证码</UButton>
          </div>
        </UFormGroup>
      </DashboardSection>
    </UForm>
    <UDivider class="mb-4" />
  </DashboardPanelContent>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useStorage } from "@vueuse/core";
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const pwdFormSchema = object({
  password: yup.string().min(6, "密码至少 6 位").required("请输入密码"),
  newPassword: yup
    .string()
    .oneOf([yup.ref("password")], "两次密码不一致")
    .required("请输入确认密码"),
  captcha: string().required("请输入验证码"),
});

type PwdFormSchema = InferType<typeof pwdFormSchema>;

const pwdForm = ref({
  password: "",
  newPassword: "",
  email: "",
  captcha: "",
  username: "",
});

const userStore = useUserStore();
pwdForm.value.email = userStore.userInfo?.email || "";
pwdForm.value.username = userStore.userInfo?.username || "";

async function onSubmitForm(event: FormSubmitEvent<PwdFormSchema>) {
  const apiPath = userStore.userInfo?.isAdmin
    ? "/user/admin/update_password"
    : "/user/update_password";
  const data = await $fetch(apiPath, {
    method: "POST",
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: "Bearer " + useStorage("accessToken", "").value,
    },
    body: event.data,
  });
}

const toast = useToast();
async function getCaptcha() {
  await $fetch("/user/update_password/captcha", {
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: "Bearer " + useStorage("accessToken", "").value,
    },
    query: {
      address: pwdForm.value.email,
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
