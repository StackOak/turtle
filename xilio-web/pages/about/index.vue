<script setup lang="ts">

import Markdown from "~/components/Markdown/index.vue";
const about = ref("# 首页\n两年后端开发经验\n```java \n<style scoped>\n:deep(.cherry-previewer) {\n  border-left: none;\n  padding: 0 15px 0 15px;\n}")


</script>

<template>
  <div class="w-full">
    <Markdown  md-id="10010" code-theme="dark"
              main-theme="default"
              anchor-style="none" :preview="false" :value="about"/>
  </div>
</template>

<style scoped>
:deep(.cherry-previewer) {
  border-left: none;
  padding: 0 15px 0 15px;
}
</style>
