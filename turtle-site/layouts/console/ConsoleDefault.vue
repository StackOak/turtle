<script setup lang="ts">

import LeftMenu from "~/layouts/components/console/left-menu.vue";

</script>

<template>
  <div class="flex flex-row px-0 gap-4 pt-2 w-full">
    <div class="flex flex-col  ">
      <NuxtLink to="/console/editor" >
        <u-button color="neutral" size="xl" class="block text-center truncate   w-full">
          写文章
        </u-button>
      </NuxtLink>
      <LeftMenu class="w-[15%] pt-2"/>
    </div>
    <div class="flex-grow w-[65%]">
      <slot/>
    </div>
    <div class="w-[20%] flex-shrink-0 ">
    </div>
  </div>
</template>

<style scoped>


</style>
