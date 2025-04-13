<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const oneClickBack = () => {
  router.back();
};
</script>

<template>
  <div class="flex flex-row items-center sticky top-0 z-100 bg-white/90 pb-1 pt-1">
    <div
        @click="oneClickBack"
        class="flex items-center cursor-pointer justify-center w-9 h-9 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <UTooltip text="返回">
        <UIcon name="ep:back" class="size-8 text-gray-800"/>
      </UTooltip>
    </div>
    <div class="cursor-pointer pl-3 text-gray-800 font-bold text-xl">
      <slot/>
    </div>
  </div>
</template>
