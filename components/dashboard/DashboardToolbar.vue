<template>
  <!-- wrapper -->
  <div :class="classes">
    <div :class="config.container">
      <div v-if="$slots.left" :class="config.left">
        <slot name="left"></slot>
      </div>
      <div v-if="$slots.right" :class="config.right">
        <slot name="right"></slot>
      </div>
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
  left: "flex items-stretch gap-1.5",
  right: "flex items-stretch gap-1.5",
};

const props = defineProps({
  class: {
    type: [String, Object, Array] as PropType<any>,
    default: undefined,
  },
});

const classes = twMerge(config.wrapper, props.class);
</script>
