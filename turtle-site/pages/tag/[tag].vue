<script setup lang="ts">
import ReBack from "~/components/ReBack.vue";

const router = useRouter()
const route = useRoute()
const tagName = ref(route.params.tag)
const {
  data: articleList,
  status
} = await useFetch(`http://localhost:8000/api/v1/article/get-by-tag?tagName=${tagName.value}&page=1&size=10`)

</script>

<template>
  <div class="w-full pb-4">
    <ReBack>{{ tagName }}</ReBack>
    <div>
      <NuxtLink :to="`/detail/${article.id}`" v-for="article in articleList.data.data" class="flex flex-row gap-4">
        {{ article.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
