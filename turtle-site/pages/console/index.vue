<script setup lang="ts">
import {onMounted} from "vue";

const articleList = reactive([])
const query = reactive({
  page: 1,
  size: 8
})
const total = ref(0)
onMounted(() => {
  onLoadArticleList(query.page)
})
watch(query, async (newValue) => {
  await onLoadArticleList(newValue.page)

}, {deep: true, immediate: false})
const onLoadArticleList = async (page: number) => {
  const response = await  $fetch(`api/article/list?page=${query.page}&size=${query.size}`, {
    method: 'post',
  })

  //const response = await $fetch(`http://localhost:8000/article/list?page=${query.page}&size=${query.size}`);
  //@ts-ignore
  if (response.data) {
    total.value = response.total
    console.log(total.value)
    Object.assign(articleList, response.data)

  }

}

const onRemove = (id: string) => {
  console.log(id)
}

</script>

<template>
  <div class="flex flex-col gap-4 w-full pt-2 pb-30">
    <div v-for="item in articleList" class="flex justify-between w-full p-4 bg-gray-100 rounded">
      <div class="truncate">
        {{ item.title }}
      </div>
      <div class="flex gap-2 truncate">
        <ULink :to="`/console/editor?id=${item.id}`" class="text-blue-500 hover:underline">编辑</ULink>
        <ULink class="text-red-500 hover:underline" @click="onRemove(item.id)">删除</ULink>
      </div>
    </div>
    <div class="flex justify-end pr-5 ">
      <UPagination  v-model:page="query.page" :items-per-page="query.size" active-color="neutral" :total="total"
                     show-edges/>
    </div>

  </div>

</template>
