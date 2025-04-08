<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const tagName = ref(route.params.tag)
const {
  data: articleList,
  status
} = await useFetch(`http://localhost:8000/api/v1/article/get-by-tag?tagName=${tagName.value}&page=1&size=10`)
const oneClickBack = () => {
  router.back()
}
</script>

<template>
  <div class="w-full pb-4">
    <div class="flex flex-row items-center pb-2">
      <div @click="oneClickBack" class="flex items-center cursor-pointer
 justify-center w-9 h-9 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
        <UIcon name="ep:back" class="size-8 text-gray-500"/>
      </div>
      <div>{{ tagName }}</div>
    </div>
    <div>
      <NuxtLink :to="`/detail/${article.id}`" v-for="article in articleList.data.data" class="flex flex-row gap-4">
        {{ article.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
