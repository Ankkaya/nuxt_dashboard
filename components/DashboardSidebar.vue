<template>
  <aside>
    <div
      class="flex h-full w-full flex-col overflow-y-auto rounded-md bg-card p-2 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
    >
      <SiderbarItem :links="menu" />
      <div class="flex-1"></div>
      <UDivider class="sticky mb-2" />
      <UserDropdown />
    </div>
  </aside>
</template>

<script setup lang="ts">
const menu = [
  {
    id: "home",
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
    tooltip: {
      text: "Home",
      shortcuts: ["G", "H"],
    },
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: "i-heroicons-inbox",
    badge: "4",
    to: "/inbox",
    tooltip: {
      text: "Inbox",
      shortcuts: ["G", "I"],
    },
  },
  {
    id: "users",
    label: "Users",
    icon: "i-heroicons-user-group",
    to: "/users",
    tooltip: {
      text: "Users",
      shortcuts: ["G", "U"],
    },
  },
  {
    id: "settings",
    label: "设置",
    icon: "i-heroicons-cog-8-tooth",
    tooltip: {
      text: "Settings",
      shortcuts: ["G", "S"],
    },
    children: [
      {
        id: "general",
        label: "基础信息",
        to: "/settings/general",
      },
      {
        id: "password",
        label: "密码修改",
        to: "/settings/password",
      },
      {
        id: "notifications",
        label: "Notifications",
        to: "/settings/notifications",
      },
    ],
  },
];
</script>
