<script setup lang="ts">
const pageQuery = reactive({
  page: 1, // 从第2页开始加载更多
  size: 1000,
})
const {data: res, status} = await useFetch('/api/tag/list', {
  query: pageQuery
});
const tags = ref(res.value.records || []);
const hasMore = ref(res.value.hasMore || false);
//加载更多
const loadMore = async () => {
  if (!hasMore.value) return;
  try {
    const newRes = await $fetch('/api/tag/list', {
      query: {
        page: pageQuery.page,
        size: pageQuery.size,
      },
    });

    if (newRes?.records) {
      tags.value = [...tags.value, ...newRes.records];
      hasMore.value = newRes.hasMore;
      pageQuery.page += 1; // 成功后页码递增
    } else {
      hasMore.value = false; // 无新数据，停止加载
    }
  } catch (error) {
    console.error('加载更多失败:', error);
  }
};
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(70px,auto))] gap-4">
      <NuxtLink v-for="(tag, index) in tags" :key="index" :to="`/tag/${tag.name}`">
        <UTooltip :delay-duration="800" :content="{ align: 'center' }" :text="tag.name">
          <UBadge class="flex justify-center" color="neutral" variant="soft">
            <span class="block text-center truncate">
              {{ tag.name }}
            </span>
          </UBadge>
        </UTooltip>
      </NuxtLink>
    </div>
    <div v-if="hasMore" class="flex justify-center pt-4 pb-30">
      <UButton size="xl" variant="soft" @click="loadMore">加载更多</UButton>
    </div>
  </div>
</template>
