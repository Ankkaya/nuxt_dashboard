<template>
  <div
    class="rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900"
  >
    <div
      class="flex flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6 pb-0"
    >
      <slot name="header">
        <div class="flex items-start gap-4">
          <UIcon :name="icon" class="h-12 w-12" />
          <div>
            <p class="text-gray-900 dark:text-white font-semibold">
              {{ title }}
            </p>
            <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">
              {{ description }}
            </p>
          </div>
        </div>
      </slot>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
});
</script>
