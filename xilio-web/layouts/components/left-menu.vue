<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [

    {
      label: '首页',
      icon: 'i-lucide-book-open',

    },
    {
      label: '搜索',
      icon: 'i-lucide-database',

    },
    {
      label: 'AI',
      icon: 'i-lucide-box',
      to: '/ai',
      defaultOpen: true,
    },
    {
      label: '分类',
      icon: 'i-lucide-box',
      to: '/cate',
      defaultOpen: true,
    },
    {
      label: '标签',
      icon: 'i-lucide-box',
      to: '/tag',
      defaultOpen: true,
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
