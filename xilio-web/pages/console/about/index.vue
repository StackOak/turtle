<script setup lang="ts">
const about = ref("# 首页\n两年后端开发经验\n```java \n<style scoped>\n:deep(.cherry-previewer) {\n  border-left: none;\n  padding: 0 15px 0 15px;\n}")

</script>

<template>
  <ClientOnly>
    <Markdown
        ref="markdownRef"
        float="true"
        main-theme="default"
        :height="95"
        :md-id="53210"
        :preview="true"
        :value="about"
        @update:value="about = $event"
        class="w-full"
    />
  </ClientOnly>
</template>

<style scoped>

</style>
