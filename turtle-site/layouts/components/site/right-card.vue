<script setup lang="ts">
import {ref} from "vue";
import {useInfiniteScroll} from "~/composables/useInfiniteScroll";

const page = ref(1);
const pageSize = 50;
const loading = ref(false);
const hasMore = ref(true);
const maxLoadedPage = ref(0);
const {data: res, status} = await useFetch('/api/tag/list', {
  query: {
    page: page.value,
    size: pageSize
  }
})

const tagList = ref(res?.value?.records || []);

hasMore.value = res?.value?.hasMore || false
const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value++;
    const response = await $fetch(`/api/tag/list`,{
      query:{
        page:page.value,
        size:pageSize
      }
    });
    if (response.records) {
      tagList.value = [...tagList.value, ...response.records];
      maxLoadedPage.value = page.value;
      hasMore.value = response.hasMore;
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
