<script setup lang="ts">
import ReBack from "~/components/ReBack.vue";
import ArticleList from "~/components/ArticleList.vue";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const pageQuery = reactive({
  page: 1,
  size: 30,
  tagName: route.params.tag as string,
});
const loading = ref(false);
const hasMore = ref(true);
const { data: res, status } = await useFetch(`/api/article/get_by_tag`, {
  query: pageQuery
});
const articles = ref(res?.value?.records || []);
hasMore.value = res?.value?.hasMore || false;

const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    const nextPage = pageQuery.page + 1;
    const response = await $fetch(`/api/article/get_by_tag`, {
      query: {
        tagName: pageQuery.tagName,
        page: nextPage,
        size: pageQuery.size,
      },
    });

    if (response?.records) {
      articles.value = [...articles.value, ...response.records];
      pageQuery.page = nextPage; // 成功后更新页码
      hasMore.value = response.hasMore;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("加载更多失败:", error);
    hasMore.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full pb-4">
    <ReBack>{{ pageQuery.tagName }}</ReBack>
    <ArticleList :list="articles" :loading="loading" :has-more="hasMore" />
    <div v-if="hasMore" class="flex justify-center pt-4 pb-30">
      <UButton size="xl" variant="soft" @click="loadMore">加载更多</UButton>
    </div>
  </div>
</template>
