<script setup lang="ts">
import type {TabsItem} from '@nuxt/ui'
import RightCard from "~/layouts/components/site/right-card.vue";
import ArticleList from "~/components/ArticleList.vue";
import {ref} from "vue";
import {useInfiniteScroll} from '~/composables/useInfiniteScroll';

const router = useRouter()
const active = ref('0')
const page = ref(1);
const pageSize = 100;
const loading = ref(false);
const hasMore = ref(true);
const maxLoadedPage = ref(0);
const items = ref<TabsItem[]>([
  {
    label: '最新',
  },
  /*  {
      label: '热门'
    }*/
])

const {
  data: articleRes,
  status
} = await useFetch(`http://192.168.0.151:8000/api/v1/article/list?page=${page.value}&size=${pageSize}`)
//监听选项加载不同的数据
watch(active, async (newActive) => {
  console.log(newActive)
})
const articles = ref(articleRes?.value?.data || []);
hasMore.value = articleRes?.value?.hasMore || false
const loadMore = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value++;
    const response = await $fetch(`http://192.168.0.151:8000/api/v1/article/list?page=${page.value}&size=${pageSize}`);
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
  <div class="flex flex-row justify-between gap-4 w-full " v-if="status='success'">
    <div class="w-[80%]">
      <UTabs v-model="active" color="neutral" :content="false" :items="items"
             class="w-full sticky top-0 z-10 bg-white/95" variant="link"/>
      <ArticleList :list="articles" :loading="loading" :has-more="hasMore"/>
    </div>
    <right-card class="w-[20%] hidden md:block  pt-4"/>
  </div>
</template>
