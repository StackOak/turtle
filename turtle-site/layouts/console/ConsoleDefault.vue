<script setup lang="ts">

import LeftMenu from "~/layouts/components/console/left-menu.vue";
</script>

<template>
  <div class="flex flex-row px-1 gap-4 pt-2 w-full">
    <div class="flex flex-col sticky top-0 self-start w-[180px]">
      <NuxtLink to="/console/editor">
        <u-button color="neutral" size="xl" class="block text-center truncate   w-full">
          写文章
        </u-button>
      </NuxtLink>
      <div>
        <LeftMenu class="w-[15%] pt-2 "/>
      </div>
    </div>
    <USeparator orientation="vertical" class="h-auto min-h-screen"/>
    <div class="flex-grow w-[65%]">
      <slot/>
    </div>
    <div class="w-[20%] flex-shrink-0 ">
    </div>
  </div>
</template>

