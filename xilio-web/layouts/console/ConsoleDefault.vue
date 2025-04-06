<script setup lang="ts">

import LeftMenu from "~/layouts/components/left-menu.vue";
import NFlex from "~/components/N-Flex.vue";
</script>

<template>
  <n-flex>
    <LeftMenu/>
    <slot/>
  </n-flex>

</template>

<style scoped>

</style>
