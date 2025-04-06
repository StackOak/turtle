<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const searchQuery = ref('')

const handleSearch = (event) => {
  console.log('搜索内容:', searchQuery.value)
  // 在这里添加你的搜索逻辑
}
const items = ref<NavigationMenuItem[]>([
  [
    {
      label: 'xilio.cn',
      to: '/',
      active: false,
    },
    {
      label: '主页',
      icon: 'i-lucide-database',
      to: '/composables',
      active: true,
    },
    {
      label: '搜索',
      icon: 'i-lucide-database',
      to: '/composables',
    },
    {
      label: '标签',
      icon: 'i-lucide-box',
      to: '/components',
    },
    {
      label: '关于我',
      icon: 'i-lucide-circle-help',
    }],
  [


    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/stackoak',
      target: '_blank'
    },
  ]
])
</script>
<template>
    <UNavigationMenu
   :class="{fontSize: '20px'}"
        highlight-color="neutral"
        orientation="vertical"
        :items="items">

    </UNavigationMenu>
</template>
<style scoped>

</style>
