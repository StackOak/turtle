<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { law, seo } = useSiteConfig().value
useHead({
  title: seo.site_title,
  meta: [
    { name: 'description', content: seo.site_description },
    { name: 'keywords', content: seo.site_keywords }
  ],
  link: [
    { rel: 'icon', href: seo.site_favicon }
  ]
})
const route = useRoute()

// 按路径长度从长到短排序的布局配置
const LAYOUT_CONFIG = [
  // {
  //   name: 'console-two-column', // 更具体的路径优先
  //   paths: ['/console/about']   // 路径较长
  // },

  {
    name: 'root',
    paths: ['/console/editor', '/console/login']
  },
  {
    name: 'console-default',
    paths: ['/console']         // 路径较短
  },
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
