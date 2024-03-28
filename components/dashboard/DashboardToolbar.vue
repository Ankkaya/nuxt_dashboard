<template>
  <!-- wrapper -->
  <div :class="classes">
    <div :class="config.container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import type { PropType } from "vue";

defineOptions({
  inheritAttrs: false,
});

const config = {
  wrapper:
    "min-h-[49px] flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-2 gap-x-4",
  container: "flex items-center justify-between flex-1 gap-x-1.5",
};

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
});

const classes = twMerge(config.wrapper, props.class);
</script>
