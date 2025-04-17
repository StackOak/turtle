<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {formatDateTime, removeItemById} from "~/composables/Common";
import {API} from "~/composables/api";
import {Https} from "~/composables/https";
import {process} from "std-env";

definePageMeta({
  middleware: ["auth"]
})
const total = ref(0);
const query = reactive({
  page: 1,
  size: 8,
});
// const {data:res} =await useFetch("/api/article/list",{
//   query: {
//     page:query.page,
//     size: query.size
//   }
// })
const articleList = reactive<any[]>([]);
onMounted(() => {
  onLoadArticleList(query.page);
});

//监听分页变化
watch(query, (newValue) => {
  if (process.client) {
    onLoadArticleList(newValue.page);
  }
}, {deep: true, immediate: false});

// 加载文章列表
const onLoadArticleList = async (page: number) => {
  try {
    const response = await <any>Https.action(API.ARTICLE.list, {
      params: {
        page,
        size: query.size
      }
    })
    if (response.data.records) {
      total.value = response.data.total;
      // 清空并重新赋值，确保 reactive 更新
      articleList.length = 0;
      articleList.push(...response.data.records);
    }
  } catch (error) {
    console.error('加载文章列表失败:', error);
  }
};
// 删除文章
const onRemove = async (item: any) => {
  try {
    const response = await <any>Https.action(API.ARTICLE.delete, {
      params: {
        id: item.id
      }
    });
    // 删除成功后处理
    if (response.success !== false) {
      removeItemById(articleList, item.id);
      total.value -= 1;
      // 如果当前页变空，且不是第一页，退回上一页
      if (articleList.length === 0 && query.page > 1) {
        query.page -= 1;
        await onLoadArticleList(query.page);
      } else if (articleList.length < query.size && total.value > articleList.length) {
        // 如果当前页不满且还有数据，重新加载当前页
        await onLoadArticleList(query.page);
      }
    }
  } catch
      (error) {
    console.error('删除文章失败:', error);
  }
}
</script>

<template>
  <NuxtLink to="/console/editor">
    <UButton size="xl">新增文章</UButton>
  </NuxtLink>
  <div class="flex flex-col gap-4 w-full pt-2 pb-30">
    <div v-for="item in articleList" :key="item.id" class="flex justify-between w-full p-4 bg-gray-100 rounded">
      <div class="flex flex-row items-center gap-4 truncate">
        <UBadge size="sm" v-if="item.isProtected" color="neutral">加密</UBadge>
        <div>{{ formatDateTime(item.publishedAt) }}</div>
        <div class="truncate text-[black]">
          {{ item.title }}
        </div>
      </div>
      <div class="flex gap-2 truncate">
        <ULink
            :to="`/detail/${item.id}`"
            class="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors"
            target="_blank"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          浏览
        </ULink>
        <ULink
            :to="`/console/editor?id=${item.id}`"
            class="text-green-500 hover:text-green-700 hover:underline flex items-center gap-1 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          编辑
        </ULink>
        <ULink
            class="text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 transition-colors"
            @click="onRemove(item)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          删除
        </ULink>
      </div>
    </div>
    <div v-if="articleList.length>0" class="flex justify-end pr-10">
      <UPagination
          v-model:page="query.page"
          :items-per-page="query.size"
          active-color="neutral"
          :total="total"
          show-edges
      />
    </div>
  </div>
</template>
