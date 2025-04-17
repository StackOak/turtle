<script setup lang="ts">
const queryParam = reactive({
  page: 1,
  size: 50
})
const hasMore = ref(false)
const tagList = ref([])
const {data: res, status} = await useFetch('/api/tag/list', {
  query: queryParam
})
tagList.value = res.value.records || []
hasMore.value = res.value?.hasMore ?? false
//加载更多标签
const loadMore = async () => {
  try {
    const newRes = await $fetch('/api/tag/list', {
      query: {...queryParam, page: queryParam.page + 1}
    })
    if (newRes) {
      tagList.value = [...tagList.value, ...(newRes.records || [])]
      hasMore.value = newRes.hasMore
      queryParam.page += 1 // 仅在成功后更新 page
    } else {
      hasMore.value = false // 无新数据，停止加载
    }
  } catch (error) {
    console.error('加载更多失败:', error)
  }
}
</script>
<template>
  <div>
    <UCard variant="soft">
      <template #header>
        全部标签
      </template>
      <div class="flex flex-col gap-2">
        <div v-for="item in tagList">
          <NuxtLink :to="`/tag/${item.name}`"
                    class="flex flex-row justify-between items-center cursor-pointer">
            <div class="truncate">{{ item.name }}</div>
            <UBadge class="truncate">{{ item.articleCount }}</UBadge>
          </NuxtLink>
        </div>
        <div v-if="hasMore" class="flex justify-center w-full">
          <span @click="loadMore" class="cursor-pointer text-gray-500 hover:text-black transition-colors duration-200">
            查看更多
          </span>
        </div>
      </div>
    </UCard>
  </div>
</template>
