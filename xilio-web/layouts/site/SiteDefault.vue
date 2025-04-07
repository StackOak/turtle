<script setup lang="ts">
import LeftMenu from '~/layouts/components/site/left-menu.vue'

</script>

<template>

  <div class="site-container  ">
    <div class="flex  gap-4">
      <div class="flex flex-col  ">
        <div style=" font-size: 30px">
          xilio.cn
        </div>
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
