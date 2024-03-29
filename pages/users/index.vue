<template>
  <DashboardPage>
    <DashboardPanel>
      <DashboardNavbar title="用户管理">
        <template #right>
          <UButton
            label="新增用户"
            trailing-icon="i-heroicons-plus"
            color="gray"
          />
        </template>
      </DashboardNavbar>
      <DashboardToolbar>
        <template #left>
          <UInput v-model="searchForm.username" placeholder="用户名" />
          <UInput v-model="searchForm.nickName" placeholder="昵称" />
          <UInput v-model="searchForm.email" placeholder="邮箱" />
        </template>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            :options="defaultColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            multiple
            class="hidden lg:block"
          >
            <template #label> 展示 </template>
          </USelectMenu>
          <UButton
            @click="resetClick"
            trailing-icon="i-heroicons-funnel"
            color="gray"
            label="重置"
            class="ml-5"
          />
        </template>
      </DashboardToolbar>

      <UTable :rows="users" :columns="columns">
        <template #headPic-data="{ row }">
          <UAvatar :src="row.headPic" :alt="row.nickname" size="md" />
        </template>
        <template #isFreeze-data="{ row }">
          <UBadge :color="row.isFreeze ? 'red' : 'green'">
            {{ row.isFreeze ? "冻结" : "正常" }}
          </UBadge>
        </template>
        <template #actions-data="{ row }">
          <UButton
            @click="freezeClick(row)"
            :color="row.isFreeze ? 'primary' : 'red'"
            :label="row.isFreeze ? '开通' : '冻结'"
          />
        </template>
      </UTable>

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center mr-5">
          <span>每页显示：</span>
          <USelect v-model="pageCount" :options="pageSizeList" />
        </div>
        <UPagination v-model="page" :page-count="pageCount" :total="total" />
      </div>
    </DashboardPanel>
  </DashboardPage>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core";

const defaultColumns = [
  { label: "用户名", key: "username" },
  { label: "昵称", key: "nickName" },
  { label: "手机号", key: "phoneNumber" },
  { label: "邮箱", key: "email" },
  { label: "头像", key: "headPic" },
  { label: "状态", key: "isFreeze" },
  { label: "注册时间", key: "createTime" },
  { label: "操作", key: "actions" },
];
const selectedColumns = ref(defaultColumns);

const columns = computed(() =>
  defaultColumns.filter((column) => selectedColumns.value.includes(column))
);

const users = ref([]);

const page = ref(1);
const pageCount = ref(10);
const total = ref(0);
const pageSizeList = [10, 20, 30, 40, 50];
const searchForm = ref({
  username: "",
  nickName: "",
  email: "",
});

function resetClick() {
  searchForm.value.username = "";
  searchForm.value.nickName = "";
  searchForm.value.email = "";
  page.value = 1;
}

const { data, pending, refresh } = await useLazyAsyncData<{
  data: {
    users: any;
    totalCount: number;
  };
}>(
  "/user/list",
  () =>
    $fetch("/user/list", {
      baseURL: "http://localhost:3001",
      headers: {
        Authorization: "Bearer " + useStorage("accessToken", "").value,
      },
      query: {
        pageNo: page.value,
        pageSize: pageCount.value,
        username: searchForm.value.username,
        nickName: searchForm.value.nickName,
        email: searchForm.value.email,
      },
    }),
  {
    watch: [page, searchForm.value, pageCount],
  }
);

watch(
  () => pending.value,
  (value) => {
    if (!value && data.value) {
      users.value = data.value.data.users;
      total.value = data.value.data.totalCount;
    }
  }
);

const toast = useToast();
function freezeClick(row: any) {
  $fetch("/user/freeze", {
    baseURL: "http://localhost:3001",
    headers: {
      Authorization: "Bearer " + useStorage("accessToken", "").value,
    },
    query: {
      id: row.id,
    },
    onResponse({ response }) {
      console.log(response);
      toast.add({
        title: "操作成功",
        description: "账号冻结成功",
      });
      refresh();
    },
    onResponseError({ request, response, options }) {
      console.log(request, response, options);
    },
  });
}
</script>
