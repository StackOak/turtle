<script setup lang="ts">
import LeftMenu from "~/layouts/components/console/left-menu.vue";
import TopHeader from "~/layouts/components/console/top-header.vue";
</script>

<template>
  <div class="w-full px-1">
    <top-header/>
    <div class="flex flex-row  gap-4 ">
      <div class="flex flex-col sticky top-0 self-start w-[180px]  ">
          <LeftMenu class="w-[15%]"/>
      </div>
      <USeparator orientation="vertical" class="h-auto min-h-screen"/>
      <div class="w-full p-1">
        <slot/>
      </div>
    </div>
  </div>
</template>

