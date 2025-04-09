<script setup lang="ts">
import LeftMenu from '~/layouts/components/site/left-menu.vue'
</script>

<template>
  <div class="px-[10%]">
    <div class="flex gap-4 ">
      <!-- 左侧导航区域 -->
      <div class="flex flex-col sticky top-0 self-start w-[150px]">
        <NuxtLink to="/" class="  pl-2 pt-1 pb-2">
          <div class="flex flex-row items-center gap-1">
            <img src="~/assets/logo.jpeg" class="w-7 h-7">
            <span class="text-3xl font-bold text-gray-700">Turtle</span>
          </div>
        </NuxtLink>
        <LeftMenu class="mt-4"/>
        <NuxtLink to="/console/editor" class="pt-2">
          <u-button class="block text-center truncate  w-full" v-if="true" color="neutral" size="xl">
            写文章
          </u-button>
        </NuxtLink>
      </div>
      <USeparator orientation="vertical" class="h-auto min-h-screen"/>
      <!-- 右侧内容区域 -->
      <div class="flex-1 min-w-0">
        <slot/>
      </div>
    </div>
  </div>
</template>

