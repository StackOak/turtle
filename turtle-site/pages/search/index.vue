<script setup lang="ts">
import ArticleList from "~/components/ArticleList.vue";
import { debounce } from "@antfu/utils";
import { watch } from "vue";

const articles = ref([]);
const pageQuery = reactive({
  page: 1,
  size: 20,
  type: 1,
  keyword: "",
});
const hasMore = ref(false);

const fetchArticles = async (isLoadMore = false) => {
  if (pageQuery.keyword === "") {
    articles.value = []; // 清空文章列表
    hasMore.value = false;
    return;
  }

  try {
    const res = await $fetch(`/api/search`, {
      method: "POST",
      body: { ...pageQuery },
    });

    if (res?.records) {
      articles.value = isLoadMore
          ? [...articles.value, ...res.records]
          : res.records;
      hasMore.value = res.hasMore;
      if (isLoadMore) pageQuery.page += 1;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error(`${isLoadMore ? "加载更多" : "搜索"}失败:`, error);
  }
};

// 防抖包装搜索函数
const debouncedSearch = debounce(500, () => {
  pageQuery.page = 1; // 重置页码
  fetchArticles(false);
});

// 监听 keyword 变化
watch(
    () => pageQuery.keyword,
    () => {
      debouncedSearch();
    }
);

const loadMore = () => fetchArticles(true);
</script>

<template>
  <div class="w-full pt-2">
    <UInput
        v-model:model-value="pageQuery.keyword"
        class="w-full"
        icon="i-lucide-search"
        size="xl"
        variant="soft"
        placeholder="输入关键字以检索"
    />
    <div>
      <ArticleList v-if="articles" :list="articles" />
      <div v-if="hasMore" class="flex justify-center pt-4 pb-30">
        <UButton size="xl" variant="soft" @click="loadMore">加载更多</UButton>
      </div>
    </div>
  </div>
</template>
