<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

definePageMeta({
  layout: "default",
});

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [
  [
    {
      label: "New mail",
      icon: "i-heroicons-paper-airplane",
      to: "/inbox",
    },
    {
      label: "New user",
      icon: "i-heroicons-user-plus",
      to: "/users",
    },
  ],
];

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");
</script>

<template>
  <!-- dashboard page -->
  <div class="flex flex-1 w-full min-w-0">
    <!-- panel -->
    <div class="flex-col items-stretch relative w-full flex-1 flex">
      <!-- navbar -->
      <DashboardNavbar title="Home">
        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton color="gray" variant="ghost" square>
              <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="w-5 h-5" />
              </UChip>
            </UButton>
          </UTooltip>
          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </DashboardNavbar>

      <!-- toolbar -->
      <div
        class="min-h-[49px] flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-2 gap-x-4"
      >
        <div class="flex items-center justify-between flex-1 gap-x-1.5">
          <div class="flex items-stretch gap-1.5">
            <HomeDateRangePicker v-model="range" class="-ml-2.5" />
            <HomePeriodSelect v-model="period" :range="range" />
          </div>
        </div>
      </div>
      <!-- panel content -->
      <div class="p-4 flex-1 flex flex-col overflow-y-auto">
        <HomeChart :period="period" :range="range" />
        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <HomeSales />
          <HomeCountries />
        </div>
      </div>
    </div>
  </div>
</template>
