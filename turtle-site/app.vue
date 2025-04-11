<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const route = useRoute()

// 按路径长度从长到短排序的布局配置
const LAYOUT_CONFIG = [
  // {
  //   name: 'console-two-column', // 更具体的路径优先
  //   paths: ['/console/about']   // 路径较长
  // },
  {
    name: 'console-default',
    paths: ['/console']         // 路径较短
  },
  {
    name: 'root',
    paths: ['/console/editor', '/console/login']
  }
] as const

const layout = computed(() => {
  // 按配置顺序检查（从最具体到最通用）
  for (const config of LAYOUT_CONFIG) {
    if (config.paths.some(path => route.path.startsWith(path))) {
      return config.name
    }
  }
  return 'site-default' // 用户端默认布局
})
</script>
<style>
*,
*::before,
*::after {
  margin: 0;
}
</style>
