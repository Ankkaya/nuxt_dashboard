<template>
  <DashboardPanelContent>
    <DashboardSection title="配置" description="页面主题"></DashboardSection>

    <UDivider class="mb-4" />

    <UForm
      :schema="userInfoSchema"
      :state="userInfoForm"
      @submit="onSubmitForm"
    >
      <DashboardSection title="资料" description="个人信息设置">
        <template #links>
          <UButton type="submit" label="保存更改" color="black" />
        </template>
        <UFormGroup
          name="avatar"
          label="头像"
          class="grid grid-cols-2 gap-2"
          help="JPG, GIF or PNG. 最大 1MB."
          :ui="{ container: 'flex flex-wrap items-center gap-3', help: 'mt-0' }"
        >
          <UAvatar
            :src="'http://localhost:3001/' + userInfoForm.headPic"
            :alt="userInfoForm.nickName"
            size="lg"
          />
          <UButton label="选择" color="white" size="md" @click="onFileClick" />

          <UInput
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg,.jpeg,.png,.git"
            @change="onFileChange"
          />
        </UFormGroup>
        <UFormGroup
          name="nickName"
          label="昵称"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput v-model="userInfoForm.nickName" />
        </UFormGroup>
        <UFormGroup
          name="email"
          label="邮箱"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <UInput v-model="userInfoForm.email" disabled />
        </UFormGroup>
        <UFormGroup
          name="captcha"
          label="验证码"
          required
          class="grid grid-cols-2 gap-2 items-center"
        >
          <div class="flex gap-5">
            <UInput class="flex-1" v-model="userInfoForm.captcha" />
            <UButton @click="getCaptcha">发送验证码</UButton>
          </div>
        </UFormGroup>
      </DashboardSection>
    </UForm>
    <UDivider class="mb-4" />
  </DashboardPanelContent>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";

const userInfoSchema = object({
  nickName: string().required("请输入昵称"),
  email: string().email("请输入正确的邮箱").required("请输入邮箱"),
  captcha: string().required("请输入验证码"),
});

type UserInfoSchema = InferType<typeof userInfoSchema>;

const userInfoForm = ref({
  headPic: "",
  nickName: "",
  email: "",
  captcha: "",
});

const userStore = useUserStore();

async function onSubmitForm(event: FormSubmitEvent<UserInfoSchema>) {
  const apiPath = userStore.userInfo?.isAdmin
    ? "/user/admin/update"
    : "/user/update";
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
  await $fetch("/user/update/captcha", {
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: "Bearer " + useStorage("accessToken", "").value,
    },
  });

  toast.add({
    title: "发送成功",
    description: "验证码已发送至邮箱，请查收",
    color: "green",
    icon: "i-heroicons-check-circle-solid",
  });
}

const fileRef = ref<{ input: HTMLInputElement }>();

function onFileClick() {
  fileRef.value?.input.click();
}

type ResponseType = {
  code: number;
  message: string;
  data: any;
};

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (!input.files?.length) {
    return;
  }

  const formData = new FormData();
  formData.append("file", input.files[0]);

  const data: ResponseType = await $fetch("/user/upload", {
    baseURL: "http://localhost:3001",
    method: "POST",
    body: formData,
  });

  userInfoForm.value.headPic = data?.data;
}

useFetch("/user/info", {
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: "Bearer " + useStorage("accessToken", "").value,
  },
  onResponse({ response }) {
    userInfoForm.value.nickName = response._data.data.nickName;
    userInfoForm.value.email = response._data.data.email;
    userInfoForm.value.headPic = response._data.data.headPic;
  },
});
</script>
