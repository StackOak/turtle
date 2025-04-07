<script setup lang="ts">
import type {TabsItem} from '@nuxt/ui'
import RightCard from "~/layouts/components/site/right-card.vue";

const items = ref<TabsItem[]>([
  {
    label: '最新'
  },
  /*{
    label: '排行'
  }*/
])
</script>

<template>

  <div  class="flex justify-between gap-4">
    <n-flex vertical style="flex: 1;background-color: white;">
      <UTabs color="neutral" :content="false" :items="items" class="w-full" variant="link"/>
      <div class="overscroll-contain" style="height: 100px;margin-top: 15px; " v-for="i in 15">
        <NuxtLink :to="`/detail/${i}`">
          <p style=" color: black;font-weight: bold">

            我的第一篇文章，从入门到精通需要经过的时间非常久的，开发数据库{{ i }}</p>
        </NuxtLink>
        <p>
          数据结构与算法相关的文章从入门到精通需要经过的时间非常久的从入门到精通需要经过的时间非常久的从入门到精通需要经过的时间非常久的</p>
        <USeparator style="margin-top: 15px"/>
      </div>

    </n-flex>
    <right-card style="margin-top: 15px"/>

  </div>

</template>
