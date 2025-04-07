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

  <div class="flex justify-between gap-4">
    <div class="w-[80%]">
      <UTabs color="neutral" :content="false" :items="items" class="w-full" variant="link"/>
      <div class="flex flex-col gap-4  " v-for="i in 15">
        <div class="h-30 ">
          <NuxtLink :to="`/detail/${i}`">
            <p>
              我的第一篇文章，从入门据结构与算法相关的文章从入据结构与算法相关的文章从入据结构与算法相关的文章从入到精通需要经过的时间非常久的，开发数据库{{
                i
              }}</p>
          </NuxtLink>
          <p>
            数据结构与算法相关的文章从入门到精通需要经过的时间非常久的从入门到精通需要经过的时间非常久的从入门到精通需要经过的时间非常久的</p>
          <div class="flex flex-row gap-4 items-center ">
            <div>2023-02-25</div>
            <div class="flex flex-row gap-2">
              <UBadge size="sm" color="neutral" variant="soft">java</UBadge>
              <UBadge size="sm" color="neutral" variant="soft">c++</UBadge>
            </div>
          </div>

        </div>
        <USeparator color="neutral" type="dotted"/>
      </div>
    </div>
    <right-card class="w-[20%]" style="margin-top: 15px"/>
  </div>

</template>
