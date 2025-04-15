<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'
import {useSiteConfig} from "~/composables/useSiteConfig";

const active = ref()
const {social} = useSiteConfig().value
//动态构建社交菜单
const socialMenus = ref<NavigationMenuItem[]>([
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: social.github || '',
      target: '_blank'
    },
    {
      label: 'Gitee',
      icon: 'i-simple-icons-gitee',
      to: social.gitee || '',
      target: '_blank'
    },
  ]])
const userMenus = ref<NavigationMenuItem[]>([
  [
    {
      label: '主页',
      icon: 'i-lucide-home',
      to: '/',
    },
    {
      labelKey: 'search',
      label: '搜索',
      icon: 'i-lucide-search',
      to: '/search',
    },
    {
      label: '标签',
      icon: 'i-lucide-tag',
      to: '/tag',
    },
    {
      label: '知识库',
      icon: 'i-lucide-book',
      to: '/book',
    },
    {
      label: '导航',
      icon: 'i-ion:navigate-outline',
      to: '/nav',
    },
    {
      label: '关于我',
      icon: 'ix:about',
      to: '/about',
    },
  ],
  ...socialMenus.value
])

const adminMenus = ref<NavigationMenuItem[]>([
  [
    {
      label: '主页',
      icon: 'i-lucide-home',
      to: '/',
    },
    {
      labelKey: 'search',
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
      label: '导航',
      icon: 'i-ion:navigate-outline',
      to: '/nav',
    },
    {
      label: '关于我',
      icon: 'ix:about',
      to: '/about',
    },
    {
      label: '创作中心',
      icon: 'i-hugeicons:quill-write-02',
      to: '/console',
      target: '_blank'
    },
  ],
  ...socialMenus.value,
])
//根据是否登陆展示不同的菜单 后面可将菜单保存到数据库 根据不同的用户展示不同的菜单
const menus = computed(() => {
  return useCookie('Authorization').value == null ? userMenus.value : adminMenus.value
})
</script>
<template>

  <UNavigationMenu
      :ui="{
        item:'pb-2',
        linkLeadingIcon: 'shrink-0 h-6 w-6 text-[#0F1419]',
        linkLabel: 'truncate text-xl text-[#0F1419]'}"
      v-model:model-value="active"
      highlight-color="neutral"
      orientation="vertical"
      :items="menus">
  </UNavigationMenu>
</template>
