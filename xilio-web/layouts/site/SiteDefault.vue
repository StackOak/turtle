<script setup lang="ts">
import Nav from '~/layouts/components/nav.vue'

import RightCard from "~/layouts/components/site/right-card.vue";
</script>

<template>

  <div class="site-container">
    <Nav class="site-nav"/>
    <n-flex justify="space-between" :gap="2"   >
        <slot/>
        <right-card/>
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
