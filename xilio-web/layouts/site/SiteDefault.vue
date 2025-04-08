<script setup lang="ts">
import LeftMenu from '~/layouts/components/site/left-menu.vue'
</script>

<template>
  <div class="px-[12%]">
    <div class="flex gap-4">
      <!-- 左侧导航区域 -->
      <div class="flex flex-col sticky top-0 self-start min-w-[150px]">
        <NuxtLink to="/" class="text-3xl font-bold text-gray-700 pl-2 pt-1 pb-2">
          xilio.cn
        </NuxtLink>
        <LeftMenu class="mt-4"/>
        <u-button v-if="true" color="neutral" size="xl" class="text-center mt-4">
          <NuxtLink to="/console/editor">
            写文章
          </NuxtLink>
        </u-button>
      </div>
      <!-- 右侧内容区域 -->
      <div class="flex-1">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
