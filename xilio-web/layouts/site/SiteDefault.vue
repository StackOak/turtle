<script setup lang="ts">
import Nav from '~/layouts/components/nav.vue'
import LeftMenu from "~/layouts/components/left-menu.vue";
</script>

<template>
  <Nav/>
    <div class="flex h-screen"> <!-- 容器撑满整个屏幕高度 -->
      <!-- 左侧 10% 宽度 -->
      <div class="w-[10%]   p-4">
        <LeftMenu/>
      </div>

      <!-- 右侧 90% 宽度 -->
      <div class="w-[90%] p-4">
        <slot/>
      </div>
    </div>

</template>

<style scoped>

</style>
