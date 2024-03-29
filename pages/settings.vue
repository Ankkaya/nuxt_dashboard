<template>
  <DashboardPage>
    <DashboardPanel>
      <DashboardNavbar title="Setting"> </DashboardNavbar>
      <DashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </DashboardToolbar>
      <NuxtPage />
    </DashboardPanel>
  </DashboardPage>
</template>

<script setup lang="ts">
const links = [
  {
    label: "基础信息",
    icon: "i-heroicons-user-circle",
    to: "/settings/general",
  },
  {
    label: "密码修改",
    icon: "i-heroicons-lock-closed",
    to: "/settings/password",
  },
  {
    label: "Notifications",
    icon: "i-heroicons-bell",
    to: "/settings/notifications",
  },
];
</script>
