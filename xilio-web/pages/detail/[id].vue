<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue';
import {ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const aid = ref(route.params.id); // 初始化 aid

const {data: article,status} = await useAsyncData(`article-${aid}`,   () => {
  return $fetch(`http://localhost:8526/article/${aid.value}`)
})

// const {data: article,status} = await useFetch(`http://localhost:8526/article/${aid.value}`)


// 返回上一页
const oneClickBack = () => {
  router.back();
};
</script>

<template>


  <div class="w-full pt-1"  >
    <div class="flex flex-row items-center">
      <div
          @click="oneClickBack"
          class="flex items-center cursor-pointer justify-center w-9 h-9 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <UIcon name="ep:back" class="size-8 text-gray-500"/>
      </div>
      <div>文章</div>
    </div>

    <div>{{ article.title }}</div>

    <Markdown
        v-if="article.content"
        ref="markdownRef"
        :md-id="53211"
        code-theme="dark"
        main-theme="default"
        anchor-style="none"
        :preview="false"
        :value="article.content"
    />

    <div v-if="article.tags" class="flex flex-row items-center gap-4">
      <span>标签：</span>
      <div class="flex flex-row gap-4 items-center">
        <UBadge v-for="tag in article.tags" :key="tag.name" color="neutral" variant="soft">
          {{ tag.name }}
        </UBadge>
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
