<script setup lang="ts">
import ReBack from "~/components/ReBack.vue";
import ArticleList from "~/components/ArticleList.vue";
import {ref} from 'vue';
import {useInfiniteScroll} from '~/composables/useInfiniteScroll';

const router = useRouter();
const route = useRoute();
const tagName = ref(route.params.tag);

const page = ref(1);
const pageSize = 5;
const loading = ref(false);
const hasMore = ref(true);
const maxLoadedPage = ref(0);

const {data: articleList, status} = await useFetch(`/api/article/get_by_tag`, {
  query: {
    tagName: tagName.value,
    page: page.value,
    size: pageSize
  }
});
const articles = ref(articleList?.value?.data || []);

hasMore.value = articleList?.value?.hasMore || false
const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value++;
    const response = await useFetch(
        `/api/article/get_by_tag`, {
          query: {
            tagName: tagName.value,
            page: page.value,
            size: pageSize
          }
        });
    if (response.data && response.data) {
      articles.value = [...articles.value, ...response.data];
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
  <div class="w-full pb-4">
    <ReBack>{{ tagName }}</ReBack>
    <ArticleList :list="articles" :loading="loading" :has-more="hasMore"/>
  </div>
</template>

<style scoped>
</style>
