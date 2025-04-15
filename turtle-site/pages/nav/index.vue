<script setup lang="ts">
import {ref, reactive} from 'vue';

// 查询参数
const queryParam = reactive({
  page: 1,
  size: 12,
  keyword: null as string | null
});

// 书籍列表数据
const bookList = ref<any[]>([]); // 存储所有书籍数据
const hasMore = ref(true); // 是否有更多数据
const total = ref(0); // 总记录数
const loading = ref(false); // 加载状态

// 服务端获取初始数据（SSR）
const {data: initialData, error: initialError} = await useAsyncData(
    'book-list-initial',
    () => $fetch('/api/book/list', {
      method: 'GET',
      query: {
        page: queryParam.page,
        size: queryParam.size
      }
    })
);

// 初始化数据
if (initialData.value && !initialError.value) {
  bookList.value = initialData.value.records || [];
  hasMore.value = initialData.value.hasMore;
  total.value = initialData.value.total;
} else {
  console.error('Failed to fetch initial books:', initialError.value);
}

// 客户端加载更多数据
const fetchBooks = async () => {
  if (!hasMore.value || loading.value) return; // 避免重复加载或无数据时请求
  loading.value = true;

  try {
    const {data: res, status, error} = await useFetch('/api/book/list', {
      query: {
        page: queryParam.page,
        size: queryParam.size,
        keyword: queryParam.keyword
      }
    });

    if (status.value === 'success' && res.value) {
      // 追加新数据到bookList
      bookList.value = [...bookList.value, ...res.value.records];
      hasMore.value = res.value.hasMore;
      total.value = res.value.total;
    } else {
      console.error('Failed to fetch more books:', error.value);
    }
  } catch (err) {
    console.error('Error fetching more books:', err);
  } finally {
    loading.value = false;
  }
};

// 加载更多
const onLoadMore = async () => {
  queryParam.page += 1; // 页码递增
  await fetchBooks(); // 获取下一页数据
};
</script>

<template>

  <div class="w-full max-w-7xl mx-auto">
    <!-- 网站列表 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <nuxt-link
          v-for="(item, index) in bookList"
          :key="item.id"
          :to="`/book/${item.id}`"
          class="bg-white rounded-lg shadow p-4 cursor-pointer"
      >
        <div class="flex flex-row gap-4">
          <!-- logo图片 -->
          <div class="flex-shrink-0">
            <img
                class="h-[50px] w-[50px] object-cover rounded-full"
                :src="item.cover"
                :alt="item.title"
            />
          </div>
          <!-- 内容区域 -->
          <div class="flex flex-col flex-1 min-w-0">
            <h3 class="text-lg font-semibold truncate">{{ item.title }}</h3>
            <p class="text-gray-600 line-clamp-1 mt-1">
              {{ item.description }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>

    <!-- 加载更多按钮 -->
    <div class="flex justify-center py-4" v-if="hasMore">
      <UButton
          @click="onLoadMore"
          :disabled="loading"
          :loading="loading"
          color="neutral"
          variant="soft"
          size="md"
          class="px-4 py-2"
      >
        {{ loading ? '加载中...' : '加载更多' }}
      </UButton>
    </div>
  </div>
</template>
