<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: "主页",
    icon: 'i-lucide-home',
    to: '/console',
  },
  {
    label: '知识库',
    icon: 'i-lucide-book',
    to: '/console/book',
  },
  {
    label: '关于我',
    icon: 'ix:about',
    to: '/console/about',
  },
  {
    label: '网站配置',
    icon: 'i-icon-park-outline-config',
    to: '/console/config',
  },
])
</script>

<template>
  <UNavigationMenu
      :ui="{
        item:'pb-2',
        linkLeadingIcon: 'shrink-0 h-6 w-6 text-[#0F1419]',
        linkLabel: 'truncate text-xl text-[#0F1419]'}"
      orientation="vertical"
      :items="items"
      class="data-[orientation=vertical]:w-48"/>
</template>
