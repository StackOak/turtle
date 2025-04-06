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
      label: '文章',
      icon: 'i-lucide-database',
      to: '/composables',
      active: true,
    },
    {
      label: '知识库',
      icon: 'i-lucide-database',
      to: '/composables',
    },
    {
      label: '分类',
      icon: 'i-lucide-box',
      to: '/components',
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
      label: '搜索框',
      isSearch: true
    },

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

      highlight-color="neutral"
      orientation="horizontal"
      :items="items">
    <template #item="{ item }">
      <!-- 如果 items 中有特定项需要显示搜索框 -->
      <div v-if="item.isSearch" class="search-container">
        <UInput
            style="width: 300px"
            v-model="searchQuery"
            placeholder="搜索..."
            type="search"
            class="w-full"
            @input="handleSearch"
        />
      </div>
    </template>
  </UNavigationMenu>

</template>
<style scoped>

</style>
