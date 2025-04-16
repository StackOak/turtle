<script setup lang="ts">
import LeftMenu from "~/layouts/components/console/left-menu.vue";
import TopHeader from "~/layouts/components/console/top-header.vue";
</script>

<template>
  <div class="w-full">
    <top-header/>
    <div class="flex flex-row  gap-4 ">
      <div class="flex flex-col sticky top-0 self-start w-[180px]  ">
          <LeftMenu class="w-[15%]"/>
      </div>
      <USeparator  orientation="vertical" class="h-auto min-h-screen "/>
      <div class="w-full pt-1 pr-3">
        <slot/>
      </div>
    </div>
  </div>
</template>

