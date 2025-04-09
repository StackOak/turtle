<script setup lang="ts">
import {onMounted} from "vue";

const page = ref(1)
const total = ref(200)
const articleList = reactive([])
watch(page, async (newValue) => {
  console.log(newValue)

})
const onLoadArticleList = (page: number) => {

}

const onRemove = (id: string) => {
  console.log(id)
}
onMounted(() => {
  onLoadArticleList(page.value)
})
</script>

<template>
  <div class="flex flex-col gap-4 w-full pt-4 pb-30">
    <div v-for="i in 8" class="flex justify-between w-full p-4 bg-gray-100 rounded">
      <div>
        我的第 {{ i }} 篇博客文章
      </div>
      <div class="flex gap-2">
        <ULink :to="`/console/editor?id=${i}`" class="text-blue-500 hover:underline">编辑</ULink>
        <ULink class="text-red-500 hover:underline" @click="onRemove(i)">删除</ULink>
      </div>
    </div>
    <UPagination class="flex justify-end pr-5" v-model:page="page" active-color="neutral" :total="total" :sibling-count="1" show-edges/>
  </div>

</template>
