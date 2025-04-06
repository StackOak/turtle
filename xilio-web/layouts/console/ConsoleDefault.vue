<script setup lang="ts">

import LeftMenu from "~/layouts/components/left-menu.vue";
import NFlex from "~/components/N-Flex.vue";
</script>

<template>
  <n-flex class="console-container">
    <LeftMenu/>
     <div> <slot /></div>
  </n-flex>
</template>

<style scoped>
.console-container{
  padding: 0 4%;
}
</style>
