<script setup lang="ts">
import LeftMenu from "~/layouts/components/console/left-menu.vue";
</script>

<template>
  <div style="background-color: #b1b1e3;" class="h-10">
    ddd
  </div>
  <div class="flex flex-row px-1 gap-4 pt-2 w-full">
    <div class="flex flex-col sticky top-0 self-start w-[180px] ">
      <NuxtLink to="/console/editor">
        <u-button color="neutral" size="xl" class="block text-center truncate   w-full">
          写文章
        </u-button>
      </NuxtLink>
      <div>
        <LeftMenu class="w-[15%] pt-2"/>
      </div>
    </div>
    <USeparator orientation="vertical" class="h-auto min-h-screen"/>
    <div class="w-full pr-3">
      <slot/>
    </div>
  </div>
</template>

