<script setup lang="ts">
import {ref} from "vue";
import {useInfiniteScroll} from "~/composables/useInfiniteScroll";

const page = ref(1);
const pageSize = 30;
const loading = ref(false);
const hasMore = ref(true);
const maxLoadedPage = ref(0);
const {data: tagRes, status} = await useFetch(`http://localhost:8000/api/v1/tags?page=${page.value}&size=${pageSize}`)
const tagList = ref(tagRes?.value?.data || []);

hasMore.value = tagRes?.value?.data || false
const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value++;
    const response = await $fetch(`http://localhost:8000/api/v1/tags?page=${page.value}&size=${pageSize}`);
    if (response.data && response.data) {
      tagList.value = [...tagList.value, ...response.data];
      maxLoadedPage.value = page.value;
      hasMore.value = response.data.hasMore;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error('加载更多失败:', error);
    page.value--;
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
};

// 使用无限滚动
useInfiniteScroll({
  loadMore,
  loading,
  hasMore,
  maxLoadedPage,
  currentPage: page
});

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
      </div>
    </UCard>
  </div>
</template>
