<script setup lang="ts">
import type {TabsItem} from '@nuxt/ui'
import RightCard from "~/layouts/components/site/right-card.vue";
import ArticleList from "~/components/ArticleList.vue";
import {ref} from "vue";
import {useSiteConfig} from "~/composables/useSiteConfig";

const queryParam = reactive({
  page: 1,
  size: 30
})
const {data: res, status} = await useFetch(`/api/article/list`, {
  params: queryParam
})
const active = ref('0')
const loading = ref(false);
const hasMore = ref(true);
const items = ref<TabsItem[]>([
  {
    label: '最新',
  },
  /*  {
      label: '热门'
    }*/
])
const articleList = ref([])
articleList.value = res.value.records || []
hasMore.value = res.value.hasMore || false
//监听选项加载不同的数据
watch(active, async (newActive) => {
  console.log(newActive)
})

const loadMore = async () => {
  try {
    if (!hasMore.value) return;
    const newRes = await $fetch('/api/article/list', {
      query: {...queryParam, page: queryParam.page + 1}
    })
    if (newRes) {
      articleList.value = [...articleList.value, ...(newRes.records || [])]
      hasMore.value = newRes.hasMore
      queryParam.page += 1 // 仅在成功后更新 page
    } else {
      hasMore.value = false // 无新数据，停止加载
    }
  } catch (error) {
    console.error('加载更多失败:', error)
  }
}
const {law} = useSiteConfig().value
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex flex-row justify-between gap-4 w-full flex-grow" v-if="status='success'">
      <div class="w-[80%]">
        <UTabs v-model="active" color="neutral" :content="false" :items="items"
               class="w-full sticky top-0 z-10 bg-white/95" variant="link"/>
        <ArticleList :list="articleList" :loading="loading" :has-more="hasMore"/>
        <div v-if="hasMore" class="flex justify-center p-4">
          <UButton size="xl" variant="soft" @click="loadMore">加载更多</UButton>
        </div>
      </div>
      <right-card class="w-[20%] hidden md:block pt-4"/>
    </div>
    <SiteFooter
        :copyright="law.copyright"
        :icp_number="law.icp_number"
        :icp_link="law.icp_link"
        :police_record="law.police_record"
        :police_record_link="law.police_record_link"
        class="mt-auto"
    />
  </div>
</template>
