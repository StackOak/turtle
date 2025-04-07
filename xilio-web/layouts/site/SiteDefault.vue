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

  width: 100%;
  padding: 0 12%

}

.grid-container {
  display: grid;
  grid-template-columns: 70% 30%; /* 两列：70% 和 30% */
  gap: 1rem; /* 列间距 */
  width: 100%; /* 占满父容器宽度 */
  box-sizing: border-box;
  justify-content: space-between; /* 两端对齐整个网格内容 */
}

/* 确保子元素适应网格 */
.grid-container > * {
  box-sizing: border-box;
  /* 如果需要子元素内部内容两端对齐，可以添加以下样式 */
  display: flex;
  justify-content: space-between; /* 子元素内部内容两端对齐 */
}
</style>
