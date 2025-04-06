<script setup lang="ts">
import Nav from '~/layouts/components/nav.vue'
import LeftMenu from "~/layouts/components/left-menu.vue";
import RightCard from "~/layouts/components/site/right-card.vue";
</script>

<template>

  <div class="site-container">
    <Nav class="site-nav"/>
    <n-flex :gap="4">
      <LeftMenu/>
      <div>
        <slot/>
      </div>
      <div>
        <right-card/>
      </div>
    </n-flex>
  </div>
</template>

<style scoped>
.site-nav {
  width: 100%;
  margin-bottom: 30px;
}

.site-container {

  width: 100%;
  padding: 0 12%

}
</style>
