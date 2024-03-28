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
    label: "General",
    icon: "i-heroicons-user-circle",
    to: "/settings/general",
  },
  {
    label: "Members",
    icon: "i-heroicons-chart-bar",
    to: "/settings/members",
  },
  {
    label: "Notifications",
    icon: "i-heroicons-bell",
    to: "/settings/notifications",
  },
];
</script>
