<script setup lang="ts">
const {data: menus} = await useFetch("/api/menu/admin-menus");
</script>

<template>
  <UNavigationMenu
      v-if="menus"
      :ui="{
        item:'pb-2',
        linkLeadingIcon: 'shrink-0 h-6 w-6 text-[#0F1419]',
        linkLabel: 'truncate text-xl text-[#0F1419]'}"
      orientation="vertical"
      :items="menus"
      class="data-[orientation=vertical]:w-48"/>
</template>
