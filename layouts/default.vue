<script setup lang="ts"></script>
<template>
    <div class="fixed inset-0 flex overflow-hidden">
        <DashboardSidebar
            class="flex-col items-stretch relative w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0 hidden lg:flex"
            style="--width: 250px"
        />

        <slot />
    </div>
</template>
b
