<template>
  <div
    class="divide-y divide-gray-200 dark:divide-gray-800 space-y-6 *:pt-6 first:*:pt-0 mb-6"
  >
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-start gap-4">
        <div>
          <div class="text-gray-900 dark:text-white font-semibold">
            {{ title }}
          </div>
          <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ description }}
          </div>
        </div>
      </div>
      <div
        v-if="links?.length || $slots.links"
        class="flex flex-wrap items-center gap-1.5"
      >
        <slot name="links">
          <UButton
            v-for="(link, index) in links"
            :key="index"
            v-bind="link"
            @click="link.click"
          />
        </slot>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Button } from "#ui/types";

const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  links: {
    type: Array as PropType<(Button & { click?: Function })[]>,
    default: () => [],
  },
});
</script>
