<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {removeItemById} from "~/composables/Common";
import {API} from "~/composables/api";
import {Https} from "~/composables/https";
import {process} from "std-env";

definePageMeta({
  middleware: ["auth"]
})
const total = ref(0);
const articleList = reactive<any[]>([]); // 根据实际类型定义 interface
const query = reactive({
  page: 1,
  size: 8,
});

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
    if (response.data) {
      total.value = response.total;
      // 清空并重新赋值，确保 reactive 更新
      articleList.length = 0;
      articleList.push(...response.data);
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
;
const logout = () => {
  if (process.client) {
    useCookie("Authorization").value = null
    Https.action(API.USER.logout, {method: 'POST'}).then(res => {
      useCookie("Authorization").value = null
    })
  }
}

</script>

<template>
  <UButton @click="logout">logout</UButton>
  {{ useCookie("Authorization").value }}
  <div class="flex flex-col gap-4 w-full pt-2 pb-30">
    <div v-for="item in articleList" :key="item.id" class="flex justify-between w-full p-4 bg-gray-100 rounded">
      <div class="truncate">
        {{ item.title }}
      </div>
      <div class="flex gap-2 truncate">
        <ULink :to="`/detail/${item.id}`" class="text-blue-500 hover:underline" target="_blank">浏览</ULink>
        <ULink :to="`/console/editor?id=${item.id}`" class="text-blue-500 hover:underline">编辑</ULink>
        <ULink class="text-red-500 hover:underline" @click="onRemove(item)">删除</ULink>
      </div>
    </div>
    <div class="flex justify-end pr-5">
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
