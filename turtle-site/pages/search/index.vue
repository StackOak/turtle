<script setup lang="ts">
import ArticleList from "~/components/ArticleList.vue";
import {debounce} from "@antfu/utils";

const articles = reactive([])
const pageQuery = reactive({
  page: 1,
  size: 20,
  type: 1,
  keyword: ''
})
const onLoadArticle = async () => {
  if (pageQuery.keyword == '') {
    return;
  }
  try {
    const res = await $fetch(`/api/search`, {method: 'POST', body: {...pageQuery}})
    //@ts-ignore
    articles.splice(0, articles.length, ...(res.records || []))
  } catch (err) {
    console.log(err)
  }
}
const debouncedSearch = debounce(500, async () => {
  await onLoadArticle();
});
// 页面加载时执行一次初始搜索
onMounted(async () => {
  debouncedSearch();
});
watch(pageQuery, async (newValue) => {
  debouncedSearch()
}, {deep: true, immediate: true})
</script>

<template>
  <div class="w-full pt-2">
    <UInput @keydown.enter="debouncedSearch" v-model:model-value="pageQuery.keyword" class="w-full"
            icon="i-lucide-search"
            size="xl"
            variant="soft" placeholder="输入关键字  按回车键可立即检索"/>
    <div>
      <ArticleList v-if="articles" :list="articles"/>
    </div>
  </div>
</template>
