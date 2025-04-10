<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue';
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ReBack from "~/components/ReBack.vue";

const route = useRoute();
const router = useRouter();
const aid = ref(route.params.id); // 初始化 aid

const {data: articleRes, status, error} = await useAsyncData(`article-${aid}`, () => {
  return $fetch(`http://localhost:8000/api/v1/detail?id=${aid.value}`)
})
const article = ref(articleRes.value.data)

// 返回上一页
const oneClickBack = () => {
  router.back();
};
</script>

<template>
  <div class="min-h-screen pb-20 w-full">
    <ReBack>文章</ReBack>
    <div class="pb-2 text-2xl font-bold font-sans text-gray-700">{{ article.title }}</div>
    <div class="flex flex-row justify-between items-center pb-2">
      <span v-if="article" class="text-gray-500">{{ article.publishedAt }}</span>
      <NuxtLink v-if="false" :to="`/console/editor?id=${article.id}`">
        <span class="text-gray-800 cursor-pointer"> 编辑</span>
      </NuxtLink>
    </div>
    <div v-if="article">
      <Markdown
          v-if="article.content"
          ref="markdownRef"
          :md-id="53211"
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          :preview="false"
          :value="article.content"/>
      <div class="flex flex-row items-center gap-3 pt-4">
        <span>标签：</span>
        <div class="flex flex-row gap-4 items-center">
          <NuxtLink :to='`/tag/${tagName}`' v-for="tagName in article.tags" :key="tagName">
            <UBadge color="neutral" variant="soft" class="truncate">
              {{ tagName }}
            </UBadge>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">文章不存在！</div>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0;
}
</style>
