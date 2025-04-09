<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  {
    label: '主页',
    icon: 'i-lucide-home',
    to: '/console',
  },
  {
    label: '关于我',
    icon: 'ix:about',
    to: '/console/about',
  },

])
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
