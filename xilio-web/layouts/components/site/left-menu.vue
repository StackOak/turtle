<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const active = ref()

const items = ref<NavigationMenuItem[]>([
  [

    {
      label: '主页',
      icon: 'i-lucide-home',
      to: '/',
    },
    {
      labelKey:'search',
      label: '搜索',
      icon: 'i-lucide-search',
      to: '/search',
    },
    {
      label: '知识库',
      icon: 'i-lucide-book',
      to: '/book',
    },
    {
      label: '标签',
      icon: 'i-lucide-tag',
      to: '/tag',
    },
    {
      label: '关于我',
      icon: 'ix:about',
      to: '/about',
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
      v-model:model-value="active"
      highlight-color="neutral"
      orientation="vertical"
      :items="items">

  </UNavigationMenu>
</template>
<style scoped>

</style>
