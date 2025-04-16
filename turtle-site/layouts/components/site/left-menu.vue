<script setup lang="ts">
const active = ref()
//获取菜单
const {data: menus} = useFetch("/api/menu/left-menus")
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
