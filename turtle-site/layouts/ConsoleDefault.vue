<script setup lang="ts">
import LeftMenu from "~/layouts/components/console/left-menu.vue";
import TopHeader from "~/layouts/components/console/top-header.vue";
</script>

<template>
  <div class="w-full min-h-screen flex flex-col">
    <top-header/>
    <div class="flex flex-row gap-4 flex-1">
      <div class="w-[180px]   min-h-screen">
        <LeftMenu/>
      </div>
      <USeparator orientation="vertical" class="h-auto min-h-screen"/>
      <div class="w-full pt-1 pr-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

