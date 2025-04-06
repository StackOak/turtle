<script setup lang="ts">

</script>

<template>
  <n-flex vertical :gap="1" style="width: 200px;">
    <UCard variant="soft">
      <template #header>
        <div>分类</div>
      </template>
      <n-flex vertical :gap="1">
        <div v-for="i in 10">
          <n-flex justify="space-between">
            <div>人工智能{{ i }}</div>
            <UBadge>{{ i + 10 }}</UBadge>
          </n-flex>
        </div>
      </n-flex>
    </UCard>
    <UCard variant="soft">
      <template #header>
        <div>标签</div>
      </template>
      <n-flex vertical :gap="1">
        <div v-for="i in 10">
          <n-flex justify="space-between">
            <div>大数据开发{{ i }}</div>
            <UBadge>{{ i + 10 }}</UBadge>
          </n-flex>
        </div>
      </n-flex>
    </UCard>
  </n-flex>
</template>

<style scoped>

</style>
