<script setup lang="ts">
import ReBack from "~/components/ReBack.vue";
import ArticleList from "~/components/ArticleList.vue";
import {ref} from 'vue';
import {useInfiniteScroll} from '~/composables/useInfiniteScroll'; // 假设路径正确

const router = useRouter();
const route = useRoute();
const tagName = ref(route.params.tag);
const page = ref(1);
const pageSize = 3;
const loading = ref(false);
const hasMore = ref(true);
const maxLoadedPage = ref(0);

const {
  data: articleList,
  status
} = await useFetch(`http://localhost:8000/api/v1/article/get-by-tag?tagName=${tagName.value}&page=${page.value}&size=${pageSize}`);

const articles = ref(articleList?.value?.data?.data || []);

const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value++;
    const response = await $fetch(
        `http://localhost:8000/api/v1/article/get-by-tag?tagName=${tagName.value}&page=${page.value}&size=${pageSize}`);
    if (response.data && response.data.data) {
      articles.value = [...articles.value, ...response.data.data];
      maxLoadedPage.value = page.value;
      hasMore.value = response.data.data.hasMore;
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
