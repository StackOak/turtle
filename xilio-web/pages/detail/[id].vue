<script setup lang="ts">
import Markdown from '@/components/Markdown/index.vue'
import {onMounted} from "vue";

const content = ref("```java \n<style scoped>\n:deep(.cherry-previewer) {\n  border-left: none;\n  padding: 0 15px 0 15px;\n}```")


onMounted(() => {

})

</script>

<template>
  <div class="w-full">
    <div class="text-left font-bold text-xl pl-4 py-2">我的第一篇文章非常厉害</div>
    <Markdown ref="markdownRef" md-id="1001" code-theme="dark"
              main-theme="default"
              anchor-style="none" :preview="false" :value="content"/>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0 15px 0 15px;
}

</style>
