<template>
    <template v-for="(items, index) in links" :key="items.id">
        <NuxtLink v-if="!items.children" :to="items.to" class="flex flex-col w-full">
            <UButton
                color="gray"
                variant="ghost"
                class="border-gray-200 dark:border-gray-700"
                :ui="{ rounded: 'rounded-md', padding: { sm: 'p-3' } }"
            >
                <template #leading>
                    <div
                        class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1"
                    >
                        <UIcon :name="items.icon" class="w-4 h-4 text-white dark:text-gray-900" />
                    </div>
                </template>
                <p class="truncate text-[15px]">{{ items.label }}</p>
            </UButton>
        </NuxtLink>

        <UAccordion v-else :items="[items]" :ui="{ wrapper: 'flex flex-col w-full' }">
            <template #default="{ item, index, open }">
                <UButton
                    color="gray"
                    variant="ghost"
                    class="border-gray-200 dark:border-gray-700"
                    :ui="{ rounded: 'rounded-md', padding: { sm: 'p-3' } }"
                >
                    <template #leading>
                        <div
                            class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1"
                        >
                            <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
                        </div>
                    </template>
                    <p class="truncate text-[15px]">{{ item.label }}</p>
                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-right-20-solid"
                            class="w-5 h-5 ms-auto transform transition-transform duration-200"
                            :class="[open && 'rotate-90']"
                        />
                    </template>
                </UButton>
            </template>
            <template #item="{ item, index, open }">
                <div class="mx-6 flex flex-col border-l px-3">
                    <template v-for="(sitem, sindex) in items.children">
                        <NuxtLink :to="sitem.to">
                            <UButton
                                color="gray"
                                variant="ghost"
                                class="border-gray-200 dark:border-gray-700 w-full rounded-md"
                                :ui="{ rounded: 'rounded-md', padding: { sm: 'p-3' } }"
                            >
                                <span class="truncate">{{ sitem.label }}</span>
                            </UButton>
                        </NuxtLink>
                    </template>
                </div>
            </template>
        </UAccordion>
    </template>
</template>

<script setup lang="ts">
const props = defineProps<{
    links?: any[]
}>()
</script>
