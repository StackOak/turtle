<script setup lang="ts">
import {ref, reactive} from 'vue';

const router = useRouter()
// 查询参数
const queryParam = reactive({
  page: 1,
  size: 9,
  keyword: null as string | null
});

// 书籍列表数据
const bookList = ref<any[]>([]); // 存储所有书籍数据
const hasMore = ref(true); // 是否有更多数据
const total = ref(0); // 总记录数
const loading = ref(false); // 加载状态
const openModel = ref(false)
const bookForm = reactive({
  title: '',
  description: ''
})
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
const onCreate = async () => {
  router.push({path: '/console/book/book1'})
}
</script>

<template>
  <div>
    <!--  操作  -->
    <div>
      <UButton @click="openModel=true" size="xl">新建知识库</UButton>
    </div>
    <!-- 书籍列表 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-4">
      <nuxt-link
          v-for="(item, index) in bookList"
          :key="item.id"
          :to="`/console/book/${item.id}`"
          class="bg-white rounded-lg shadow p-4 cursor-pointer"
      >
        <div class="flex flex-row gap-4">
          <!-- 封面图片 -->
          <div class="flex-shrink-0 border-1">
            <img
                class="h-[120px] w-[100px] object-cover rounded"
                :src="item.cover"
                :alt="item.title"
            />
          </div>
          <!-- 内容区域 -->
          <div class="flex flex-col flex-1 min-w-0">
            <h3 class="text-lg font-semibold truncate">{{ item.title }}</h3>
            <p class="text-gray-600 line-clamp-2 mt-1">
              {{ item.description }}
            </p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="flex justify-end">
      <UPagination v-model:page="queryParam.page" :total="total"/>
    </div>
  </div>

  <UModal v-model:open="openModel" title="新建知识库"
          :overlay="false"
          :ui="{
           body: 'flex flex-col gap-4 w-full p-6',
           footer: 'flex justify-end gap-3 p-4'}">
    <template #body>
      <div class="grid grid-cols-1 gap-4 w-full">
        <UInput
            size="xl"
            variant="soft"
            v-model="bookForm.title"
            placeholder="请输入名字"
            class="w-full"
        />
        <UTextarea
            size="xl"
            variant="soft"
            v-model="bookForm.description"
            placeholder="请输入描述"
            class="w-full"
        />
        <URadioGroup orientation="horizontal"
                     variant="list"
                     default-value="1"
                     :items="[{label:'全部可见',value:'1'},{label:'仅自己可见',value:'2'}]"/>

      </div>
    </template>
    <template #footer>
      <UButton label="取消" color="neutral" variant="outline" @click="openModel = false"/>
      <UButton @click="onCreate" label="立即创建" color="neutral"/>
    </template>
  </UModal>
</template>
