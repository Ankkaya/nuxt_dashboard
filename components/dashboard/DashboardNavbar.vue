<template>
  <!-- wrapper -->
  <div
    class="h-16 flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 min-w-0 px-4 gap-x-4"
  >
    <!-- container -->
    <div class="flex items-center justify-between flex-1 gap-x-1.5 min-w-0">
      <div class="flex items-stretch gap-1.5 min-w-0">
        <h1>{{ title }}</h1>
      </div>
      <div class="flex items-stretch flex-shrink-0 gap-1.5">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
