<script setup lang="ts">
const {data: tags, status} =await useFetch('http://localhost:8000/api/v1/tags?page=1&size=100')

</script>

<template>
  <div  >
    <UCard variant="soft"  >
      <template #header >
        全部标签
      </template>
      <div class="flex flex-col gap-2">
        <div v-for="item in tags.data.data">
          <NuxtLink :to="`/tag/${item.name}`" class="flex flex-row justify-between items-center   cursor-pointer">
            <div class="n-no-wrap">{{item.name}}</div>
            <UBadge>{{ item.articleCount }}</UBadge>
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

