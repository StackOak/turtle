<script setup lang="ts">
import LeftMenu from '~/layouts/components/site/left-menu.vue'

</script>

<template>

  <div class="site-container  ">
    <div class="flex  gap-4">
      <div class="flex flex-col  ">
        <NuxtLink to="/" style=" font-size: 30px;cursor: pointer">
          xilio.cn
        </NuxtLink>
        <LeftMenu class="site-nav"/>

        <u-button color="neutral" size="xl" class="text-center">
          <NuxtLink to="/console/editor">
            写文章
          </NuxtLink>
        </u-button>
      </div>
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.site-nav {
  width: 100%;

}

.site-container {
  padding: 0 12%

}

</style>
