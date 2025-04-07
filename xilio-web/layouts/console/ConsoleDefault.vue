<script setup lang="ts">

import LeftMenu from "~/layouts/components/console/left-menu.vue";

</script>

<template>
  <div class="flex flex-row px-[12%] gap-4">
    <div class="flex flex-col w-[15%]">
      <LeftMenu />
      <u-button color="neutral" size="xl" class="text-center">
        <NuxtLink to="/console/editor">
          写文章
        </NuxtLink>
      </u-button>
    </div>

    <slot class="w-[65%]" />
    <div class="w-[20%]">

    </div>
  </div>
</template>

<style scoped>


</style>
