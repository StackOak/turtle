<script setup lang="ts">
import Nav from '~/layouts/components/nav.vue'
import LeftMenu from "~/layouts/components/left-menu.vue";
</script>

<template>
  <div class="site-container">
    <Nav/>
    <n-flex :gap="4">
      <LeftMenu/>
      <slot/>
    </n-flex>
  </div>
</template>

<style scoped>
.site-container {
  padding: 0 12%
}
</style>
