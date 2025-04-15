<template>
  <UApp>
    <NuxtLayout :name="layout">
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const route = useRoute()
const {law, seo} = useSiteConfig().value

useSeoMeta({
  title: seo.site_title,
  ogTitle: seo.site_title,
  description: seo.site_description,
  ogDescription: seo.site_description,
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

// 1. 定义布局配置类型
type LayoutConfig = {
  path: string // 支持精确路径或通配符格式
  layout: string
}

// 2. 用户配置区（完全自定义）
const LAYOUT_CONFIG: LayoutConfig[] = [
  {path: '/book/*', layout: 'root'}, // 匹配 /book/123 等带参数的路径
  {path: '/console/login', layout: 'root'},
  {path: '/console', layout: 'console-default'},
  {path: '/console/about', layout: 'console-default'},
  {path: '/console/config', layout: 'console-default'},
]

// 3. 智能路径匹配器
const getLayout = (path: string): string => {
  // 统一处理路径格式（忽略末尾斜杠）
  const normalize = (p: string) => p.replace(/\/+$/, '') || '/'
  const currentPath = normalize(path)

  // 先检查精确匹配（包括规范化后的路径）
  for (const {path: configPath, layout} of LAYOUT_CONFIG) {
    const normalizedConfigPath = normalize(configPath)
    if (currentPath === normalizedConfigPath) {
      return layout
    }
  }

  // 再检查通配符匹配
  for (const {path: configPath, layout} of LAYOUT_CONFIG) {
    if (configPath.endsWith('/*')) {
      const basePath = normalize(configPath.slice(0, -2))
      if (
          currentPath.startsWith(basePath + '/') && // 是子路径
          currentPath !== basePath                  // 不是基础路径本身
      ) {
        return layout
      }
    }
  }

  return 'site-default' // 默认布局
}

const layout = computed(() => getLayout(route.path))
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
}
</style>
