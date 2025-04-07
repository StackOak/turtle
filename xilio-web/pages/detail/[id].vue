<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue'
import {onMounted} from "vue";
const route = useRoute()
const router = useRouter()
const content = ref("```java \n<style scoped>\n:deep(.cherry-previewer) {\n  border-left: none;\n  padding: 0 15px 0 15px;\n}```")


onMounted(() => {

})
const oneClickBack= () => {
  router.back()
}

</script>

<template>
  <div class="w-full pt-1">
   <div class="flex flex-row items-center">
     <div @click="oneClickBack" class="flex items-center cursor-pointer
 justify-center w-9 h-9 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
       <UIcon name="ep:back" class="size-8 text-gray-500" />
     </div>
     <div>文章</div>
   </div>
    <div>我的第一篇文章全是大数据开发文章全是大数据开发，我文章全是大数据开发，我，我的第一篇文章全是大数据开发，我的第一篇文章全是大数据开发，我的第一篇文章全是大数据开发</div>

    <Markdown ref="markdownRef" :md-id="53210" code-theme="dark"
              main-theme="default"
              anchor-style="none" :preview="false" :value="content"/>

   <div class="flex flex-row items-center gap-4">
     <span>标签：</span>
     <div class="flex flex-row  gap-4 items-center">
       <UBadge v-for="i in 10" color="neutral" variant="soft">人工智能</UBadge>
     </div>
   </div>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  /*padding: 0 15px 0 15px;*/
  padding: 0;
}

</style>
