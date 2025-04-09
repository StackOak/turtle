<script setup lang="ts">
import type {TabsItem} from '@nuxt/ui'
import RightCard from "~/layouts/components/site/right-card.vue";
import ArticleList from "~/components/ArticleList.vue";

const router = useRouter()
const active = ref('0')
const items = ref<TabsItem[]>([
  {
    label: '最新',
  },
/*  {
    label: '热门'
  }*/
])

const {data: articleList, status} = await useFetch('http://localhost:8000/api/v1/article/list?page=1&size=100')
//监听选项加载不同的数据
watch(active, async (newActive) => {
  console.log(newActive)
})
</script>

<template>
  <div class="flex flex-row justify-between gap-4 w-full " v-if="status='success'">
    <div class="w-[80%]">
      <UTabs v-model="active" color="neutral" :content="false"   :items="items" class="w-full sticky top-0 z-10 bg-white/95" variant="link"/>
      <ArticleList :list="articleList.data.data"/>
    </div>
    <right-card class="w-[20%]" style="margin-top: 15px"/>
  </div>
</template>
