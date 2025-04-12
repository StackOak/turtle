<script setup lang="ts">
import LeftMenu from '~/layouts/components/site/left-menu.vue'
import {useSiteConfig} from "~/composables/useSiteConfig";

const route = useRoute()


const isMobile = ref(false)

const path = useRoute().path
//如果path是 且是手机端的时候，则隐藏左侧菜单
// 检测移动端
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})

// 判断是否隐藏左侧菜单
const isHideLeftMenu = computed(() => {
  return isMobile.value && (route.path.startsWith('/detail') || route.path.startsWith('/search'))
})
const { seo} = useSiteConfig().value
</script>

<template>
  <div class="px-2 md:px-4  lg:px-[8%] xl:px-[10%] 2xl:px-[12%]">
    <div class="flex gap-4 ">
      <!-- 左侧导航区域 -->
      <div :class="{ 'hidden': isHideLeftMenu }" class="flex flex-col sticky top-0 self-start w-[150px]">
        <NuxtLink to="/" class="  pl-2 pt-1 pb-2">
          <div class="flex flex-row items-center gap-1">
            <img :src="seo.logo" class="w-7 h-7" :alt="seo.site_title">

            <span class="text-3xl font-bold text-gray-700">{{seo.site_title}}</span>
          </div>
        </NuxtLink>
        <LeftMenu class="mt-4"/>
        <NuxtLink to="/console/editor" class="pt-2">
          <u-button class="block text-center truncate  w-full" v-if="true" color="neutral" size="xl">
            写文章
          </u-button>
        </NuxtLink>
      </div>
      <USeparator :class="{ 'hidden': isHideLeftMenu }" orientation="vertical" class="h-auto min-h-screen"/>
      <div class="flex-1 min-w-0">
        <slot/>
      </div>
    </div>
  </div>

</template>

