<script setup lang="ts">

</script>

<template>
  <div style="width: 180px;">
    <UCard variant="soft"  >
      <template #header >
        全部标签
      </template>
      <div class="flex flex-col gap-2">
        <div v-for="i in 20">
          <NuxtLink :to="`/tag/${i}`" class="flex flex-row justify-between items-center   cursor-pointer">
            <div>大数据{{ i }}</div>
            <UBadge>{{ i + 100 }}</UBadge>
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>
