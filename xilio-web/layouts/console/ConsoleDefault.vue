<script setup lang="ts">

import LeftMenu from "~/layouts/components/console/left-menu.vue";

</script>

<template>
  <n-flex class="console-container">
    <LeftMenu/>
     <div> <slot /></div>
  </n-flex>
</template>

<style scoped>
.console-container{
  padding: 0 10%;
}

</style>
