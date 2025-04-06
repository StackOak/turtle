<script setup lang="ts">

</script>

<template>
  <n-flex vertical style="flex: 1;" :gap="1">
    <UCard variant="soft" style="height: 100px;" v-for="i in 15">
      <h1>我的第一篇文章{{i}}</h1>
      <p>数据结构与算法相关的文章</p>

    </UCard>
  </n-flex>
</template>
