<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue';
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import ReBack from "~/components/ReBack.vue";

const route = useRoute();
const router = useRouter();
const aid = ref(route.params.id); // 初始化 aid

const {data: article, status, error} = await useAsyncData(`article-${aid}`, () => {
  return $fetch(`http://localhost:8000/api/v1/detail?id=${aid.value}`)
})


// 返回上一页
const oneClickBack = () => {
  router.back();
};
</script>

<template>
  <div class="min-h-screen pb-20">
    <div class="w-full pt-1" v-if="true">
      <ReBack>文章</ReBack>
      <div class="pb-3 text-2xl font-bold font-sans text-gray-700">{{ article.data.title }}</div>
      <Markdown
          v-if="article.data.content"
          ref="markdownRef"
          :md-id="53211"
          code-theme="dark"
          main-theme="default"
          anchor-style="none"
          :preview="false"
          :value="article.data.content"
      />

      <div class="flex flex-row items-center gap-3 pt-4">
        <span>标签：</span>
        <div class="flex flex-row gap-4 items-center">
          <NuxtLink :to='`/tag/${tagName}`' v-for="tagName in article.data.tags" :key="tagName">
            <UBadge color="neutral" variant="soft">
              {{ tagName }}
            </UBadge>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0;
}
</style>
